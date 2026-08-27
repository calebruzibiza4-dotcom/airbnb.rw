'use client';

import { MapPin } from 'lucide-react';
import type { PublicListing } from './ListingCard';

export default function ListingLocation({ listing }: { listing: PublicListing }) {
  return (
    <div className="border-b border-slate-100 pb-8">
      <h2 className="text-2xl font-bold text-slate-950">Where you'll be</h2>

      <div className="mt-6 rounded-lg border border-slate-200 p-6">
        <div className="flex items-start gap-4">
          <MapPin className="h-6 w-6 flex-shrink-0 text-emerald-700" />
          <div>
            <p className="font-semibold text-slate-900">{listing.address}</p>
            <p className="mt-1 text-slate-600">
              {listing.sector}, {listing.district}, {listing.province}
            </p>
          </div>
        </div>
      </div>

      {/* Map Placeholder */}
      {listing.latitude && listing.longitude && (
        <div className="mt-6 h-64 rounded-lg border border-slate-200 bg-slate-100 flex items-center justify-center">
          <p className="text-slate-500">Map view coming soon</p>
        </div>
      )}
    </div>
  );
}
