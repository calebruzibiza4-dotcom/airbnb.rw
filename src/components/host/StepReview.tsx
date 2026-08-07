import { Camera, MapPin, Sparkles, Ticket, Video } from 'lucide-react';
import type { HostFormData } from './types';

type StepReviewProps = {
  data: HostFormData;
  onPublish: () => void;
  onSaveDraft: () => void;
  onBack: () => void;
};

function formatAvailability(data: HostFormData) {
  if (data.listingType === 'experiences') {
    return `${data.operatingDays} · ${data.operatingHours} · ${data.availability.bookingCutoff || 'No cutoff'}`;
  }
  if (data.listingType === 'events') {
    return `${data.availability.eventDate} · ${data.availability.startTime} - ${data.availability.endTime} · ${data.availability.multiDay ? 'Multi-day' : 'Single day'}`;
  }
  return `${data.availability.weeklySchedule} · ${data.availability.startTime} - ${data.availability.endTime}`;
}

function formatPricing(data: HostFormData) {
  if (data.listingType === 'experiences') {
    return `${data.pricing.pricePerGuest || '0'} ${data.pricing.currency} per guest`;
  }
  if (data.listingType === 'events') {
    return `${data.pricing.standardTicketPrice || '0'} ${data.pricing.currency} standard ticket`;
  }
  return `${data.pricing.hourlyRate || '0'} ${data.pricing.currency} hourly`;
}

export default function StepReview({ data, onPublish, onSaveDraft, onBack }: StepReviewProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-white/70 bg-white/70 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-emerald-700" />
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-700">Step 9</p>
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Review & publish</h2>
          <p className="mt-3 text-slate-600">Confirm your listing details before publishing, or save it as a draft and continue later.</p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[1fr_260px]">
          <div className="space-y-4">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Listing details</p>
              <div className="mt-3 space-y-2 text-sm text-slate-700">
                <p><span className="font-semibold">Type:</span> {data.listingType}</p>
                <p><span className="font-semibold">Category:</span> {data.category}</p>
                <p><span className="font-semibold">Title:</span> {data.title}</p>
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Cover photo</p>
              <div className="mt-4 rounded-3xl overflow-hidden bg-slate-200">
                <img src={data.gallery.find((item) => item.isCover)?.secureUrl || data.gallery[0]?.secureUrl || ''} alt="Cover" className="h-56 w-full object-cover" />
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Gallery</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {data.gallery.slice(0, 4).map((image) => (
                  <img key={image.id} src={image.secureUrl} alt={image.filename} className="h-36 w-full rounded-3xl object-cover" />
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Location</p>
              <p className="mt-3 text-sm text-slate-700"><MapPin className="inline h-4 w-4 text-emerald-700" /> {data.address}, {data.sector}, {data.district}, {data.province}</p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Description</p>
              <p className="mt-3 text-sm text-slate-700">{data.description}</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Availability</p>
              <p className="mt-3 text-sm text-slate-700">{formatAvailability(data)}</p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Pricing</p>
              <p className="mt-3 text-sm text-slate-700">{formatPricing(data)}</p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Media summary</p>
              <p className="mt-3 text-sm text-slate-700 flex items-center gap-2"><Camera className="h-4 w-4 text-emerald-700" /> {data.gallery.length} images uploaded</p>
              <p className="mt-2 text-sm text-slate-700 flex items-center gap-2"><Video className="h-4 w-4 text-emerald-700" /> {data.promoVideoUrl ? 'Promo video uploaded' : 'No promo video'}</p>
            </div>

            <div className="rounded-[24px] border border-slate-200 bg-slate-50 p-5">
              <p className="text-sm font-semibold text-slate-900">Publishing status</p>
              <p className="mt-3 text-sm text-slate-700">Your listing will be published live after review and validation. Required fields must be complete to publish.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-3">
        <button type="button" onClick={onBack} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
          Back
        </button>
        <div className="flex gap-3">
          <button type="button" onClick={onSaveDraft} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
            Save as Draft
          </button>
          <button type="button" onClick={onPublish} className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,185,129,0.2)] transition hover:bg-emerald-700">
            Publish Listing
          </button>
        </div>
      </div>
    </div>
  );
}
