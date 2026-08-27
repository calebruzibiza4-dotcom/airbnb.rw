'use client';

import { CheckCircle } from 'lucide-react';
import type { PublicListing } from './ListingCard';

export default function ListingHost({ listing }: { listing: PublicListing }) {
  const getHostLabel = () => {
    switch (listing.listingType) {
      case 'experience':
        return 'Hosted by';
      case 'event':
        return 'Organized by';
      case 'service':
        return 'Provided by';
      default:
        return 'Listed by';
    }
  };

  return (
    <div className="border-b border-slate-100 pb-8">
      <h2 className="text-2xl font-bold text-slate-950">{getHostLabel()}</h2>

      <div className="mt-6 flex items-center gap-4">
        <div className="h-16 w-16 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center">
          <span className="text-2xl font-bold text-white">R</span>
        </div>

        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-slate-900">Rwanda Host</p>
            <CheckCircle className="h-5 w-5 text-emerald-600" />
          </div>
          <p className="mt-1 text-sm text-slate-600">Verified host · 4 years on Inzu</p>
        </div>
      </div>

      <p className="mt-6 text-slate-600">
        This is a verified host who has been providing quality {listing.listingType}s for several years. Contact them to learn more or
        ask any questions about your upcoming {listing.listingType}.
      </p>

      <button className="mt-6 rounded-lg border border-slate-300 px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-50">
        Contact host
      </button>
    </div>
  );
}
