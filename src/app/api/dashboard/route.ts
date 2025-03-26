import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getToken } from 'next-auth/jwt';

export async function GET(request: NextRequest) {
  try {
    // Get the user's session
    const token = await getToken({ req: request });
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user data
    const { data: user, error: userError } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', token.sub)
      .single();

    if (userError) throw userError;

    // Get all courses
    const { data: courses, error: coursesError } = await supabaseAdmin
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (coursesError) throw coursesError;

    // Get user's progress
    const { data: progress, error: progressError } = await supabaseAdmin
      .from('user_progress')
      .select('*')
      .eq('user_id', token.sub);

    if (progressError) throw progressError;

    // Calculate statistics
    const completedCourses = progress.filter(p => p.progress_percentage === 100).length;
    const inProgressCourses = progress.filter(p => p.progress_percentage > 0 && p.progress_percentage < 100).length;
    const totalProgress = progress.reduce((acc, curr) => acc + curr.progress_percentage, 0) / progress.length || 0;

    return NextResponse.json({
      user,
      courses,
      progress,
      stats: {
        completedCourses,
        inProgressCourses,
        totalProgress: Math.round(totalProgress),
        totalCourses: courses.length
      }
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
} 