import { NextResponse } from 'next/server';

const GITHUB_API_URL = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export async function GET() {
  try {
    const response = await fetch(`${GITHUB_API_URL}/users/Burhanali2211/repos`, {
      headers: {
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch repositories');
    }

    const repos = await response.json();
    return NextResponse.json(repos);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch GitHub repositories' },
      { status: 500 }
    );
  }
} 