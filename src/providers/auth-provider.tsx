'use client';

import { SessionProvider, useSession, signIn, signOut } from 'next-auth/react';

/**
 * AuthProvider component that safely provides NextAuth session without accessing process.env
 */
export default function AuthProvider({ 
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider 
      // Avoid any options that might trigger server-side environment variable access
      refetchInterval={0}
      refetchOnWindowFocus={false}
    >
      {children}
    </SessionProvider>
  );
}

/**
 * Client-side hooks for auth
 */
export function useAuth() {
  const { data: session, status } = useSession();
  
  return {
    session,
    status,
    isAuthenticated: status === 'authenticated',
    isLoading: status === 'loading',
    signIn,
    signOut,
  };
} 