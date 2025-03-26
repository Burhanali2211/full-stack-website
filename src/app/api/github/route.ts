import { NextRequest, NextResponse } from "next/server";

// This would typically be stored in environment variables
const GITHUB_API_URL = "https://api.github.com";

interface GithubResponse {
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
}

export async function GET(request: NextRequest): Promise<NextResponse<{ repositories: GithubResponse[] }>> {
  try {
    const searchParams = request.nextUrl.searchParams;
    const username = searchParams.get("username") || "github";
    
    // Fetch user repositories
    const response = await fetch(`${GITHUB_API_URL}/users/${username}/repos?sort=updated&per_page=5`, {
      headers: {
        "Accept": "application/vnd.github.v3+json",
        // In a real application, you would use an auth token
        // "Authorization": `token ${process.env.GITHUB_TOKEN}`,
      },
    });
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const repos = await response.json();
    
    // Extract relevant information
    const formattedRepos = repos.map((repo: any) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      language: repo.language,
      updated_at: repo.updated_at,
    }));
    
    return NextResponse.json({ repos: formattedRepos }, { status: 200 });
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
} 