import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase-admin';
import { getToken } from 'next-auth/jwt';

// Sample dashboard data for static rendering
const SAMPLE_DASHBOARD_DATA = {
  user: {
    name: "Demo User",
    email: "user@example.com",
    avatar: "/images/avatars/default.jpg"
  },
  stats: {
    completedTutorials: 5,
    inProgressTutorials: 2,
    totalProjects: 3,
    points: 750
  },
  recentActivity: [
    {
      id: 1,
      type: "tutorial",
      title: "JavaScript Basics",
      date: "2023-12-15T10:30:00Z",
      progress: 100,
      url: "/tutorials/javascript-basics"
    },
    {
      id: 2,
      type: "project",
      title: "File Converter",
      date: "2023-12-10T14:45:00Z",
      progress: 75,
      url: "/projects/file-converter"
    },
    {
      id: 3,
      type: "tutorial",
      title: "Python Dictionaries",
      date: "2023-12-05T09:15:00Z",
      progress: 100,
      url: "/tutorials/python-dictionaries"
    }
  ],
  recommendations: [
    {
      id: 1,
      type: "tutorial",
      title: "CSS Grid Layout",
      description: "Master CSS Grid for modern web layouts",
      url: "/tutorials/css-grid-layout"
    },
    {
      id: 2,
      type: "project",
      title: "React Dashboard",
      description: "Build a responsive admin dashboard with React",
      url: "/projects/react-dashboard"
    }
  ]
};

// Static route configuration
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export async function GET(request: NextRequest) {
  try {
    // Use static sample data instead of dynamic request.cookies usage
    return NextResponse.json(SAMPLE_DASHBOARD_DATA, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard data' },
      { status: 500 }
    );
  }
} 