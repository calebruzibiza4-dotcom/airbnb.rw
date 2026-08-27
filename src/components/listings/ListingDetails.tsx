'use client';

import { useEffect, useState } from 'react';
import type { PublicListing } from './ListingCard';
import ListingGallery from './ListingGallery';
import ListingHeader from './ListingHeader';
import ListingAbout from './ListingAbout';
import ListingAvailability from './ListingAvailability';
import ListingLocation from './ListingLocation';
import ListingHost from './ListingHost';
import SimilarListings from './SimilarListings';
import BookingCard from './BookingCard';

export default function ListingDetails({ id }: { id: string }) {
  const [listing, setListing] = useState<PublicListing | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [isSaved, setIsSaved] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [guestCount, setGuestCount] = useState(1);
  const [ticketType, setTicketType] = useState<string | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState(1);

  useEffect(() => {
    fetch(`/api/listings/${encodeURIComponent(id)}`)
      .then(async (response) => {
        if (!response.ok) throw new Error('Not found');
        return response.json();
      })
      .then((payload) => {
        setListing(payload.listing);
        setState('ready');
      })
      .catch(() => setState('error'));
  }, [id]);

  if (state === 'loading') {
    return (
      <div className="min-h-screen bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="aspect-video rounded-2xl bg-slate-200" />
            <div className="space-y-4">
              <div className="h-4 w-32 rounded bg-slate-200" />
              <div className="h-8 w-3/4 rounded bg-slate-200" />
              <div className="h-4 w-1/2 rounded bg-slate-200" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (state === 'error' || !listing) {
    return (
      <main className="min-h-screen bg-white px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900">Listing not found</h1>
        <p className="mt-2 text-slate-600">This listing may have been removed or is no longer available.</p>
        <a href="/" className="mt-6 inline-block font-semibold text-emerald-700 hover:text-emerald-800">
          ← Back to discover
        </a>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white pb-24 lg:pb-0">
      {/* Back Navigation */}
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <a href="/" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">
          ← Back to {listing.listingType}s
        </a>
      </div>

      {/* Gallery */}
      <ListingGallery listing={listing} />

      {/* Main Content Grid */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left Content */}
          <div className="lg:col-span-2 space-y-12">
            <ListingHeader listing={listing} isSaved={isSaved} onSaveToggle={() => setIsSaved(!isSaved)} />
            <ListingAbout listing={listing} />
            <ListingAvailability
              listing={listing}
              selectedDate={selectedDate}
              onDateChange={setSelectedDate}
              selectedTime={selectedTime}
              onTimeChange={setSelectedTime}
              guestCount={guestCount}
              onGuestChange={setGuestCount}
              ticketType={ticketType}
              onTicketTypeChange={setTicketType}
              ticketQuantity={ticketQuantity}
              onTicketQuantityChange={setTicketQuantity}
            />
            <ListingLocation listing={listing} />
            <ListingHost listing={listing} />
          </div>

          {/* Right Sidebar - Booking Card */}
          <div className="hidden lg:block">
            <div className="sticky top-24">
              <BookingCard
                listing={listing}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                guestCount={guestCount}
                ticketType={ticketType}
                ticketQuantity={ticketQuantity}
              />
            </div>
          </div>
        </div>

        {/* Mobile Booking Card */}
        <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white px-4 py-3 lg:hidden">
          <BookingCard
            listing={listing}
            selectedDate={selectedDate}
            selectedTime={selectedTime}
            guestCount={guestCount}
            ticketType={ticketType}
            ticketQuantity={ticketQuantity}
            compact
          />
        </div>
      </div>

      {/* Similar Listings */}
      <SimilarListings listing={listing} />
    </div>
  );
}
