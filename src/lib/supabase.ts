"use client";

import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Singleton pattern for Supabase client
let supabaseInstance: ReturnType<typeof createClient> | null = null;

/**
 * Create and initialize the Supabase client
 * This uses a singleton pattern to prevent multiple initializations
 */
export const getSupabase = () => {
  // If the client has already been initialized, return it
  if (supabaseInstance) {
    return supabaseInstance;
  }

  // Initialize the client if it hasn't been created yet
  console.log(`Initializing Supabase client with URL: ${supabaseUrl.substring(0, 20)}...`);
  
  // Create the client with stable settings
  supabaseInstance = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      storageKey: 'supabase-auth',
      autoRefreshToken: true,
      detectSessionInUrl: true
    },
    global: {
      headers: { 
        'x-application-name': 'educational-platform',
      }
    },
    localStorage: typeof window !== 'undefined' ? window.localStorage : undefined,
  });

  // Add a hook to detect auth state changes (useful for debugging)
  if (typeof window !== 'undefined') { 
    supabaseInstance.auth.onAuthStateChange((event, session) => {
      console.log('Supabase auth event:', event);
    });
  }

  return supabaseInstance;
};

// Export the singleton instance as 'supabase' for backward compatibility
export const supabase = getSupabase(); 