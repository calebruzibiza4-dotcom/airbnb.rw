import { Heart, MapPin } from 'lucide-react';

export type PublicListing = {
  id: string;
  title: string;
  description: string;
  listingType: string;
  category: string;
  location: string;
  address: string;
  images: Array<{ url: string; path: string; isCover: boolean }>;
  coverImage?: { url: string; path: string; isCover: boolean };
  price: number;
  currency: string;
};

type ListingCardProps = { listing: PublicListing };

export default function ListingCard({ listing }: ListingCardProps) {
  const image = listing.coverImage?.url || listing.images.find((item) => item.isCover)?.url || listing.images[0]?.url;
  return (
    <a href={`/listings/${listing.id}`} className="group block focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-200">
        {image ? <img src={image} alt={listing.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="grid h-full place-items-center text-sm text-slate-500">No image</div>}
        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-900">{listing.listingType}</span>
        <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-slate-700"><Heart className="h-4 w-4" /></span>
      </div>
      <div className="pt-3">
        <p className="flex items-center gap-1 text-xs font-semibold text-slate-500"><MapPin className="h-3.5 w-3.5 text-emerald-700" />{listing.location}</p>
        <h3 className="mt-1 truncate text-base font-bold text-slate-900">{listing.title}</h3>
        <p className="mt-1 text-sm text-slate-500">{listing.category}</p>
        <p className="mt-2 text-sm font-bold text-slate-900">{listing.price ? `${listing.currency} ${listing.price.toLocaleString()}` : 'Contact host'} <span className="font-normal text-slate-500">/ person</span></p>
      </div>
    </a>
  );
}
