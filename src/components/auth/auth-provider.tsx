'use client';

import { SessionProvider } from 'next-auth/react';

type AuthProviderProps = {
  children: React.ReactNode;
  session?: any; // This allows passing session data from server components
};

/**
 * Auth provider component that wraps the NextAuth SessionProvider
 * This is needed to properly handle authentication in Next.js App Router
 */
export default function AuthProvider({ 
  children,
  session
}: AuthProviderProps) {
  return (
    <SessionProvider session={session}>{children}</SessionProvider>
  );
} 