import { NextRequest, NextResponse } from "next/server";
import { updateUserProgress, getUserProgress } from "@/lib/supabase-admin";
import { getSession } from "@/lib/auth";

// Ensure this handler doesn't run during build time
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const tutorialId = searchParams.get("tutorialId");

    const progress = await getUserProgress(
      session.user.id,
      tutorialId || undefined
    );

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { tutorialId, completed } = body;

    if (!tutorialId || typeof completed !== "boolean") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const progress = await updateUserProgress(
      session.user.id,
      tutorialId,
      completed
    );

    if (!progress) {
      return NextResponse.json(
        { error: "Failed to update progress" },
        { status: 500 }
      );
    }

    return NextResponse.json({ progress });
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
} 