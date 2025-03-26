import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { supabaseAdmin } from "@/lib/supabase-admin";
import { getToken } from "next-auth/jwt";

export async function GET(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    if (!token || !token.email) {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    // First get the user ID from the email
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', token.email)
      .single();

    if (userError || !user) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    // Get user's progress for all courses
    const { data: progress, error: progressError } = await supabaseAdmin
      .from('user_progress')
      .select(`
        course_id,
        progress_percentage,
        last_accessed_at,
        courses (
          id,
          title,
          description,
          image_url,
          difficulty_level
        )
      `)
      .eq('user_id', user.id);

    if (progressError) throw progressError;

    // Transform the data to match the expected format
    const enrolledTutorials = progress.map(p => ({
      id: p.course_id,
      title: p.courses.title,
      description: p.courses.description,
      image: p.courses.image_url,
      difficulty: p.courses.difficulty_level,
      progress: {
        progress: p.progress_percentage,
        lastUpdated: p.last_accessed_at
      }
    }));

    return NextResponse.json(enrolledTutorials);
  } catch (error) {
    console.error("Error fetching enrolled tutorials:", error);
    return NextResponse.json(
      { message: "Error fetching enrolled tutorials" },
      { status: 500 }
    );
  }
} 