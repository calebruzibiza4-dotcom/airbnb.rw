'use client';

import { useEffect, useState } from 'react';
import type { PublicListing } from './ListingCard';
import ListingCard from './ListingCard';

export default function SimilarListings({ listing }: { listing: PublicListing }) {
  const [similar, setSimilar] = useState<PublicListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        const response = await fetch(`/api/listings?type=${listing.listingType}&limit=8`);
        if (response.ok) {
          const data = await response.json();
          setSimilar(data.listings?.filter((l: PublicListing) => l.id !== listing.id).slice(0, 4) || []);
        }
      } catch (error) {
        console.error('Failed to fetch similar listings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSimilar();
  }, [listing.id, listing.listingType]);

  if (isLoading) return null;
  if (similar.length === 0) return null;

  const getSectionTitle = () => {
    switch (listing.listingType) {
      case 'experience':
        return 'More experiences to explore';
      case 'event':
        return 'More upcoming events';
      case 'service':
        return 'More services available';
      case 'stay':
        return 'Similar accommodations';
      default:
        return 'You might also like';
    }
  };

  return (
    <div className="border-t border-slate-100 bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="text-3xl font-bold text-slate-950">{getSectionTitle()}</h2>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {similar.map((item) => (
            <ListingCard key={item.id} listing={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
