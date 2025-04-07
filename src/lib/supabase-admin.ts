import { createClient } from '@supabase/supabase-js';

if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
  throw new Error('Missing env.NEXT_PUBLIC_SUPABASE_URL');
}
if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error('Missing env.SUPABASE_SERVICE_ROLE_KEY');
}

// Create a Supabase client with the service role key for admin operations
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export interface UserProgress {
  id: string;
  user_id: string;
  tutorial_id: string;
  completed: boolean;
  created_at: string;
  updated_at: string;
}

export async function updateUserProgress(
  userId: string,
  tutorialId: string,
  completed: boolean
): Promise<UserProgress | null> {
  const { data, error } = await supabaseAdmin
    .from('user_progress')
    .upsert(
      {
        user_id: userId,
        tutorial_id: tutorialId,
        completed,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: 'user_id,tutorial_id',
      }
    )
    .select()
    .single();

  if (error) {
    console.error('Error updating user progress:', error);
    return null;
  }

  return data;
}

export async function getUserProgress(
  userId: string,
  tutorialId?: string
): Promise<UserProgress[]> {
  let query = supabaseAdmin
    .from('user_progress')
    .select('*')
    .eq('user_id', userId);

  if (tutorialId) {
    query = query.eq('tutorial_id', tutorialId);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching user progress:', error);
    return [];
  }

  return data || [];
} 