'use client';

import { X } from 'lucide-react';

interface TicketSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  ticketType: string | null;
  onSelect: (type: string) => void;
}

export default function TicketSelectorModal({ isOpen, onClose, ticketType, onSelect }: TicketSelectorModalProps) {
  if (!isOpen) return null;

  const ticketTypes = [
    { name: 'Regular', price: '10,000' },
    { name: 'VIP', price: '25,000' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Select ticket type</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-slate-100" aria-label="Close">
            <X className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        {/* Ticket Options */}
        <div className="mt-6 space-y-3">
          {ticketTypes.map((ticket) => (
            <button
              key={ticket.name}
              onClick={() => {
                onSelect(ticket.name);
                onClose();
              }}
              className={`w-full rounded-lg border-2 px-4 py-4 text-left transition ${
                ticketType === ticket.name
                  ? 'border-emerald-600 bg-emerald-50'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">{ticket.name}</span>
                <span className="text-emerald-700 font-semibold">RWF {ticket.price}</span>
              </div>
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
