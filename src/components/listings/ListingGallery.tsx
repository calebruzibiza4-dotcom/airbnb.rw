'use client';

import { useState } from 'react';
import { Heart, Share2 } from 'lucide-react';
import type { PublicListing } from './ListingCard';
import ImageGalleryModal from './modals/ImageGalleryModal';
import ShareModal from './modals/ShareModal';

export default function ListingGallery({ listing }: { listing: PublicListing }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const gallery = listing.images.length ? listing.images : listing.coverImage ? [listing.coverImage] : [];
  const primaryImage = gallery[0];
  const secondaryImages = gallery.slice(1, 5);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative">
          {/* Desktop Grid */}
          <div className="hidden gap-2 sm:grid sm:grid-cols-4 sm:gap-2">
            {/* Primary Image */}
            <div
              className="relative col-span-2 row-span-2 cursor-pointer overflow-hidden rounded-2xl bg-slate-200"
              onClick={() => setIsGalleryOpen(true)}
            >
              {primaryImage ? (
                <img src={primaryImage.url} alt={listing.title} className="h-[400px] w-full object-cover transition hover:scale-105" />
              ) : (
                <div className="h-[400px] w-full bg-slate-300" />
              )}
            </div>

            {/* Secondary Images */}
            {secondaryImages.map((image, i) => (
              <div
                key={i}
                className="relative cursor-pointer overflow-hidden rounded-xl bg-slate-200"
                onClick={() => setIsGalleryOpen(true)}
              >
                <img src={image.url} alt={listing.title} className="h-[190px] w-full object-cover transition hover:scale-105" />
                {i === secondaryImages.length - 1 && gallery.length > 5 && (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900/60">
                    <span className="text-lg font-bold text-white">+{gallery.length - 5}</span>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile - Carousel-like */}
          <div className="sm:hidden relative overflow-hidden rounded-2xl bg-slate-200" onClick={() => setIsGalleryOpen(true)}>
            {primaryImage ? (
              <img src={primaryImage.url} alt={listing.title} className="h-72 w-full object-cover" />
            ) : (
              <div className="h-72 w-full bg-slate-300" />
            )}
            {gallery.length > 1 && (
              <div className="absolute bottom-3 right-3 rounded-full bg-slate-900/70 px-3 py-1 text-xs font-semibold text-white">
                1 / {gallery.length}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="absolute top-4 right-4 flex gap-3">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className="rounded-full bg-white p-3 shadow-md transition hover:shadow-lg"
              aria-label="Save listing"
            >
              <Heart className={`h-5 w-5 ${isSaved ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
            </button>
            <button
              onClick={() => setIsShareOpen(true)}
              className="rounded-full bg-white p-3 shadow-md transition hover:shadow-lg"
              aria-label="Share listing"
            >
              <Share2 className="h-5 w-5 text-slate-600" />
            </button>
          </div>

          {/* Desktop "Show All Photos" Button */}
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="hidden absolute bottom-4 right-4 sm:block rounded-lg bg-white px-4 py-2 font-semibold text-slate-900 shadow-md transition hover:shadow-lg"
          >
            Show all photos
          </button>
        </div>
      </div>

      {/* Modals */}
      {isGalleryOpen && <ImageGalleryModal gallery={gallery} title={listing.title} onClose={() => setIsGalleryOpen(false)} />}
      {isShareOpen && <ShareModal listing={listing} onClose={() => setIsShareOpen(false)} />}
    </>
  );
}
