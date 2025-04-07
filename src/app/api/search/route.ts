import { NextRequest, NextResponse } from "next/server";
import { blogPosts } from "@/data/mock-blog-posts";
import { projects } from "@/data/projects";

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

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  if (!query) {
    return NextResponse.json([]);
  }

  // Search in blog posts
  const blogResults = blogPosts
    .filter(post => 
      post.title.toLowerCase().includes(query) ||
      post.description.toLowerCase().includes(query) ||
      post.content.toLowerCase().includes(query)
    )
    .map(post => ({
      type: "blog" as const,
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
    }));

  // Search in projects
  const projectResults = projects
    .filter(project =>
      project.title.toLowerCase().includes(query) ||
      project.description.toLowerCase().includes(query)
    )
    .map(project => ({
      type: "project" as const,
      title: project.title,
      description: project.description,
      url: `/projects/${project.slug}`,
    }));

  // Combine and sort results
  const results = [...blogResults, ...projectResults]
    .sort((a, b) => {
      // Prioritize exact matches in titles
      const aTitleMatch = a.title.toLowerCase() === query;
      const bTitleMatch = b.title.toLowerCase() === query;
      if (aTitleMatch && !bTitleMatch) return -1;
      if (!aTitleMatch && bTitleMatch) return 1;
      return 0;
    });

  return NextResponse.json(results);
} 