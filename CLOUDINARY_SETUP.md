# Cloudinary Setup Guide

The project is configured to upload images and videos to Cloudinary. Follow these steps to get it working:

## 1. Get Your Cloudinary Cloud Name

Your Cloudinary Cloud Name is already in `.env`:
```
VITE_CLOUDINARY_CLOUD_NAME="uq4suh2z"
```

This is correct and ready to use.

## 2. Create an Unsigned Upload Preset

**Important:** The upload presets in `.env` (`ml_default`) need to be properly configured in Cloudinary for unsigned uploads.

### Steps:

1. Go to [Cloudinary Dashboard](https://cloudinary.com/console)
2. Navigate to **Settings** → **Upload**
3. Scroll to **Upload presets** section
4. Click **Add upload preset**
5. Configure:
   - **Name:** `ml_default` (or your preferred name)
   - **Unsigned:** Toggle **ON** (this is critical for unsigned uploads)
   - **Folder:** `inzu-listings` (for images) or `inzu-videos` (for videos)
   - **Resource type:** Auto (or Image/Video)
6. Click **Save**

### Alternative: Use Environment Variable Names

If you want different preset names, update:

**.env file:**
```
VITE_CLOUDINARY_UPLOAD_PRESET="your-image-preset"
VITE_CLOUDINARY_VIDEO_UPLOAD_PRESET="your-video-preset"
```

Then create those presets in Cloudinary with the same names.

## 3. Verify Upload Preset Settings

Your upload preset **must** have:
- ✅ **Unsigned** enabled
- ✅ Proper **folder** assignment
- ✅ Correct **resource type**

## 4. Test the Upload

1. Build the project: `npm run build`
2. Run dev server: `npm run dev`
3. Open **Become a Host** wizard
4. Try uploading an image at **Step 6: Photos & Media**
5. Check browser console for any error messages
6. Visit [Cloudinary Media Library](https://cloudinary.com/console/media_library) to verify uploaded files

## 5. Troubleshooting

### Upload fails with authentication error
- **Cause:** Preset is not set to **Unsigned**
- **Fix:** Go to Cloudinary Settings → Upload presets → Edit your preset → Toggle Unsigned ON

### Upload fails with 400 error
- **Cause:** Invalid upload preset name
- **Fix:** Verify preset name matches `VITE_CLOUDINARY_UPLOAD_PRESET` in `.env`

### Upload fails with CORS error
- **Cause:** CORS not allowed from your domain
- **Fix:** Go to Cloudinary Settings → Security → Allowed origins → Add your domain (e.g., `localhost:5173`)

### Images not showing in media library
- **Cause:** Folder name mismatch
- **Fix:** Check Cloudinary settings for `inzu-listings` and `inzu-videos` folders

## 6. Environment Variables Reference

```env
# Cloudinary Cloud Name (required)
VITE_CLOUDINARY_CLOUD_NAME="uq4suh2z"

# Image upload preset (must be unsigned)
VITE_CLOUDINARY_UPLOAD_PRESET="ml_default"

# Video upload preset (must be unsigned)
VITE_CLOUDINARY_VIDEO_UPLOAD_PRESET="ml_default"
```

## 7. Upload Limits

The ImageUpload component enforces:
- **Images:** 5–20 per listing, max 10 MB each, JPG/PNG/WEBP
- **Videos:** 1 per listing, max 50 MB, MP4/WEBM/MOV

## 8. API Endpoints

Uploads go to:
- **Images:** `https://api.cloudinary.com/v1_1/{cloudName}/image/upload`
- **Videos:** `https://api.cloudinary.com/v1_1/{cloudName}/video/upload`

Both use the `upload_preset` parameter for unsigned uploads.

---

For more info, see [Cloudinary Unsigned Upload Docs](https://cloudinary.com/documentation/upload_widget#unsigned_uploads).
