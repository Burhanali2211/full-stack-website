import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * DISABLED MIDDLEWARE
 * All authentication is now handled at the component level
 */
export async function middleware(request: NextRequest) {
  // Simply pass all requests through without any redirection
  return NextResponse.next();
}

// Set the matcher to empty to effectively disable middleware
// This prevents any unintended redirects
export const config = {
  matcher: [],
};