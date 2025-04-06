import { supabase } from '@/lib/supabase';

/**
 * Uploads a file to Supabase Storage for a specific tutorial resource
 * 
 * @param file - The file to upload
 * @param tutorialId - The ID of the tutorial
 * @param userId - The ID of the user uploading the file
 * @returns The public URL of the uploaded file
 */
export async function uploadTutorialResource(
  file: File,
  tutorialId: string,
  userId: string
) {
  const fileExt = file.name.split('.').pop();
  const fileName = `${tutorialId}/${userId}-${Date.now()}.${fileExt}`;
  const filePath = `tutorial-resources/${fileName}`;

  const { data, error } = await supabase.storage
    .from('resources')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (error) {
    throw new Error(`Error uploading file: ${error.message}`);
  }

  const { data: publicUrlData } = supabase.storage
    .from('resources')
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

/**
 * Downloads a public file from Supabase Storage
 * 
 * @param filePath - The path of the file to download
 * @returns The downloaded file
 */
export async function downloadTutorialResource(filePath: string) {
  const { data, error } = await supabase.storage
    .from('resources')
    .download(filePath);

  if (error) {
    throw new Error(`Error downloading file: ${error.message}`);
  }

  return data;
}

/**
 * Lists all files in a specific tutorial folder
 * 
 * @param tutorialId - The ID of the tutorial
 * @returns List of files
 */
export async function listTutorialResources(tutorialId: string) {
  const { data, error } = await supabase.storage
    .from('resources')
    .list(`tutorial-resources/${tutorialId}`);

  if (error) {
    throw new Error(`Error listing files: ${error.message}`);
  }

  return data;
}

/**
 * Deletes a file from Supabase Storage
 * 
 * @param filePath - The path of the file to delete
 */
export async function deleteTutorialResource(filePath: string) {
  const { error } = await supabase.storage
    .from('resources')
    .remove([filePath]);

  if (error) {
    throw new Error(`Error deleting file: ${error.message}`);
  }
} 