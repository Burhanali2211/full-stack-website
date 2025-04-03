import { createClient } from '@supabase/supabase-js';

// A function to safely create Supabase client that won't break builds
const createSafeSupabaseClient = () => {
  // In environments without proper env variables (like build time on fresh Vercel projects)
  // provide dummy values that won't cause crashes
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-supabase-url.supabase.co';
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-key-for-build-only';

  // Log warnings in non-production environments
  if (process.env.NODE_ENV !== 'production') {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.warn('Warning: Missing NEXT_PUBLIC_SUPABASE_URL environment variable');
    }
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.warn('Warning: Missing SUPABASE_SERVICE_ROLE_KEY environment variable');
    }
  }

  // Ensure the URL has proper format (starts with http/https)
  const formattedUrl = supabaseUrl.startsWith('http') 
    ? supabaseUrl 
    : `https://${supabaseUrl}`;

  try {
    // Create a Supabase client with the service role key for admin operations
    return createClient(
      formattedUrl,
      supabaseServiceKey,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
  } catch (error) {
    // If client creation fails during build, return a stub client
    // that won't crash builds but will throw appropriate errors in runtime
    console.error('Error creating Supabase client:', error);
    
    if (process.env.NODE_ENV === 'production') {
      throw error; // In production, we want to know about this error
    }
    
    // Return a stub client for build time
    return {
      from: () => ({
        select: () => ({
          eq: () => ({
            single: async () => ({ data: null, error: new Error('Supabase client unavailable') })
          }),
          insert: () => ({
            select: () => ({
              single: async () => ({ data: null, error: new Error('Supabase client unavailable') })
            })
          })
        })
      }),
      // Add other method stubs as needed
    } as any;
  }
};

// Export the client
export const supabaseAdmin = createSafeSupabaseClient(); 