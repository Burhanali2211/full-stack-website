import { NextRequest, NextResponse } from "next/server";

// Sample search results for static rendering
const SAMPLE_SEARCH_RESULTS = {
  results: [
    {
      id: 1,
      title: "Introduction to JavaScript",
      type: "tutorial",
      description: "Learn the basics of JavaScript programming language",
      url: "/tutorials/javascript-basics"
    },
    {
      id: 2,
      title: "Building a React App",
      type: "project",
      description: "Step-by-step guide to creating a React application",
      url: "/projects/react-app"
    },
    {
      id: 3,
      title: "CSS Grid Layout",
      type: "tutorial",
      description: "Master CSS Grid for modern web layouts",
      url: "/tutorials/css-grid-layout"
    },
    {
      id: 4,
      title: "Python Dictionaries",
      type: "tutorial",
      description: "Learn how to use dictionaries in Python",
      url: "/tutorials/python-dictionaries"
    }
  ]
};

// Static route configuration
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

export async function GET(request: NextRequest) {
  try {
    // Use static sample data instead of dynamic request.url parsing
    return NextResponse.json(SAMPLE_SEARCH_RESULTS, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json(
      { error: 'Search failed', results: [] },
      { status: 500 }
    );
  }
} 