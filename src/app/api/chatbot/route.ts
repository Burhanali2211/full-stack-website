import { NextRequest, NextResponse } from "next/server";

// Simple predefined responses for the chatbot
const responses = {
  greeting: [
    "Hello! How can I help you today?",
    "Hi there! What would you like to know about our platform?",
    "Welcome! I'm here to assist you with any questions about our educational content.",
  ],
  projects: [
    "We have a variety of projects showcasing different technologies. You can check them out in the Projects section.",
    "Our projects range from web applications to data visualization tools. Feel free to explore them!",
  ],
  tutorials: [
    "We offer tutorials on various topics including Next.js, React, TypeScript, and more.",
    "Our tutorials are categorized by difficulty level and topic. You can filter them based on your interests.",
  ],
  blog: [
    "Our blog features articles on the latest web development trends and technologies.",
    "Check out our blog for in-depth articles on programming and tech topics.",
  ],
  contact: [
    "You can reach us through the contact form on our website.",
    "Feel free to send us a message using the contact form, and we'll get back to you as soon as possible.",
  ],
  default: [
    "I'm not sure I understand. Could you please rephrase your question?",
    "I don't have information on that topic yet. Is there something else I can help you with?",
    "I'm still learning! Could you ask me something about our projects, tutorials, or blog?",
  ],
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    // Simple keyword matching to determine response
    const lowerMessage = message.toLowerCase();
    let responseType = "default";

    if (
      lowerMessage.includes("hello") ||
      lowerMessage.includes("hi") ||
      lowerMessage.includes("hey")
    ) {
      responseType = "greeting";
    } else if (
      lowerMessage.includes("project") ||
      lowerMessage.includes("portfolio")
    ) {
      responseType = "projects";
    } else if (
      lowerMessage.includes("tutorial") ||
      lowerMessage.includes("learn") ||
      lowerMessage.includes("course")
    ) {
      responseType = "tutorials";
    } else if (
      lowerMessage.includes("blog") ||
      lowerMessage.includes("article")
    ) {
      responseType = "blog";
    } else if (
      lowerMessage.includes("contact") ||
      lowerMessage.includes("email") ||
      lowerMessage.includes("reach")
    ) {
      responseType = "contact";
    }

    // Get a random response from the selected category
    const possibleResponses = responses[responseType as keyof typeof responses];
    const randomIndex = Math.floor(Math.random() * possibleResponses.length);
    const response = possibleResponses[randomIndex];

    // Simulate a delay to make it feel more natural
    await new Promise((resolve) => setTimeout(resolve, 1000));

    return NextResponse.json(
      { 
        response,
        timestamp: new Date().toISOString(),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing chatbot message:", error);
    return NextResponse.json(
      { error: "An error occurred while processing your message" },
      { status: 500 }
    );
  }
} 