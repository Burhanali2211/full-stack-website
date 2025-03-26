import { supabase } from './supabase';
import { Database } from '@/types/supabase';

type User = Database['public']['Tables']['users']['Row'];

// Authentication helpers
export const signUpWithEmail = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name }
    }
  });
  
  if (error) throw error;
  return data;
};

export const signInWithEmail = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });
  
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

// User data helpers
export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const updateUserProfile = async (userId: string, updates: Partial<User>) => {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .select()
    .single();
  
  if (error) throw error;
  return data;
};

// Real-time subscription helper
export const subscribeToUser = (userId: string, callback: (user: User) => void) => {
  const subscription = supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()
    .subscribe((payload) => {
      if (payload.new) {
        callback(payload.new as User);
      }
    });

  return () => {
    supabase.removeSubscription(subscription);
  };
}; 