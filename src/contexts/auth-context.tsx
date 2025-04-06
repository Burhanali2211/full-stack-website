"use client";

import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

// Create auth context
type AuthContextType = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  isAuthenticated: false,
  signOut: async () => {},
  refreshSession: async () => {},
});

/**
 * Debounce function to prevent multiple rapid calls
 */
function debounce<F extends (...args: any[]) => any>(func: F, wait: number): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;

  return function(...args: Parameters<F>) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

/**
 * AuthProvider component that provides Supabase authentication
 */
export function AuthProvider({ 
  children,
}: {
  children: React.ReactNode;
}) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authInitialized, setAuthInitialized] = useState(false);
  const authStateChanging = useRef(false);
  const redirectTimeout = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const authChecked = useRef(false);

  // Function to manually refresh session data
  const refreshSession = useCallback(async () => {
    // Don't refresh if we're already updating auth state
    if (authStateChanging.current) return;
    
    try {
      authStateChanging.current = true;
      console.log("Manually refreshing session");
      
      const { data, error } = await supabase.auth.getSession();
      if (error) {
        console.error("Error refreshing session:", error);
        setSession(null);
        setUser(null);
        setIsAuthenticated(false);
        return;
      }
      
      if (data.session) {
        console.log("Session refresh successful:", data.session.user.email);
        setSession(data.session);
        setUser(data.session.user);
        setIsAuthenticated(true);
      } else {
        console.log("No session found during refresh");
        setSession(null);
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Failed to refresh session:", error);
      setSession(null);
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      authStateChanging.current = false;
    }
  }, []);

  // Wrapper for the debounced refresh session to ensure it returns a Promise
  const debouncedRefreshSessionWrapper = useCallback(async (): Promise<void> => {
    debouncedRefreshSession();
    return Promise.resolve();
  }, []);

  // Debounced version of refreshSession to prevent rapid calls
  const debouncedRefreshSession = useCallback(
    debounce(refreshSession, 300),
    [refreshSession]
  );

  // Sign out function
  const signOut = async () => {
    try {
      // Clear any pending redirect timeouts
      if (redirectTimeout.current) {
        clearTimeout(redirectTimeout.current);
        redirectTimeout.current = null;
      }
      
      // Update local state first to prevent flashing of content
      setUser(null);
      setSession(null);
      setIsAuthenticated(false);
      
      // Perform actual sign out
      await supabase.auth.signOut();
      
      console.log("User signed out successfully");
      
      // Ensure we're on the client side
      if (typeof window !== 'undefined') {
        // Direct navigation to login page
        window.location.href = '/auth/login';
      }
    } catch (error) {
      console.error("Error signing out:", error);
      // Try direct navigation as a fallback
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
  };

  useEffect(() => {
    let isActive = true; // For cleanup/preventing state updates after unmount
    
    // Initial session check
    const initializeAuth = async () => {
      // Avoid multiple auth checks
      if (authChecked.current) return;
      authChecked.current = true;
      
      try {
        if (!isActive) return;
        
        setLoading(true);
        console.log("Initializing auth state...");
        
        const { data, error } = await supabase.auth.getSession();
        
        if (!isActive) return;
        
        if (error) {
          console.error("Error checking session:", error);
          setSession(null);
          setUser(null);
          setIsAuthenticated(false);
          setLoading(false);
          setAuthInitialized(true);
          return;
        }
        
        if (data.session) {
          console.log("Initial auth state: Authenticated", data.session.user.email);
          setSession(data.session);
          setUser(data.session.user);
          setIsAuthenticated(true);
        } else {
          console.log("Initial auth state: Not authenticated");
          setSession(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Failed to initialize auth:", error);
        if (isActive) {
          setSession(null);
          setUser(null);
          setIsAuthenticated(false);
        }
      } finally {
        if (isActive) {
          setLoading(false);
          setAuthInitialized(true);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        if (!isActive) return;
        
        console.log("Auth state changed:", event, currentSession?.user?.email);
        
        // Don't change state if not fully initialized yet
        if (!authInitialized) {
          return;
        }
        
        // Handle specific auth events
        switch (event) {
          case 'SIGNED_IN':
            if (currentSession) {
              console.log("User signed in:", currentSession.user.email);
              setSession(currentSession);
              setUser(currentSession.user);
              setIsAuthenticated(true);
              
              // Clear any existing timeouts
              if (redirectTimeout.current) {
                clearTimeout(redirectTimeout.current);
                redirectTimeout.current = null;
              }
            }
            break;
            
          case 'SIGNED_OUT':
            console.log("User signed out");
            setSession(null);
            setUser(null);
            setIsAuthenticated(false);
            
            // Clear any existing timeouts
            if (redirectTimeout.current) {
              clearTimeout(redirectTimeout.current);
              redirectTimeout.current = null;
            }
            break;
            
          case 'USER_UPDATED':
            if (currentSession) {
              console.log("User updated:", currentSession.user.email);
              setUser(currentSession.user);
              setSession(currentSession);
            }
            break;
            
          case 'TOKEN_REFRESHED':
            if (currentSession) {
              console.log("Token refreshed for:", currentSession.user.email);
              setSession(currentSession);
            }
            break;
            
          // Make sure to handle other state changes
          default:
            if (currentSession) {
              setSession(currentSession);
              setUser(currentSession.user);
              setIsAuthenticated(true);
            } else {
              setSession(null);
              setUser(null);
              setIsAuthenticated(false);
            }
            break;
        }
      }
    );

    return () => {
      isActive = false;
      
      // Clear any pending timeouts
      if (redirectTimeout.current) {
        clearTimeout(redirectTimeout.current);
        redirectTimeout.current = null;
      }
      
      // Unsubscribe from auth changes
      subscription.unsubscribe();
    };
  }, [authInitialized]);

  const value = {
    user,
    session,
    loading,
    isAuthenticated,
    signOut,
    refreshSession: debouncedRefreshSessionWrapper,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 