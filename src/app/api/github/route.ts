import { NextRequest, NextResponse } from "next/server";

// This would typically be stored in environment variables
const GITHUB_API_URL = "https://api.github.com";

interface GithubResponse {
  id: number;
  name: string;
  description: string | null;
  url: string;
  stars: number;
  forks: number;
  language: string | null;
  updated_at: string;
}

// Sample GitHub data for static rendering
const SAMPLE_GITHUB_DATA = {
  repositories: [
    {
      id: 1,
      name: "javascript-learning-path",
      description: "A comprehensive learning path for JavaScript developers",
      stars: 156,
      forks: 42,
      language: "JavaScript",
      url: "https://github.com/example/javascript-learning-path"
    },
    {
      id: 2,
      name: "react-starter-kit",
      description: "A starter kit for React applications with best practices",
      stars: 387,
      forks: 98,
      language: "TypeScript",
      url: "https://github.com/example/react-starter-kit"
    },
    {
      id: 3,
      name: "python-data-science",
      description: "Python resources for data science and machine learning",
      stars: 423,
      forks: 112,
      language: "Python",
      url: "https://github.com/example/python-data-science"
    }
  ],
  trending: [
    {
      id: 4,
      name: "next-js-course",
      description: "Learn Next.js by building real-world applications",
      stars: 821,
      forks: 213,
      language: "TypeScript",
      url: "https://github.com/example/next-js-course"
    }
  ]
};

// Static route configuration
export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

// GET handler for GitHub data
export async function GET(request: NextRequest) {
  try {
    // Use static sample data instead of dynamic request.url parsing
    return NextResponse.json(SAMPLE_GITHUB_DATA, {
      status: 200,
      headers: {
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching GitHub data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub data' },
      { status: 500 }
    );
  }
} 