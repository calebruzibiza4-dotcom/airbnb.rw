import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

async function fetchWithRetry(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      return await fetch(input, init);
    } catch (error) {
      lastError = error;
      if (attempt < 2) {
        await new Promise((resolve) => setTimeout(resolve, 300 * 2 ** attempt));
      }
    }
  }

  throw lastError instanceof Error ? lastError : new Error('Unable to connect to Supabase Storage.');
}

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
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const supabaseKey = supabaseServiceRoleKey || process.env.VITE_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return Response.json(
      {
        error: {
          message: 'Supabase is not configured. Add VITE_SUPABASE_URL and either SUPABASE_SERVICE_ROLE_KEY or VITE_SUPABASE_ANON_KEY to your .env file.',
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

  // Validate both MIME type and extension because browsers may report JPEG MIME types differently.
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  const allowedExtensions = ['jpg', 'jpeg', 'png', 'webp'];
  const fileExtension = file.name.split('.').pop()?.toLowerCase();
  if (!allowedTypes.includes(file.type.toLowerCase()) && (!fileExtension || !allowedExtensions.includes(fileExtension))) {
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
      global: {
        fetch: fetchWithRetry,
      },
    });

    // Generate unique filename
    const timestamp = Date.now();
    const random = Math.random().toString(36).slice(2, 9);
    const ext = fileExtension || (file.type.toLowerCase() === 'image/png' ? 'png' : file.type.toLowerCase() === 'image/webp' ? 'webp' : 'jpg');
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

      let message = error.message || 'Upload to Supabase Storage failed.';
      const storageError = error as typeof error & { code?: string; status?: number };

      if (storageError.code === 'NoSuchBucket') {
        message = 'Supabase bucket "listing-images" was not found. Create the bucket in Supabase Storage and make it public.';
      }

      if (storageError.code === 'AccessDenied' || storageError.status === 403) {
        message = 'Supabase Storage blocked this upload because of the bucket row-level security policy. Add SUPABASE_SERVICE_ROLE_KEY on the server or allow authenticated/public writes for the listing-images bucket.';
      }

      return Response.json(
        {
          error: {
            message,
          },
        },
        { status: storageError.status || 500 },
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
    const isNetworkError = err instanceof TypeError || (err instanceof Error && /fetch failed|ECONNRESET|network/i.test(err.message));
    const errorMessage = isNetworkError
      ? 'Supabase Storage could not be reached. Please retry the upload in a moment.'
      : err instanceof Error
        ? err.message
        : 'An unexpected error occurred during upload.';
    return Response.json(
      {
        error: { message: errorMessage },
      },
      { status: isNetworkError ? 503 : 500 },
    );
  }
}
