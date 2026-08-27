'use client';

import { useState } from 'react';
import { Calendar, Clock, Users } from 'lucide-react';
import type { PublicListing } from './ListingCard';
import DateSelectorModal from './modals/DateSelectorModal';
import TimeSelectorModal from './modals/TimeSelectorModal';
import GuestSelectorModal from './modals/GuestSelectorModal';
import TicketSelectorModal from './modals/TicketSelectorModal';

interface ListingAvailabilityProps {
  listing: PublicListing;
  selectedDate: string | null;
  onDateChange: (date: string | null) => void;
  selectedTime: string | null;
  onTimeChange: (time: string | null) => void;
  guestCount: number;
  onGuestChange: (count: number) => void;
  ticketType: string | null;
  onTicketTypeChange: (type: string | null) => void;
  ticketQuantity: number;
  onTicketQuantityChange: (qty: number) => void;
}

export default function ListingAvailability({
  listing,
  selectedDate,
  onDateChange,
  selectedTime,
  onTimeChange,
  guestCount,
  onGuestChange,
  ticketType,
  onTicketTypeChange,
  ticketQuantity,
  onTicketQuantityChange,
}: ListingAvailabilityProps) {
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [isTimeModalOpen, setIsTimeModalOpen] = useState(false);
  const [isGuestModalOpen, setIsGuestModalOpen] = useState(false);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);

  const getAvailabilityTitle = () => {
    switch (listing.listingType) {
      case 'experience':
        return 'Availability';
      case 'event':
        return 'Event details';
      case 'service':
        return 'How to book';
      case 'stay':
        return 'Availability';
      default:
        return 'Availability';
    }
  };

  // EXPERIENCE AVAILABILITY
  if (listing.listingType === 'experience') {
    return (
      <>
        <div className="border-b border-slate-100 pb-8">
          <h2 className="text-2xl font-bold text-slate-950">{getAvailabilityTitle()}</h2>

          <div className="mt-6 space-y-4">
            {/* Date Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-900">Choose a date</label>
              <button
                onClick={() => setIsDateModalOpen(true)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-left hover:border-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-slate-400" />
                  <span className={selectedDate ? 'font-medium text-slate-900' : 'text-slate-500'}>
                    {selectedDate || 'Select date'}
                  </span>
                </div>
              </button>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div>
                <label className="block text-sm font-semibold text-slate-900">Choose a time</label>
                <button
                  onClick={() => setIsTimeModalOpen(true)}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-left hover:border-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-slate-400" />
                    <span className={selectedTime ? 'font-medium text-slate-900' : 'text-slate-500'}>
                      {selectedTime || 'Select time'}
                    </span>
                  </div>
                </button>
              </div>
            )}

            {/* Guest Count */}
            {selectedDate && selectedTime && (
              <div>
                <label className="block text-sm font-semibold text-slate-900">Number of guests</label>
                <button
                  onClick={() => setIsGuestModalOpen(true)}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-left hover:border-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
                >
                  <div className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-slate-400" />
                    <span className="font-medium text-slate-900">{guestCount} guest{guestCount !== 1 ? 's' : ''}</span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        <DateSelectorModal isOpen={isDateModalOpen} onClose={() => setIsDateModalOpen(false)} selectedDate={selectedDate} onSelect={onDateChange} />
        <TimeSelectorModal isOpen={isTimeModalOpen} onClose={() => setIsTimeModalOpen(false)} selectedTime={selectedTime} onSelect={onTimeChange} />
        <GuestSelectorModal isOpen={isGuestModalOpen} onClose={() => setIsGuestModalOpen(false)} guestCount={guestCount} onSelect={onGuestChange} maxGuests={listing.maxGuests || 10} />
      </>
    );
  }

  // EVENT AVAILABILITY
  if (listing.listingType === 'event') {
    return (
      <>
        <div className="border-b border-slate-100 pb-8">
          <h2 className="text-2xl font-bold text-slate-950">{getAvailabilityTitle()}</h2>

          <div className="mt-6 space-y-6">
            {/* Event Date & Time */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-emerald-700" />
                <div>
                  <p className="font-semibold text-slate-900">September 14, 2026</p>
                  <p className="text-sm text-slate-600">6:00 PM – 11:00 PM</p>
                </div>
              </div>
            </div>

            {/* Venue */}
            <div>
              <p className="font-semibold text-slate-900">Venue</p>
              <p className="mt-1 text-slate-600">Kigali Arena, Kigali</p>
            </div>

            {/* Ticket Types */}
            <div>
              <label className="block text-sm font-semibold text-slate-900">Ticket type</label>
              <button
                onClick={() => setIsTicketModalOpen(true)}
                className="mt-3 w-full rounded-lg border border-slate-300 px-4 py-3 text-left hover:border-slate-400"
              >
                <span className={ticketType ? 'font-medium text-slate-900' : 'text-slate-500'}>
                  {ticketType ? `${ticketType} - RWF 10,000` : 'Select ticket type'}
                </span>
              </button>
            </div>

            {/* Quantity */}
            {ticketType && (
              <div>
                <label className="block text-sm font-semibold text-slate-900">Quantity</label>
                <div className="mt-3 flex items-center gap-4">
                  <button
                    onClick={() => onTicketQuantityChange(Math.max(1, ticketQuantity - 1))}
                    className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100"
                  >
                    −
                  </button>
                  <span className="font-semibold text-slate-900">{ticketQuantity}</span>
                  <button
                    onClick={() => onTicketQuantityChange(ticketQuantity + 1)}
                    className="rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-100"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Availability Status */}
            <div className="rounded-lg bg-emerald-50 p-4">
              <p className="text-sm text-emerald-800">
                <span className="font-semibold">142 tickets</span> remaining
              </p>
            </div>
          </div>
        </div>

        <TicketSelectorModal isOpen={isTicketModalOpen} onClose={() => setIsTicketModalOpen(false)} ticketType={ticketType} onSelect={onTicketTypeChange} />
      </>
    );
  }

  // SERVICE AVAILABILITY
  if (listing.listingType === 'service') {
    return (
      <>
        <div className="border-b border-slate-100 pb-8">
          <h2 className="text-2xl font-bold text-slate-950">{getAvailabilityTitle()}</h2>

          <div className="mt-6 space-y-4">
            {/* Service Area */}
            <div>
              <p className="font-semibold text-slate-900">Service area</p>
              <p className="mt-1 text-slate-600">{listing.location}</p>
            </div>

            {/* Working Hours */}
            <div>
              <p className="font-semibold text-slate-900">Working hours</p>
              <p className="mt-1 text-slate-600">Monday – Saturday, 8:00 AM – 6:00 PM</p>
            </div>

            {/* Duration */}
            <div>
              <p className="font-semibold text-slate-900">Estimated duration</p>
              <p className="mt-1 text-slate-600">Approximately 45 minutes</p>
            </div>

            <hr className="my-4" />

            {/* Date Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-900">Select date</label>
              <button
                onClick={() => setIsDateModalOpen(true)}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-left hover:border-slate-400"
              >
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-slate-400" />
                  <span className={selectedDate ? 'font-medium text-slate-900' : 'text-slate-500'}>
                    {selectedDate || 'Select date'}
                  </span>
                </div>
              </button>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <div>
                <label className="block text-sm font-semibold text-slate-900">Select time</label>
                <button
                  onClick={() => setIsTimeModalOpen(true)}
                  className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-3 text-left hover:border-slate-400"
                >
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-slate-400" />
                    <span className={selectedTime ? 'font-medium text-slate-900' : 'text-slate-500'}>
                      {selectedTime || 'Select time'}
                    </span>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>

        <DateSelectorModal isOpen={isDateModalOpen} onClose={() => setIsDateModalOpen(false)} selectedDate={selectedDate} onSelect={onDateChange} />
        <TimeSelectorModal isOpen={isTimeModalOpen} onClose={() => setIsTimeModalOpen(false)} selectedTime={selectedTime} onSelect={onTimeChange} />
      </>
    );
  }

  // STAY AVAILABILITY (placeholder for future)
  return (
    <div className="border-b border-slate-100 pb-8">
      <h2 className="text-2xl font-bold text-slate-950">{getAvailabilityTitle()}</h2>
      <p className="mt-4 text-slate-600">Availability information coming soon.</p>
    </div>
  );
}
