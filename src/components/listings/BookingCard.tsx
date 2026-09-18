'use client';

import { useState } from 'react';
import type { PublicListing } from './ListingCard';
import BookingFlow from './BookingFlow';

interface BookingCardProps {
  listing: PublicListing;
  selectedDate: string | null;
  selectedTime: string | null;
  guestCount: number;
  ticketType: string | null;
  ticketQuantity: number;
  compact?: boolean;
}

export default function BookingCard({
  listing,
  selectedDate,
  selectedTime,
  guestCount,
  ticketType,
  ticketQuantity,
  compact = false,
}: BookingCardProps) {
  const [flowOpen, setFlowOpen] = useState(false);

  const handleBook = () => setFlowOpen(true);

  const getButtonText = () => {
    switch (listing.listingType) {
      case 'experience':
        return 'Book experience';
      case 'event':
        return 'Get tickets';
      case 'service':
        return 'Book service';
      case 'stay':
        return 'Reserve';
      default:
        return 'Book now';
    }
  };

  const canBook = () => {
    switch (listing.listingType) {
      case 'experience':
        return selectedDate && selectedTime && guestCount > 0;
      case 'event':
        return ticketType && ticketQuantity > 0;
      case 'service':
        return selectedDate && selectedTime;
      case 'stay':
        return selectedDate && selectedTime; // Would need check-in/check-out
      default:
        return true;
    }
  };

  const pricePerUnit = () => {
    switch (listing.listingType) {
      case 'experience':
      case 'service':
        return `${listing.currency} ${listing.price.toLocaleString()} / person`;
      case 'event':
        return `From ${listing.currency} ${listing.price.toLocaleString()}`;
      case 'stay':
        return `${listing.currency} ${listing.price.toLocaleString()} / night`;
      default:
        return `${listing.currency} ${listing.price.toLocaleString()}`;
    }
  };

  const totalPrice = () => {
    if (listing.listingType === 'experience' || listing.listingType === 'service') {
      return (listing.price * guestCount).toLocaleString();
    }
    if (listing.listingType === 'event') {
      return (listing.price * ticketQuantity).toLocaleString();
    }
    return listing.price.toLocaleString();
  };

  if (compact) {
    return (
      <>
        <div className="flex items-center justify-between gap-4">
        <div>
          <p className="font-bold text-slate-950">{pricePerUnit()}</p>
          {(listing.listingType === 'experience' || listing.listingType === 'service') && guestCount > 0 && (
            <p className="text-sm text-slate-600">Total: {listing.currency} {totalPrice()}</p>
          )}
          {listing.listingType === 'event' && ticketQuantity > 0 && (
            <p className="text-sm text-slate-600">
              {ticketQuantity} ticket{ticketQuantity !== 1 ? 's' : ''} · {listing.currency} {totalPrice()}
            </p>
          )}
        </div>
        <button
          onClick={handleBook}
          disabled={!canBook()}
          className="rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
        >
          {getButtonText()}
        </button>
        </div>
        {flowOpen ? <BookingFlow listing={listing} selectedDate={selectedDate} selectedTime={selectedTime} guestCount={guestCount} ticketType={ticketType} ticketQuantity={ticketQuantity} onClose={() => setFlowOpen(false)} /> : null}
      </>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      {/* Price */}
      <div>
        <p className="text-3xl font-bold text-slate-950">{listing.currency} {listing.price.toLocaleString()}</p>
        <p className="mt-1 text-sm text-slate-600">{pricePerUnit().split(' / ')[1] || 'Total'}</p>
      </div>

      {/* Booking Details by Type */}
      <div className="mt-6 space-y-4 border-t border-slate-100 pt-6">
        {/* EXPERIENCE */}
        {listing.listingType === 'experience' && (
          <>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Date</p>
              <p className="mt-1 font-semibold text-slate-900">{selectedDate || 'Not selected'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Time</p>
              <p className="mt-1 font-semibold text-slate-900">{selectedTime || 'Not selected'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Guests</p>
              <p className="mt-1 font-semibold text-slate-900">{guestCount} person{guestCount !== 1 ? 's' : ''}</p>
            </div>
            {guestCount > 0 && (
              <div className="border-t border-slate-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal</span>
                  <span className="font-semibold text-slate-900">{listing.currency} {totalPrice()}</span>
                </div>
              </div>
            )}
          </>
        )}

        {/* EVENT */}
        {listing.listingType === 'event' && (
          <>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Event</p>
              <p className="mt-1 font-semibold text-slate-900">September 14, 2026</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Ticket type</p>
              <p className="mt-1 font-semibold text-slate-900">{ticketType || 'Not selected'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Quantity</p>
              <p className="mt-1 font-semibold text-slate-900">{ticketQuantity}</p>
            </div>
            {ticketQuantity > 0 && (
              <div className="border-t border-slate-100 pt-4">
                <div className="flex justify-between">
                  <span className="text-slate-600">Total</span>
                  <span className="font-semibold text-slate-900">{listing.currency} {totalPrice()}</span>
                </div>
              </div>
            )}
          </>
        )}

        {/* SERVICE */}
        {listing.listingType === 'service' && (
          <>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Date</p>
              <p className="mt-1 font-semibold text-slate-900">{selectedDate || 'Not selected'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Time</p>
              <p className="mt-1 font-semibold text-slate-900">{selectedTime || 'Not selected'}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase text-slate-500">Duration</p>
              <p className="mt-1 font-semibold text-slate-900">~45 minutes</p>
            </div>
          </>
        )}
      </div>

      {/* Book Button */}
      <button
        onClick={handleBook}
        disabled={!canBook()}
        className="mt-6 w-full rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {getButtonText()}
      </button>

      {/* Info Text */}
      <p className="mt-4 text-center text-xs text-slate-500">You will review availability before payment.</p>
      {flowOpen ? <BookingFlow listing={listing} selectedDate={selectedDate} selectedTime={selectedTime} guestCount={guestCount} ticketType={ticketType} ticketQuantity={ticketQuantity} onClose={() => setFlowOpen(false)} /> : null}
    </div>
  );
}
