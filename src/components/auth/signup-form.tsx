"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import * as z from 'zod';

// Form validation schema
const signupSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }),
});

type SignupFormData = z.infer<typeof signupSchema>;

export default function SignUpForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Validate form data
      const result = signupSchema.safeParse({ email, password });
      if (!result.success) {
        const errors = result.error.flatten().fieldErrors;
        const errorMessage = Object.values(errors).flat()[0] || "Invalid form data";
        throw new Error(errorMessage);
      }

      // Sign up with Supabase
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (signUpError) throw signUpError;
      setIsSuccess(true);
    } catch (error: any) {
      setError(error.message || 'Failed to sign up');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Check your email</h2>
        <p>We've sent you a confirmation link. Please check your email to complete your registration.</p>
        <Button onClick={() => router.push('/auth/login')}>
          Go to Login
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full max-w-md">
      <h1 className="text-2xl font-bold text-center">Create Account</h1>
      
      {error && (
        <div className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="your@email.com"
            disabled={isLoading}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">Password</label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="••••••••"
            minLength={8}
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500">Must be at least 8 characters</p>
        </div>
        
        <Button
          type="submit"
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
    </div>
  );
} 