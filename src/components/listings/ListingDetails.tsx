import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import type { PublicListing } from './ListingCard';

export default function ListingDetails({ id }: { id: string }) {
  const [listing, setListing] = useState<PublicListing | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    fetch(`/api/listings/${encodeURIComponent(id)}`)
      .then(async (response) => { if (!response.ok) throw new Error('Not found'); return response.json(); })
      .then((payload) => { setListing(payload.listing); setState('ready'); })
      .catch(() => setState('error'));
  }, [id]);

  if (state === 'loading') return <main className="mx-auto max-w-6xl px-4 py-16 text-center text-slate-500">Loading listing...</main>;
  if (state === 'error' || !listing) return <main className="mx-auto max-w-6xl px-4 py-16 text-center"><h1 className="text-2xl font-bold text-slate-900">Listing not found</h1><a href="/" className="mt-4 inline-block font-semibold text-emerald-800">Return home</a></main>;
  const gallery = listing.images.length ? listing.images : listing.coverImage ? [listing.coverImage] : [];
  return <main className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8"><a href="/" className="text-sm font-semibold text-emerald-800">Back to discover</a><div className="mt-5 grid gap-3 sm:grid-cols-2">{gallery.slice(0, 5).map((image) => <img key={image.path} src={image.url} alt={listing.title} className="h-72 w-full rounded-2xl object-cover first:sm:col-span-2 first:sm:h-[28rem]" />)}</div><div className="mt-8 max-w-3xl"><p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">{listing.listingType} · {listing.category}</p><h1 className="mt-2 text-4xl font-bold text-slate-950">{listing.title}</h1><p className="mt-3 flex items-center gap-2 text-slate-600"><MapPin className="h-4 w-4 text-emerald-700" />{listing.location} · {listing.address}</p><p className="mt-6 whitespace-pre-wrap leading-7 text-slate-700">{listing.description}</p><p className="mt-6 text-xl font-bold text-slate-900">{listing.price ? `${listing.currency} ${listing.price.toLocaleString()}` : 'Contact host'}</p></div></main>;
}
