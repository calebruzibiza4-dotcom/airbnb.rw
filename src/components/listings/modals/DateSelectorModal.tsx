'use client';

import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface DateSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate: string | null;
  onSelect: (date: string) => void;
}

export default function DateSelectorModal({ isOpen, onClose, selectedDate, onSelect }: DateSelectorModalProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  if (!isOpen) return null;

  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();

  // Generate dates for the calendar
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const dates = [];
  for (let i = 0; i < startingDayOfWeek; i++) {
    dates.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    dates.push(i);
  }

  const handleDateSelect = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    onSelect(dateStr);
    onClose();
  };

  const goToPrevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1));
  };

  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Select date</h2>
          <button onClick={onClose} className="rounded-full p-1 hover:bg-slate-100" aria-label="Close">
            <X className="h-6 w-6 text-slate-600" />
          </button>
        </div>

        {/* Month Navigation */}
        <div className="mt-6 flex items-center justify-between">
          <button onClick={goToPrevMonth} className="rounded-lg p-2 hover:bg-slate-100">
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h3 className="font-semibold text-slate-900">{monthName}</h3>
          <button onClick={goToNextMonth} className="rounded-lg p-2 hover:bg-slate-100">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Calendar */}
        <div className="mt-6">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold text-slate-600">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day}>{day}</div>
            ))}
          </div>

          {/* Dates */}
          <div className="mt-2 grid grid-cols-7 gap-2">
            {dates.map((day, i) => (
              <button
                key={i}
                onClick={() => day && handleDateSelect(day)}
                disabled={!day}
                className={`rounded-lg py-2 text-sm font-medium transition ${
                  !day
                    ? 'text-slate-300 cursor-default'
                    : selectedDate === `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
                      ? 'bg-emerald-600 text-white hover:bg-emerald-700'
                      : 'hover:bg-slate-100 text-slate-900'
                }`}
              >
                {day}
              </button>
            ))}
          </div>
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
