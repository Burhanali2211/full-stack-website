import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { z } from "zod";
import { supabaseAdmin } from "@/lib/supabase-admin";

// Phone number validation schema
const phoneSchema = z.object({
  phoneNumber: z.string().min(10, "Phone number is too short"),
});

export async function POST(request: NextRequest) {
  try {
    // Get the authenticated user
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse and validate the request body
    const body = await request.json();
    const result = phoneSchema.safeParse(body);
    
    if (!result.success) {
      return NextResponse.json(
        { message: result.error.errors[0].message },
        { status: 400 }
      );
    }
    
    const { phoneNumber } = result.data;

    // Get user from Supabase based on email
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', session.user.email)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Update the phone number in Supabase
    const { error } = await supabaseAdmin
      .from('users')
      .update({ 
        phone_number: phoneNumber,
        updated_at: new Date().toISOString()
      })
      .eq('id', userData.id);
    
    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json(
      { message: "Phone number saved successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error saving phone number:", error);
    return NextResponse.json(
      { message: "Failed to save phone number" },
      { status: 500 }
    );
  }
}