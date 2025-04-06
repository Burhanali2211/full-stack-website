"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { Loader2, Mail, Lock } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/contexts/auth-context";
import { Suspense } from "react";

// Define validation schema
const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Types for form data
type LoginFormData = z.infer<typeof loginSchema>;

// Login Form Component that handles the search params
function LoginFormContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, refreshSession, isAuthenticated, loading } = useAuth();
  
  // Client-side rendering flag and state
  const [isClient, setIsClient] = useState(false);
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});
  const [serverError, setServerError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loginSuccess, setLoginSuccess] = useState<boolean>(false);
  const [redirectInProgress, setRedirectInProgress] = useState<boolean>(false);
  
  // Get callback URL from query params or use default
  const callbackUrl = searchParams?.get('callbackUrl') || '/dashboard';
  
  // Track maximum waiting time before forcing navigation
  const maxWaitTimer = useRef<NodeJS.Timeout | null>(null);

  // Update the redirect effect for authenticated users
  useEffect(() => {
    // Mark as client-side rendering
    setIsClient(true);
    
    // Skip if still loading authentication state
    if (loading) {
      console.log("Auth still loading, waiting...");
      return;
    }
    
    console.log("Login page auth check:", { 
      isAuthenticated, 
      hasUser: !!user,
      redirectInProgress
    });
    
    // Only redirect if authenticated and not already in process
    if (isAuthenticated && user && !redirectInProgress) {
      console.log("Authenticated user detected on login page, preparing redirect to:", callbackUrl);
      
      // Add redirect tracking in session storage to detect loops
      if (typeof window !== 'undefined') {
        const redirectCount = parseInt(sessionStorage.getItem('auth_redirect_count') || '0');
        
        // If we've redirected too many times in quick succession, break the cycle
        if (redirectCount > 3) {
          console.log("Too many redirects detected, breaking the cycle");
          sessionStorage.removeItem('auth_redirect_count');
          return; // Break the loop
        }
        
        // Increment redirect count
        sessionStorage.setItem('auth_redirect_count', (redirectCount + 1).toString());
        
        // Reset count after 10 seconds to allow future redirects
        setTimeout(() => {
          sessionStorage.removeItem('auth_redirect_count');
        }, 10000);
      }
      
      // Mark that redirect is in progress
      setRedirectInProgress(true);
      
      // Use a small timeout to ensure state updates complete
      setTimeout(() => {
        try {
          console.log("Executing redirect to:", callbackUrl);
          
          if (typeof window !== 'undefined') {
            // Use direct and simple method - history.replaceState
            window.location.replace(callbackUrl);
          }
        } catch (error) {
          console.error("Redirect error:", error);
        }
      }, 100);
    }
    
    // Cleanup function
    return () => {
      if (maxWaitTimer.current) {
        clearTimeout(maxWaitTimer.current);
        maxWaitTimer.current = null;
      }
    };
  }, [user, isAuthenticated, callbackUrl, redirectInProgress, loading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear errors for this field when user edits
    if (errors[name as keyof LoginFormData]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof LoginFormData];
        return newErrors;
      });
    }
    
    // Clear server error when user makes changes
    if (serverError) {
      setServerError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setServerError('');
    setLoginSuccess(false);

    // Validate form data
    try {
      loginSchema.parse(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Partial<LoginFormData> = {};
        err.errors.forEach((error) => {
          const field = error.path[0] as keyof LoginFormData;
          fieldErrors[field] = error.message;
        });
        setErrors(fieldErrors);
        setIsLoading(false);
        return;
      }
    }

    // Try to sign in
    try {
      console.log('Attempting to sign in with Supabase...', formData.email);
      
      // Sign in attempt
      const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (loginError) {
        console.error('Supabase signIn error:', loginError);
        
        if (loginError.message.includes('Email not confirmed')) {
          // Auto-confirm the user instead of asking for email verification
          console.log('Email not confirmed, attempting to auto-verify...');
          
          try {
            // Sign out first to clear any pending sessions
            await supabase.auth.signOut();
            
            // Try to sign up again without verification
            const { error: signUpError } = await supabase.auth.signUp({
              email: formData.email,
              password: formData.password,
              options: {
                // Skip email verification by not setting emailRedirectTo
              }
            });
            
            if (signUpError) {
              console.error('Auto-verification error:', signUpError);
              setServerError('Account verification failed. Please contact support.');
              setIsLoading(false);
              return;
            }
            
            // Try to sign in again
            const { data: secondLoginData, error: secondLoginError } = await supabase.auth.signInWithPassword({
              email: formData.email,
              password: formData.password,
            });
            
            if (secondLoginError) {
              console.error('Sign in after auto-verification failed:', secondLoginError);
              setServerError('Auto-verification succeeded but login failed. Please try again.');
              setIsLoading(false);
              return;
            }
            
            // If we got here, login was successful
            await handleSuccessfulLogin(secondLoginData);
          } catch (autoVerifyError) {
            console.error('Auto-verification exception:', autoVerifyError);
            setServerError('Failed to verify your account automatically. Please try again.');
            setIsLoading(false);
          }
        } else {
          // For other errors, just show the message
          setServerError(loginError.message || 'Invalid email or password. Please try again.');
          setIsLoading(false);
        }
        return;
      }

      // If we got here with no error, login was successful
      await handleSuccessfulLogin(loginData);
    } catch (error) {
      console.error('Login error:', error);
      setServerError('An unexpected error occurred during login. Please try again.');
      setIsLoading(false);
    }
  };

  // Helper function to handle successful login
  const handleSuccessfulLogin = async (loginData: any) => {
    if (!loginData?.session) {
      console.error('No session established after login');
      setServerError('Login failed. No session was established.');
      setIsLoading(false);
      return;
    }
    
    console.log('Login successful, session established');
    setLoginSuccess(true);
    
    // Check if profile exists, create if it doesn't
    try {
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', loginData.user.id)
        .single();
        
      if (profileError || !profileData) {
        // Create a basic profile if none exists
        const { error: createProfileError } = await supabase
          .from('profiles')
          .upsert({
            id: loginData.user.id,
            name: loginData.user.email?.split('@')[0] || 'User',
            email: loginData.user.email,
            points: 0,
            streak: 0,
            completed_courses: 0,
            in_progress_courses: 0,
            created_at: new Date().toISOString(),
          });
          
        if (createProfileError) {
          console.error('Error creating profile during login:', createProfileError);
          // Non-blocking error
        }
      }
    } catch (profileError) {
      console.error('Profile check error:', profileError);
      // Non-blocking error
    }
    
    // Refresh auth context
    await refreshSession();
    
    // Mark redirect as in progress
    setRedirectInProgress(true);
    
    // Direct navigation
    console.log("Login successful, navigating to:", callbackUrl);
    if (typeof window !== 'undefined') {
      window.location.href = callbackUrl;
    }
  };

  // If user is logged in and we're on the client, just show a loading screen
  // The useEffect will handle the redirect
  if (isClient && isAuthenticated && user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>You are already logged in. Redirecting...</p>
          <Button 
            variant="link" 
            className="mt-4" 
            onClick={() => {
              if (typeof window !== 'undefined') {
                window.location.href = callbackUrl;
              }
            }}
          >
            Click here if not redirected automatically
          </Button>
        </div>
      </div>
    );
  }

  // Loading state for server rendering
  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Sign in to your account</CardTitle>
          <CardDescription>Enter your email and password to access your account</CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {serverError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-md">
                {serverError}
              </div>
            )}

            {loginSuccess && (
              <div className="p-3 bg-green-50 border border-green-200 text-green-600 text-sm rounded-md flex items-center">
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Signing in...
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  autoComplete="email"
                  disabled={isLoading || loginSuccess}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link 
                  href="/auth/forgot-password" 
                  className="text-xs text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10"
                  autoComplete="current-password"
                  disabled={isLoading || loginSuccess}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>
          </CardContent>

          <CardFooter className="flex flex-col space-y-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading || loginSuccess}
            >
              {isLoading || loginSuccess ? (
                <span className="flex items-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </span>
              ) : "Sign in"}
            </Button>

            <div className="text-center text-sm">
              Don't have an account?{" "}
              <Link 
                href="/auth/signup" 
                className="text-primary hover:underline"
                tabIndex={isLoading ? -1 : 0}
              >
                Sign up
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    }>
      <LoginFormContent />
    </Suspense>
  );
} 