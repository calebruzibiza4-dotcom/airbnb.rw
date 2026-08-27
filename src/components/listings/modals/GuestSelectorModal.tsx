'use client';

import { X, Plus, Minus } from 'lucide-react';

interface GuestSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  guestCount: number;
  onSelect: (count: number) => void;
  maxGuests?: number;
}

export default function GuestSelectorModal({
  isOpen,
  onClose,
  guestCount,
  onSelect,
  maxGuests = 10,
}: GuestSelectorModalProps) {
  if (!isOpen) return null;

  const handleDecrement = () => {
    if (guestCount > 1) {
      onSelect(guestCount - 1);
    }
  };

  const handleIncrement = () => {
    if (guestCount < maxGuests) {
      onSelect(guestCount + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Number of guests</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-slate-100" aria-label="Close">
            <X className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        {/* Guest Counter */}
        <div className="mt-8 flex items-center justify-between rounded-lg border border-slate-300 p-4">
          <span className="font-semibold text-slate-900">Guests</span>
          <div className="flex items-center gap-4">
            <button
              onClick={handleDecrement}
              disabled={guestCount <= 1}
              className="rounded-lg border border-slate-300 p-2 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="h-5 w-5" />
            </button>
            <span className="w-8 text-center text-lg font-bold text-slate-900">{guestCount}</span>
            <button
              onClick={handleIncrement}
              disabled={guestCount >= maxGuests}
              className="rounded-lg border border-slate-300 p-2 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Info */}
        <p className="mt-4 text-sm text-slate-600">Maximum {maxGuests} guests</p>

        {/* Footer */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 font-semibold text-white hover:bg-emerald-700"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
