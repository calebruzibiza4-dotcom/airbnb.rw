import { useEffect, useState } from 'react';
import ListingCard, { type PublicListing } from './ListingCard';

type ListingGridProps = { category?: string };

export default function ListingGrid({ category = 'everything' }: ListingGridProps) {
  const [listings, setListings] = useState<PublicListing[]>([]);
  const [status, setStatus] = useState<'loading' | 'ready' | 'empty' | 'error'>('loading');

  useEffect(() => {
    const controller = new AbortController();
    setStatus('loading');
    fetch(`/api/listings?type=${encodeURIComponent(category)}&limit=20`, { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error('Listing request failed');
        return response.json();
      })
      .then((payload) => {
        const nextListings = Array.isArray(payload?.listings) ? payload.listings : [];
        setListings(nextListings);
        setStatus(nextListings.length ? 'ready' : 'empty');
      })
      .catch((error) => {
        if (error.name !== 'AbortError') setStatus('error');
      });
    return () => controller.abort();
  }, [category]);

  if (status === 'loading') return <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">{[1, 2, 3, 4].map((item) => <div key={item} className="animate-pulse"><div className="aspect-[4/3] rounded-2xl bg-slate-200" /><div className="mt-3 h-4 w-2/3 rounded bg-slate-200" /><div className="mt-2 h-4 w-1/2 rounded bg-slate-200" /></div>)}</div>;
  if (status === 'error') return <div className="rounded-2xl border border-rose-200 bg-rose-50 px-5 py-8 text-center text-sm font-medium text-rose-700">Listings are temporarily unavailable. Please refresh and try again.</div>;
  if (status === 'empty') return <div className="rounded-2xl border border-slate-200 bg-white px-5 py-12 text-center"><h2 className="text-xl font-bold text-slate-900">No listings available yet</h2><p className="mt-2 text-sm text-slate-500">Be the first host to share something amazing.</p></div>;
  return <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">{listings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}</div>;
}
