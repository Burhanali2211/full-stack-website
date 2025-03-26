import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

// This would typically be stored in environment variables
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || "sk_test_your_key";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "whsec_your_key";

// Initialize Stripe
const stripe = new Stripe(STRIPE_SECRET_KEY, {
  apiVersion: "2025-02-24.acacia",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { amount, currency = "usd", description, successUrl, cancelUrl } = body;

    // Validate required fields
    if (!amount || !successUrl || !cancelUrl) {
      return NextResponse.json(
        { error: "Amount, successUrl, and cancelUrl are required" },
        { status: 400 }
      );
    }

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency,
            product_data: {
              name: description || "Developers Mindset - Educational Platform Purchase",
            },
            unit_amount: amount * 100, // Stripe uses cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url }, { status: 200 });
  } catch (error) {
    console.error("Error creating payment session:", error);
    return NextResponse.json(
      { error: "Failed to create payment session" },
      { status: 500 }
    );
  }
}

// Handle Stripe webhook events
export async function PUT(request: NextRequest) {
  try {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature") || "";

    let event;
    
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      return NextResponse.json(
        { error: `Webhook signature verification failed: ${err instanceof Error ? err.message : 'Unknown error'}` },
        { status: 400 }
      );
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object as Stripe.Checkout.Session;
        // Here you would fulfill the order
        console.log(`Payment succeeded for session: ${session.id}`);
        break;
      default:
        console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (error) {
    console.error("Error handling webhook:", error);
    return NextResponse.json(
      { error: "Failed to process webhook" },
      { status: 500 }
    );
  }
} 