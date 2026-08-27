'use client';

import { X } from 'lucide-react';

interface TimeSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedTime: string | null;
  onSelect: (time: string) => void;
}

export default function TimeSelectorModal({ isOpen, onClose, selectedTime, onSelect }: TimeSelectorModalProps) {
  if (!isOpen) return null;

  // Sample time slots
  const timeSlots = [
    '10:00 AM',
    '12:00 PM',
    '2:00 PM',
    '4:00 PM',
    '6:00 PM',
    '8:00 PM',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Select time</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-slate-100" aria-label="Close">
            <X className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        {/* Time Slots */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {timeSlots.map((time) => (
            <button
              key={time}
              onClick={() => {
                onSelect(time);
                onClose();
              }}
              className={`rounded-lg border-2 px-4 py-3 font-semibold transition ${
                selectedTime === time
                  ? 'border-emerald-600 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 text-slate-900 hover:border-slate-300'
              }`}
            >
              {time}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 rounded-lg border border-slate-300 px-4 py-2 font-semibold text-slate-900 hover:bg-slate-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
