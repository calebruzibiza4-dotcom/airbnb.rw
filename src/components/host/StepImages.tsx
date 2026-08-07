import { Cloud, ImagePlus, Play } from 'lucide-react';
import ImageUpload from './ImageUpload';
import type { HostFormData } from './types';

type StepImagesProps = {
  gallery: HostFormData['gallery'];
  promoVideoUrl: string;
  onGalleryChange: (gallery: HostFormData['gallery']) => void;
  onVideoChange: (url: string) => void;
  onNext: () => void;
  onBack: () => void;
  errors?: {
    gallery?: string;
  };
};

export default function StepImages({ gallery, promoVideoUrl, onGalleryChange, onVideoChange, onNext, onBack, errors }: StepImagesProps) {
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

        <div className="mt-8 space-y-6">
          <ImageUpload gallery={gallery} promoVideoUrl={promoVideoUrl} onGalleryChange={onGalleryChange} onVideoChange={onVideoChange} />
          {errors?.gallery ? <p className="text-sm font-medium text-rose-600">{errors.gallery}</p> : null}
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-3">
        <button type="button" onClick={onBack} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
          Back
        </button>
        <button type="button" onClick={onNext} className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,185,129,0.2)] transition hover:bg-emerald-700">
          Continue
        </button>
      </div>
    </div>
  );
}
