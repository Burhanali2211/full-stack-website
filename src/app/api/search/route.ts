import { NextResponse } from "next/server";

// Mock data - In production, this would come from your database
const searchableContent = [
  {
    type: "tutorial",
    title: "Python File Converter Tutorial",
    description: "Learn how to build a file converter application using Python",
    url: "/tutorials/python-file-converter",
  },
  {
    type: "blog",
    title: "Getting Started with Next.js",
    description: "A comprehensive guide to building modern web applications with Next.js",
    url: "/blog/getting-started-with-nextjs",
  },
  {
    type: "project",
    title: "File Converter",
    description: "A versatile file conversion tool built with Python",
    url: "/projects/file-converter",
  },
  // Add more searchable content here
];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q")?.toLowerCase();

    if (!query) {
      return NextResponse.json([]);
    }

    // Filter content based on search query
    const results = searchableContent.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(query);
      const descriptionMatch = item.description.toLowerCase().includes(query);
      return titleMatch || descriptionMatch;
    });

    // Add artificial delay to simulate database query
    await new Promise(resolve => setTimeout(resolve, 100));

    return NextResponse.json(results);
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Failed to perform search" },
      { status: 500 }
    );
  }
} 