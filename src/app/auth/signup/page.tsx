"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/contexts/auth-context";

// Signup form validation schema
const signupSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Please confirm your password'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignupPage() {
  const router = useRouter();
  const { user, refreshSession, isAuthenticated, loading } = useAuth();
  
  // Force client-side only rendering
  const [isClient, setIsClient] = useState(false);
  const [redirectInProgress, setRedirectInProgress] = useState<boolean>(false);
  
  // Detect redirect loops
  const redirectAttempts = useRef(0);
  const lastRedirectTime = useRef(0);
  
  const [formData, setFormData] = useState<SignupFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<SignupFormData>>({});
  const [serverError, setServerError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [debugInfo, setDebugInfo] = useState<string | null>(null);

  // Set client-side rendering flag on mount and handle already logged in users
  useEffect(() => {
    setIsClient(true);
    
    // Track redirect attempts to detect loops
    const now = Date.now();
    if (now - lastRedirectTime.current < 1000) {
      redirectAttempts.current++;
    } else {
      redirectAttempts.current = 0;
    }
    
    lastRedirectTime.current = now;
    
    // If we detect a redirect loop (multiple attempts in quick succession)
    if (redirectAttempts.current >= 3) {
      console.error('Detected possible redirect loop, stopping redirects');
      redirectAttempts.current = 0;
      return;
    }
    
    // Wait for auth to initialize before checking if user is logged in
    if (loading) {
      return;
    }
    
    // If user is already logged in and not already redirecting, redirect to dashboard
    if (isAuthenticated && user && !redirectInProgress) {
      console.log("User already logged in, redirecting to dashboard");
      setRedirectInProgress(true);
      
      try {
        // Use router.push instead of window.location for smoother navigation
        router.push('/dashboard');
      } catch (e) {
        console.error("Navigation error:", e);
      }
    }
  }, [user, isAuthenticated, redirectInProgress, loading, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof SignupFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
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
    setSuccess(false);
    setDebugInfo(null);

    // Log environment variables (without exposing actual values)
    console.log('Environment variables loaded:', {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✓ Set' : '✗ Missing',
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '✓ Set' : '✗ Missing'
    });

    // Validate form data
    try {
      signupSchema.parse(formData);
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Partial<SignupFormData> = {};
        err.errors.forEach((error) => {
          const field = error.path[0] as keyof SignupFormData;
          fieldErrors[field] = error.message;
        });
        setErrors(fieldErrors);
        setIsLoading(false);
        return;
      }
    }

    try {
      console.log('Attempting to sign up and auto-login with Supabase...');
      
      // 1. First register the user
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            full_name: formData.name,
          },
          // Skip email verification by not setting emailRedirectTo
        },
      });

      if (signUpError) {
        console.error('Supabase signUp error:', signUpError);
        setServerError(signUpError.message || 'An error occurred during registration');
        setDebugInfo(JSON.stringify(signUpError, null, 2));
        setIsLoading(false);
        return;
      }
      
      console.log('Signup successful, auto-logging in user');
      
      // 2. Immediately sign in the user
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password
      });
      
      if (signInError) {
        console.error('Auto-login error:', signInError);
        setServerError('Account created but auto-login failed. Please try logging in manually.');
        setIsLoading(false);
        setSuccess(true); // Still show success since account was created
        return;
      }
      
      // 3. Create user profile
      const userId = signInData.user?.id;
      if (userId) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: userId,
            name: formData.name,
            email: formData.email,
            points: 0,
            streak: 0,
            completed_courses: 0,
            in_progress_courses: 0,
            created_at: new Date().toISOString(),
          });
          
        if (profileError) {
          console.error('Error creating profile:', profileError);
          // Non-blocking error, still proceed with login
        }
      }

      // 4. Refresh session and redirect
      await refreshSession();
      
      // Mark redirect as in progress
      setRedirectInProgress(true);
      
      // Wait a moment to ensure state is updated
      setTimeout(() => {
        try {
          // Use router.push for a smoother navigation experience
          router.push('/dashboard');
        } catch (e) {
          console.error("Navigation error:", e);
          // Fallback to direct location change if router fails
          window.location.href = '/dashboard';
        }
      }, 100);
    } catch (error: any) {
      console.error('Signup error:', error);
      setServerError('An error occurred during registration. Please try again.');
      setDebugInfo(error?.message || 'Unknown error during signup process');
      setIsLoading(false);
    }
  };

  // Loading or skeleton state until client-side code is ready
  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md animate-pulse">
          <div className="h-12 bg-gray-200 rounded mb-6"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  // If user is logged in and we're on the client, just show a loading screen
  // The useEffect will handle the redirect
  if (isClient && isAuthenticated && user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>You are already logged in. Redirecting...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Create an account</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>

        {success ? (
          <CardContent className="space-y-4">
            <Alert className="bg-green-50 border-green-200">
              <AlertDescription className="text-green-800">
                Registration successful! You can now log in to your account.
              </AlertDescription>
            </Alert>
            <Button 
              onClick={() => router.push('/auth/login')}
              className="w-full mt-4"
            >
              Go to Login
            </Button>
          </CardContent>
        ) : (
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              {serverError && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{serverError}</AlertDescription>
                </Alert>
              )}

              {debugInfo && process.env.NODE_ENV === 'development' && (
                <Alert className="bg-blue-50 border-blue-200 text-blue-800 text-xs">
                  <details>
                    <summary>Debug Information (Development Only)</summary>
                    <pre className="mt-2 text-xs overflow-auto">{debugInfo}</pre>
                  </details>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="text-sm text-red-500">{errors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="email"
                />
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="********"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  disabled={isLoading}
                  autoComplete="new-password"
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                )}
              </div>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit"
                className="w-full" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  'Create account'
                )}
              </Button>

              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-primary hover:underline">
                  Sign in
                </Link>
              </div>
            </CardFooter>
          </form>
        )}
      </Card>
    </div>
  );
} 