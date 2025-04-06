/**
 * Authentication Test Script
 * 
 * This script helps identify issues with the authentication flow.
 * Run it with Node.js to check for configuration problems.
 */

const fs = require('fs');
const path = require('path');

console.log('Authentication Test Script');
console.log('=========================\n');

// Function to check a file exists
const fileExists = (filepath) => {
  try {
    return fs.existsSync(filepath);
  } catch (error) {
    return false;
  }
};

// Check middleware.ts
console.log('✅ Checking middleware configuration...');
const middlewarePath = path.join(process.cwd(), 'src', 'middleware.ts');
if (fileExists(middlewarePath)) {
  console.log('  ✓ middleware.ts file exists');
} else {
  console.log('  ✗ middleware.ts file is missing');
}

// Check auth context
console.log('\n✅ Checking auth context...');
const authContextPath = path.join(process.cwd(), 'src', 'contexts', 'auth-context.tsx');
if (fileExists(authContextPath)) {
  console.log('  ✓ auth-context.tsx file exists');
} else {
  console.log('  ✗ auth-context.tsx file is missing');
}

// Check Supabase configuration
console.log('\n✅ Checking Supabase configuration...');
const supabasePath = path.join(process.cwd(), 'src', 'lib', 'supabase.ts');
if (fileExists(supabasePath)) {
  console.log('  ✓ supabase.ts file exists');
  
  // Check for environment variables
  const envFile = path.join(process.cwd(), '.env.local');
  if (fileExists(envFile)) {
    console.log('  ✓ .env.local file exists');
    
    const envContent = fs.readFileSync(envFile, 'utf8');
    if (envContent.includes('NEXT_PUBLIC_SUPABASE_URL')) {
      console.log('  ✓ NEXT_PUBLIC_SUPABASE_URL is defined');
    } else {
      console.log('  ✗ NEXT_PUBLIC_SUPABASE_URL is missing');
    }
    
    if (envContent.includes('NEXT_PUBLIC_SUPABASE_ANON_KEY')) {
      console.log('  ✓ NEXT_PUBLIC_SUPABASE_ANON_KEY is defined');
    } else {
      console.log('  ✗ NEXT_PUBLIC_SUPABASE_ANON_KEY is missing');
    }
  } else {
    console.log('  ✗ .env.local file is missing');
  }
} else {
  console.log('  ✗ supabase.ts file is missing');
}

// Check for NextAuth configuration
console.log('\n✅ Checking NextAuth configuration...');
const nextAuthPath = path.join(process.cwd(), 'src', 'app', 'api', 'auth', '[...nextauth]', 'route.ts');
if (fileExists(nextAuthPath)) {
  console.log('  ✓ NextAuth route.ts file exists');
  const nextAuthContent = fs.readFileSync(nextAuthPath, 'utf8');
  if (nextAuthContent.includes('export const disabled = true')) {
    console.log('  ✓ NextAuth is correctly disabled');
  } else {
    console.log('  ✗ NextAuth is not properly disabled, which may cause conflicts');
  }
} else {
  console.log('  ✓ No NextAuth configuration detected');
}

console.log('\n✅ Checking login page...');
const loginPagePath = path.join(process.cwd(), 'src', 'app', 'auth', 'login', 'page.tsx');
if (fileExists(loginPagePath)) {
  console.log('  ✓ Login page exists');
  
  // Check for important features in login page
  const loginContent = fs.readFileSync(loginPagePath, 'utf8');
  if (loginContent.includes('useAuth()')) {
    console.log('  ✓ Login page uses useAuth hook');
  } else {
    console.log('  ✗ Login page does not use the useAuth hook');
  }
  
  if (loginContent.includes('supabase.auth.signInWithPassword')) {
    console.log('  ✓ Login page uses Supabase authentication');
  } else {
    console.log('  ✗ Login page does not use Supabase authentication');
  }
  
  if (loginContent.includes('Suspense')) {
    console.log('  ✓ Login page uses Suspense for proper loading');
  } else {
    console.log('  ✗ Login page does not use Suspense');
  }
} else {
  console.log('  ✗ Login page is missing');
}

console.log('\n=========================');
console.log('Authentication test completed. Address any issues marked with ✗'); 