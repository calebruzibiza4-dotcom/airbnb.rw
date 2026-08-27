'use client';

import { Heart, MapPin, Star } from 'lucide-react';
import type { PublicListing } from './ListingCard';

interface ListingHeaderProps {
  listing: PublicListing;
  isSaved: boolean;
  onSaveToggle: () => void;
}

export default function ListingHeader({ listing, isSaved, onSaveToggle }: ListingHeaderProps) {
  const typeLabel = listing.listingType?.charAt(0).toUpperCase() + (listing.listingType?.slice(1) || '');

  return (
    <div className="border-b border-slate-100 pb-8">
      {/* Type and Category */}
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
        {typeLabel}
      </p>

      {/* Title and Save */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-slate-950 sm:text-4xl">{listing.title}</h1>
        </div>
        <button
          onClick={onSaveToggle}
          className="flex-shrink-0 rounded-full p-2 hover:bg-slate-100"
          aria-label="Save listing"
        >
          <Heart className={`h-6 w-6 ${isSaved ? 'fill-red-500 text-red-500' : 'text-slate-400'}`} />
        </button>
      </div>

      {/* Rating */}
      {/* Placeholder - can be enhanced when reviews are added */}
      <div className="mt-3 flex items-center gap-2">
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 fill-slate-900 text-slate-900" />
          <span className="font-semibold text-slate-900">4.9</span>
        </div>
        <span className="text-slate-500">·</span>
        <span className="text-slate-600">48 reviews</span>
      </div>

      {/* Location */}
      <div className="mt-4 flex items-center gap-2 text-slate-600">
        <MapPin className="h-5 w-5 text-emerald-700" />
        <span className="font-medium">{listing.location}</span>
      </div>
    </div>
  );
}
