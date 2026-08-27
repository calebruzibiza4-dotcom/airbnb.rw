'use client';

import { useState } from 'react';
import type { PublicListing } from './ListingCard';

export default function ListingAbout({ listing }: { listing: PublicListing }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const maxChars = 300;
  const isLong = listing.description.length > maxChars;
  const displayText = isExpanded ? listing.description : listing.description.slice(0, maxChars);

  const getAboutTitle = () => {
    switch (listing.listingType) {
      case 'experience':
        return 'About this experience';
      case 'event':
        return 'About this event';
      case 'service':
        return 'About this service';
      case 'stay':
        return 'About this accommodation';
      default:
        return 'About this listing';
    }
  };

  return (
    <div className="border-b border-slate-100 pb-8">
      <h2 className="text-2xl font-bold text-slate-950">{getAboutTitle()}</h2>
      <div className="mt-4">
        <p className="whitespace-pre-wrap leading-7 text-slate-700">
          {displayText}
          {isLong && !isExpanded && '...'}
        </p>
        {isLong && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="mt-4 font-semibold text-emerald-700 hover:text-emerald-800"
          >
            {isExpanded ? 'Show less' : 'Show more'}
          </button>
        )}
      </div>
    </div>
  );
}
