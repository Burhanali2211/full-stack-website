import { NextResponse } from "next/server";
import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getToken } from 'next-auth/jwt';

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

    const { data: progress, error } = await supabaseAdmin
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id);

    if (error) throw error;

    // Transform the data to match the expected format
    const formattedProgress = progress.map(p => ({
      tutorialId: p.course_id,
      progress: p.progress_percentage,
      lastUpdated: p.last_accessed_at
    }));

    return NextResponse.json(formattedProgress);
  } catch (error) {
    console.error("Error fetching progress:", error);
    return NextResponse.json(
      { message: "Error fetching progress" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = await getToken({ req: request });
    if (!token || !token.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
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

    const body = await request.json();
    const { courseId, progress } = body;

    if (!courseId || typeof progress !== 'number' || progress < 0 || progress > 100) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      );
    }

    // Check if progress record exists
    const { data: existingProgress, error: checkError } = await supabaseAdmin
      .from('user_progress')
      .select('*')
      .eq('user_id', user.id)
      .eq('course_id', courseId)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "not found" error
      throw checkError;
    }

    let result;
    if (existingProgress) {
      // Update existing progress
      const { data, error } = await supabaseAdmin
        .from('user_progress')
        .update({
          progress_percentage: progress,
          last_accessed_at: new Date().toISOString(),
          completed_at: progress === 100 ? new Date().toISOString() : existingProgress.completed_at
        })
        .eq('id', existingProgress.id)
        .select()
        .single();

      if (error) throw error;
      result = data;
    } else {
      // Create new progress record
      const { data, error } = await supabaseAdmin
        .from('user_progress')
        .insert({
          user_id: user.id,
          course_id: courseId,
          progress_percentage: progress,
          completed_at: progress === 100 ? new Date().toISOString() : null
        })
        .select()
        .single();

      if (error) throw error;
      result = data;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error updating progress:", error);
    return NextResponse.json(
      { message: "Error updating progress" },
      { status: 500 }
    );
  }
} 