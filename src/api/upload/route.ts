import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

/**
 * Supabase Storage Upload Handler
 *
 * This handler:
 * 1. Validates the uploaded file (type, size)
 * 2. Generates a unique storage path
 * 3. Uploads to Supabase Storage
 * 4. Returns the public URL and storage path
 *
 * Environment requirements:
 * - SUPABASE_SERVICE_ROLE_KEY (for server-side uploads)
 * - Or use VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY from browser
 */
export async function POST(request: Request): Promise<Response> {
  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return Response.json(
      {
        error: {
          message: 'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.',
        },
      },
      { status: 500 },
    );
  }

  const formData = await request.formData();
  const file = formData.get('file');
  const listingId = String(formData.get('listingId') || 'draft');

  if (!(file instanceof File)) {
    return Response.json({ error: { message: 'No file was provided.' } }, { status: 400 });
  }

  // Validate file type
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  if (!allowedTypes.includes(file.type)) {
    return Response.json(
      {
        error: { message: 'Unsupported image format. Please upload JPG, PNG, or WEBP.' },
      },
      { status: 400 },
    );
  }

  // Validate file size (10 MB)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    return Response.json(
      {
        error: { message: 'Image must be smaller than 10 MB.' },
      },
      { status: 400 },
    );
  }

  try {
    // Initialize Supabase client
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });

    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 9);
    const ext = file.name.split('.').pop() || 'jpg';
    const filename = `${timestamp}-${random}.${ext}`;
    const storagePath = `listings/${listingId}/${filename}`;

    // Convert File to Buffer for Node.js
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { data, error } = await supabase.storage.from('listing-images').upload(storagePath, buffer, {
      contentType: file.type,
      cacheControl: '3600',
      upsert: false,
    });

    if (error) {
      console.error('Supabase upload error:', error);
      return Response.json(
        {
          error: {
            message: error.message || 'Upload to Supabase Storage failed.',
          },
        },
        { status: 500 },
      );
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage.from('listing-images').getPublicUrl(data.path);

    return Response.json(
      {
        path: data.path,
        url: publicUrlData.publicUrl,
        filename: file.name,
      },
      { status: 200 },
    );
  } catch (err) {
    console.error('Upload error:', err);
    const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred during upload.';
    return Response.json(
      {
        error: { message: errorMessage },
      },
      { status: 500 },
    );
  }
}
