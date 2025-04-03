'use client';

import { type DefaultSession } from 'next-auth';

// Define types for NextAuth
declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role?: string | null;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    role?: string | null;
  }
}

// Custom session options for client-side
export const authConfig = {
  // Client-side-safe configuration
  // These options can be referenced in client components
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  },
}; 