import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Generate a unique filename for storage
 * Prevents overwriting files and keeps the original filename as reference
 */
export function generateStorageFilename(originalFilename: string, listingId: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 9);
  const ext = originalFilename.split('.').pop() || '';
  return `listings/${listingId}/${timestamp}-${random}.${ext}`;
}

/**
 * Upload a file to Supabase Storage
 */
export async function uploadImageToSupabase(
  file: File,
  storagePath: string,
  bucketName: string = 'listing-images',
): Promise<{ path: string; url: string }> {
  if (!file) {
    throw new Error('No file provided');
  }

  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  if (!allowedTypes.includes(file.type.toLowerCase()) && (!fileExtension || !allowedExtensions.includes(fileExtension))) {
    throw new Error('Unsupported image format. Please upload JPG, PNG, or WEBP.');
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Image must be smaller than 10 MB.');
  }

  const { data, error } = await supabase.storage.from(bucketName).upload(storagePath, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) {
    console.error('Supabase upload error:', error);
    throw new Error(error.message || 'Upload failed');
  }

  // Get the public URL
  const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(data.path);

  return {
    path: data.path,
    url: urlData.publicUrl,
  };
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteImageFromSupabase(
  storagePath: string,
  bucketName: string = 'listing-images',
): Promise<void> {
  const { error } = await supabase.storage.from(bucketName).remove([storagePath]);

  if (error) {
    console.error('Supabase delete error:', error);
    throw new Error(error.message || 'Delete failed');
  }
}
