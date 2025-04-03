'use client';

import { useSession } from 'next-auth/react';

/**
 * Client-side hook that safely accesses the session without relying on process.env
 * Use this in client components to access user authentication
 */
export function useAuth() {
  const { data, status, update } = useSession();
  
  const isAuthenticated = status === 'authenticated';
  const isLoading = status === 'loading';
  const user = data?.user;
  
  return {
    user,
    isAuthenticated,
    isLoading,
    status,
    updateSession: update,
  };
} 