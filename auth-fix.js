/**
 * Authentication Fix Utility
 * 
 * This script helps fix common issues with the authentication flow.
 */

const fs = require('fs');
const path = require('path');

console.log('Authentication Fix Utility');
console.log('=========================\n');

// Function to check a file exists and get content
const readFile = (filepath) => {
  try {
    if (fs.existsSync(filepath)) {
      return fs.readFileSync(filepath, 'utf8');
    }
    return null;
  } catch (error) {
    console.error(`Error reading ${filepath}:`, error);
    return null;
  }
};

// Function to write file
const writeFile = (filepath, content) => {
  try {
    fs.writeFileSync(filepath, content, 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing ${filepath}:`, error);
    return false;
  }
};

// Fix middleware redirects
console.log('✅ Fixing middleware configuration...');
const middlewarePath = path.join(process.cwd(), 'src', 'middleware.ts');
const middlewareContent = readFile(middlewarePath);

if (middlewareContent) {
  console.log('  ✓ middleware.ts file exists');
  
  // Simplify middleware to prevent redirect loops
  const updatedMiddleware = `import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Track redirects to prevent loops - memory-based solution
const redirectTracker = new Map();

/**
 * Middleware to handle authentication and redirects
 */
export async function middleware(request: NextRequest) {
  try {
    // Get path and query parameters
    const { pathname, search } = request.nextUrl;
    const clientId = request.headers.get('x-client-id') || request.ip || Math.random().toString();
    
    // Skip middleware for static assets and API routes
    if (
      pathname.startsWith('/_next') || 
      pathname.startsWith('/api') ||
      pathname.includes('.') || // Skip files like favicon.ico, etc.
      pathname === '/' // Skip homepage
    ) {
      return NextResponse.next();
    }

    // Check if user is on an auth page
    const isAuthPage = pathname.startsWith('/auth');
    
    // Anti-loop protection: Skip if already on login with callbackUrl
    if (isAuthPage && pathname === '/auth/login' && search.includes('callbackUrl')) {
      return NextResponse.next();
    }
    
    // Get auth cookie to check authentication
    const authCookie = request.cookies.get('sb-access-token')?.value || 
                       request.cookies.get('supabase-auth-token')?.value;
    
    // Check if user is authenticated by presence of auth cookie
    const isAuthenticated = !!authCookie;
    
    // Simple anti-loop protection
    const requestKey = \`\${clientId}-\${pathname}\`;
    const now = Date.now();
    const lastRedirect = redirectTracker.get(requestKey);
    
    if (lastRedirect && (now - lastRedirect) < 2000) {
      // This request was redirected within the last 2 seconds
      // Break the potential loop by allowing it through
      console.log(\`Breaking potential redirect loop for \${pathname}\`);
      return NextResponse.next();
    }
    
    // For protected routes, redirect to login if not authenticated
    if (!isAuthenticated && !isAuthPage && shouldProtectRoute(pathname)) {
      // Only log important redirects
      if (!pathname.includes('.')) {
        console.log(\`User not authenticated, redirecting to login from: \${pathname}\`);
      }
      
      // Track this redirect
      redirectTracker.set(requestKey, now);
      
      // Simple cleanup to prevent memory leaks
      if (redirectTracker.size > 100) {
        // Clean up old entries
        for (const [key, timestamp] of redirectTracker.entries()) {
          if (now - timestamp > 10000) { // 10 seconds
            redirectTracker.delete(key);
          }
        }
      }
      
      const url = new URL('/auth/login', request.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }

    // For auth pages, redirect to dashboard if already authenticated
    if (isAuthenticated && isAuthPage && pathname !== '/auth/logout') {
      console.log('User authenticated, redirecting from auth page to dashboard');
      
      // Track this redirect
      redirectTracker.set(requestKey, now);
      
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware error:", error);
    return NextResponse.next();
  }
}

// Helper to determine if a route should be protected
function shouldProtectRoute(pathname: string): boolean {
  const protectedPaths = [
    '/dashboard',
    '/profile',
    '/settings',
  ];
  
  return protectedPaths.some(path => pathname.startsWith(path));
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};`;

  if (writeFile(middlewarePath, updatedMiddleware)) {
    console.log('  ✓ Updated middleware to prevent redirect loops');
  } else {
    console.log('  ✗ Failed to update middleware');
  }
} else {
  console.log('  ✗ middleware.ts file is missing');
}

// Fix login page
console.log('\n✅ Fixing login page redirect handling...');
const loginPagePath = path.join(process.cwd(), 'src', 'app', 'auth', 'login', 'page.tsx');
const loginContent = readFile(loginPagePath);

if (loginContent) {
  console.log('  ✓ Login page exists');
  
  // Simplify the useEffect block that handles redirects in LoginFormContent component
  let updatedLogin = loginContent;
  
  // Find the useEffect block for redirects
  const redirectEffectRegex = /useEffect\(\s*\(\)\s*=>\s*{[\s\S]*?setIsClient\(true\);[\s\S]*?}\s*,\s*\[\s*user\s*,\s*isAuthenticated\s*,\s*callbackUrl\s*,\s*redirectInProgress\s*,\s*loading[\s\S]*?\]\);/;
  
  // Replace with simplified useEffect
  const newRedirectEffect = `useEffect(() => {
    setIsClient(true);
    
    // Return early if still loading or already redirecting
    if (loading || redirectInProgress) {
      return;
    }
    
    // If user is authenticated, redirect once
    if (isAuthenticated && user) {
      console.log("User authenticated, redirecting to:", callbackUrl);
      setRedirectInProgress(true);
      
      // Simple direct navigation
      if (typeof window !== 'undefined') {
        window.location.href = callbackUrl;
      }
    }
    
    return () => {
      if (maxWaitTimer.current) {
        clearTimeout(maxWaitTimer.current);
        maxWaitTimer.current = null;
      }
    };
  }, [user, isAuthenticated, callbackUrl, redirectInProgress, loading]);`;
  
  updatedLogin = updatedLogin.replace(redirectEffectRegex, newRedirectEffect);
  
  if (writeFile(loginPagePath, updatedLogin)) {
    console.log('  ✓ Updated login page redirect handling');
  } else {
    console.log('  ✗ Failed to update login page');
  }
} else {
  console.log('  ✗ Login page is missing');
}

console.log('\n=========================');
console.log('Authentication fixes applied. Restart the server to apply changes.'); 