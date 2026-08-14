import { useEffect, useMemo, useRef, useState } from 'react';
import { Cloud, ImagePlus, Play, RefreshCcw, Trash2, Sparkles, ArrowUpDown } from 'lucide-react';
import type { ImageAsset } from './types';

type ImageUploadProps = {
  gallery: ImageAsset[];
  promoVideoUrl: string;
  onGalleryChange: (gallery: ImageAsset[]) => void;
  onVideoChange: (url: string) => void;
  onMessageChange?: (message: string) => void;
};

const MAX_IMAGES = 20;
const MIN_IMAGES = 5;
const MAX_IMAGE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const VIDEO_ACCEPT = 'video/mp4,video/webm,video/quicktime';

function createImageAsset(file: File): ImageAsset {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
    publicId: '',
    secureUrl: '',
    path: '',
    filename: file.name,
    status: 'uploading',
    progress: 0,
    isCover: false,
    previewUrl: URL.createObjectURL(file),
  };
}

export default function ImageUpload({ gallery, promoVideoUrl, onGalleryChange, onVideoChange, onMessageChange }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const fileMapRef = useRef<Map<string, File>>(new Map());

  useEffect(() => {
    return () => {
      gallery.forEach((asset) => {
        if (asset.previewUrl) {
          URL.revokeObjectURL(asset.previewUrl);
        }
      });
    };
  }, [gallery]);

  const currentCount = gallery.length;
  const remainingSlots = MAX_IMAGES - currentCount;

  const setMessage = (message: string) => {
    onMessageChange?.(message);
  };

  const updateGallery = (updated: ImageAsset[]) => {
    onGalleryChange(updated);
  };

  const handleFiles = (files: FileList | File[]) => {
    const inputFiles = Array.from(files).slice(0, remainingSlots);
    if (inputFiles.length === 0) {
      setMessage(`You can upload up to ${MAX_IMAGES} images.`);
      return;
    }

    const invalidFiles = inputFiles.filter((file) => !ACCEPTED_TYPES.includes(file.type) || file.size > MAX_IMAGE_SIZE);
    if (invalidFiles.length > 0) {
      setMessage('Only JPG, PNG and WEBP images under 10 MB are allowed.');
    }

    const validFiles = inputFiles.filter((file) => ACCEPTED_TYPES.includes(file.type) && file.size <= MAX_IMAGE_SIZE);
    if (!validFiles.length) {
      return;
    }

    const assets = validFiles.map((file) => createImageAsset(file));
    const nextGallery = [...gallery, ...assets];
    assets.forEach((asset, index) => fileMapRef.current.set(asset.id, validFiles[index]));
    updateGallery(nextGallery);
    assets.forEach((asset) => uploadImage(asset));
  };

  const uploadImage = (asset: ImageAsset) => {
    const file = fileMapRef.current.get(asset.id);
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    // Pass listingId for storage path organization
    formData.append('listingId', 'draft');

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload');

    xhr.upload.onprogress = (event) => {
      if (!event.lengthComputable) return;
      const progress = Math.round((event.loaded / event.total) * 100);
      updateGallery(gallery.map((item) => (item.id === asset.id ? { ...item, progress } : item)));
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const response = JSON.parse(xhr.responseText);
          updateGallery(
            gallery.map((item) =>
              item.id === asset.id
                ? {
                    ...item,
                    path: response.path || '',
                    secureUrl: response.url || '',
                    status: 'uploaded',
                    progress: 100,
                  }
                : item,
            ),
          );
          fileMapRef.current.delete(asset.id);
          setMessage(`Image ${asset.filename} uploaded successfully!`);
        } catch (error) {
          console.error('Failed to parse upload response:', error);
          updateGallery(gallery.map((item) => (item.id === asset.id ? { ...item, status: 'failed', error: 'Failed to process upload response' } : item)));
          setMessage('Upload succeeded but response parsing failed.');
        }
      } else {
        try {
          const errorData = JSON.parse(xhr.responseText);
          const errorMsg = errorData.error?.message || `Upload failed with status ${xhr.status}`;
          updateGallery(gallery.map((item) => (item.id === asset.id ? { ...item, status: 'failed', error: errorMsg } : item)));
          setMessage(errorMsg);
        } catch {
          const errorMsg = `Upload failed with status ${xhr.status}`;
          updateGallery(gallery.map((item) => (item.id === asset.id ? { ...item, status: 'failed', error: errorMsg } : item)));
          setMessage(errorMsg);
        }
      }
    };

    xhr.onerror = () => {
      console.error('Network error during upload');
      updateGallery(gallery.map((item) => (item.id === asset.id ? { ...item, status: 'failed', error: 'Network error' } : item)));
      setMessage('Network error during upload.');
    };

    xhr.ontimeout = () => {
      console.error('Upload timeout');
      updateGallery(gallery.map((item) => (item.id === asset.id ? { ...item, status: 'failed', error: 'Upload timeout' } : item)));
      setMessage('Upload took too long. Please try again.');
    };

    xhr.send(formData);
  };

  const handleVideoUpload = (files: FileList | File[]) => {
    // Video upload with Supabase is optional and can be implemented later
    setMessage('Video upload support coming soon. For now, please focus on uploading high-quality images.');
  };

  const removeImage = (id: string) => {
    updateGallery(gallery.filter((item) => item.id !== id));
    fileMapRef.current.delete(id);
  };

  const setCover = (id: string) => {
    updateGallery(gallery.map((item) => ({ ...item, isCover: item.id === id })));
  };

  const handleRetry = (asset: ImageAsset) => {
    const file = fileMapRef.current.get(asset.id);
    if (!file) {
      setMessage('Retry is unavailable for this image. Please remove and upload again.');
      return;
    }
    updateGallery(gallery.map((item) => (item.id === asset.id ? { ...item, status: 'uploading', progress: 0, error: undefined } : item)));
    uploadImage(asset);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragActive(false);
    handleFiles(event.dataTransfer.files);
  };

  const reorderGallery = (sourceId: string, targetId: string) => {
    const sourceIndex = gallery.findIndex((item) => item.id === sourceId);
    const targetIndex = gallery.findIndex((item) => item.id === targetId);
    if (sourceIndex === -1 || targetIndex === -1) return;
    const next = [...gallery];
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);
    updateGallery(next);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-white/70 bg-white/70 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <Cloud className="h-5 w-5 text-emerald-700" />
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-700">Step 6</p>
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Photos & media</h2>
          <p className="mt-3 text-slate-600">Upload a polished gallery and optional promo video to capture guest attention.</p>
        </div>

        <div
          className={`mt-8 rounded-[28px] border-2 ${dragActive ? 'border-emerald-400 bg-emerald-50/50' : 'border-slate-200 bg-slate-50'} p-8 text-center transition`}
          onDragOver={(event) => {
            event.preventDefault();
            setDragActive(true);
          }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
        >
          <p className="text-lg font-semibold text-slate-900">Drag and drop images here</p>
          <p className="mt-2 text-sm text-slate-600">JPG, PNG, WEBP · up to 10 MB each · 5–20 images</p>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            <ImagePlus className="h-4 w-4" />
            Upload images
          </button>
          <input ref={fileInputRef} type="file" accept="image/jpeg,image/png,image/webp" multiple className="hidden" onChange={(event) => handleFiles(event.target.files ?? [])} />
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {gallery.map((asset) => (
            <div
              key={asset.id}
              draggable
              onDragStart={(event) => event.dataTransfer.setData('text/plain', asset.id)}
              onDrop={(event) => {
                event.preventDefault();
                const sourceId = event.dataTransfer.getData('text/plain');
                reorderGallery(sourceId, asset.id);
              }}
              onDragOver={(event) => event.preventDefault()}
              className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-sm"
            >
              <img src={asset.previewUrl || asset.secureUrl} alt={asset.filename} className="h-52 w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent opacity-0 transition group-hover:opacity-100" />
              <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-slate-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]">{asset.status}</span>
                  <span className="rounded-full bg-slate-900/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]">{asset.progress}%</span>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
                  <button type="button" onClick={() => setCover(asset.id)} className={`rounded-full px-3 py-1 ${asset.isCover ? 'bg-emerald-500 text-white' : 'bg-white/90 text-slate-900'}`}>
                    {asset.isCover ? 'Cover photo' : 'Set cover'}
                  </button>
                  <button type="button" onClick={() => removeImage(asset.id)} className="rounded-full bg-white/90 px-3 py-1 text-slate-900">
                    <Trash2 className="inline-block h-3.5 w-3.5" /> Remove
                  </button>
                  {asset.status === 'failed' ? (
                    <button type="button" onClick={() => handleRetry(asset)} className="rounded-full bg-emerald-500 px-3 py-1 text-white">
                      <RefreshCcw className="inline-block h-3.5 w-3.5" /> Retry
                    </button>
                  ) : null}
                  <span className="rounded-full bg-white/90 px-3 py-1 text-slate-900">
                    <ArrowUpDown className="inline-block h-3.5 w-3.5" /> Drag to reorder
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-[28px] border border-slate-200 bg-slate-50 p-6">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">Promo video (optional)</p>
              <p className="mt-1 text-sm text-slate-600">Add one short promotional video to highlight your experience.</p>
            </div>
            <button type="button" onClick={() => videoInputRef.current?.click()} className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50">
              <Play className="h-4 w-4" /> Upload video
            </button>
          </div>
          <input ref={videoInputRef} type="file" accept={VIDEO_ACCEPT} className="hidden" onChange={(event) => handleVideoUpload(event.target.files ?? [])} />
          {promoVideoUrl ? (
            <div className="mt-4 rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
              <p className="font-semibold">Video ready</p>
              <p className="truncate">{promoVideoUrl}</p>
            </div>
          ) : null}
          <p className="mt-3 text-xs text-slate-500">Allowed formats: MP4, WEBM, MOV. Recommended under 50 MB.</p>
        </div>

        <div className="mt-4 text-sm text-slate-600">
          Minimum {MIN_IMAGES} images, maximum {MAX_IMAGES}. Current gallery count: {currentCount}.
        </div>
      </div>
    </div>
  );
}
