'use client';

import { useEffect, useState } from 'react';
import { CalendarDays, MapPin } from 'lucide-react';
import Link from '../../components/ui/Link';

type Booking = {
  id: string;
  reference: string;
  listingId: string;
  listingTitle: string;
  listingType: string;
  listingImage?: string | null;
  location?: string | null;
  status: string;
  paymentStatus: string;
  selectedDate?: string | null;
  selectedTime?: string | null;
  guestCount?: number | null;
  ticketType?: string | null;
  ticketQuantity?: number | null;
  subtotal: number;
  serviceFee: number;
  total: number;
  currency: string;
  createdAt: string;
};

export default function BookingDetails({ id }: { id: string }) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/bookings/${encodeURIComponent(id)}`, { credentials: 'include' })
      .then(async (response) => { const payload = await response.json(); if (!response.ok) throw new Error(payload?.error?.message || 'Booking not found.'); setBooking(payload.booking); })
      .catch((error) => setMessage(error instanceof Error ? error.message : 'Booking not found.'))
      .finally(() => setLoading(false));
  }, [id]);

  const cancel = async () => {
    if (!booking || !window.confirm('Cancel this booking? Any refund will depend on the configured payment provider and cancellation policy.')) return;
    const response = await fetch(`/api/bookings/${booking.id}/cancel`, { method: 'POST', credentials: 'include' });
    const payload = await response.json();
    if (!response.ok) { setMessage(payload?.error?.message || 'We could not cancel this booking.'); return; }
    setBooking({ ...booking, status: 'CANCELLED' });
    setMessage(payload.message);
  };

  if (loading) return <main className="min-h-screen bg-cream p-8 dark:bg-[#121614]"><div className="mx-auto h-96 max-w-3xl animate-pulse rounded-3xl bg-slate-200 dark:bg-white/10" /></main>;
  if (!booking) return <main className="min-h-screen bg-cream px-4 py-16 text-center dark:bg-[#121614]"><p className="text-lg text-slate-600 dark:text-slate-300">{message || 'Booking not found.'}</p><Link href="/bookings" className="mt-6 inline-block font-semibold text-emerald-700">View my bookings</Link></main>;

  const cancellable = booking.status === 'PENDING_PAYMENT' || booking.status === 'CONFIRMED';
  return <main className="min-h-screen bg-cream px-4 py-12 text-charcoal-900 dark:bg-[#121614] dark:text-white sm:px-6 lg:px-8"><div className="mx-auto max-w-4xl"><Link href="/bookings" className="text-sm font-semibold text-emerald-700">← My bookings</Link><div className="mt-8 overflow-hidden rounded-[32px] border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-white/5"><div className="grid md:grid-cols-[0.8fr_1.2fr]">{booking.listingImage ? <img src={booking.listingImage} alt="" className="h-full min-h-64 w-full object-cover" /> : <div className="min-h-64 bg-slate-200 dark:bg-white/10" />}<div className="p-6 sm:p-9"><div className="flex flex-wrap items-center justify-between gap-3"><span className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">{booking.status.replace('_', ' ')}</span><span className="font-mono text-sm text-slate-500">{booking.reference}</span></div><h1 className="mt-4 text-3xl font-bold text-slate-950 dark:text-white">{booking.listingTitle}</h1><p className="mt-2 text-slate-600 dark:text-slate-300">{booking.listingType} · {booking.paymentStatus}</p><div className="mt-8 grid gap-5 sm:grid-cols-2"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Date</p><p className="mt-1 flex items-center gap-2 font-semibold"><CalendarDays className="h-4 w-4 text-emerald-700" />{booking.selectedDate || 'Pending'}</p></div><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Location</p><p className="mt-1 flex items-center gap-2 font-semibold"><MapPin className="h-4 w-4 text-emerald-700" />{booking.location || 'Rwanda'}</p></div><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Time</p><p className="mt-1 font-semibold">{booking.selectedTime || 'Not specified'}</p></div><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Guests / tickets</p><p className="mt-1 font-semibold">{booking.ticketQuantity || booking.guestCount || 1}</p></div></div></div></div><div className="border-t border-slate-100 p-6 sm:p-9 dark:border-white/10"><h2 className="text-xl font-bold">Price details</h2><div className="mt-5 max-w-md space-y-3 text-sm"><div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300">Booking subtotal</span><span>{booking.currency} {booking.subtotal.toLocaleString()}</span></div><div className="flex justify-between"><span className="text-slate-600 dark:text-slate-300">Service fee</span><span>{booking.currency} {booking.serviceFee.toLocaleString()}</span></div><div className="flex justify-between border-t border-slate-200 pt-3 text-lg font-bold dark:border-white/10"><span>Total</span><span>{booking.currency} {booking.total.toLocaleString()}</span></div></div>{message ? <p className="mt-5 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-400/10 dark:text-amber-100">{message}</p> : null}<div className="mt-7 flex flex-wrap gap-3"><Link href={`/listings/${booking.listingId}`} className="rounded-2xl bg-emerald-700 px-5 py-3 font-bold text-white">View listing</Link>{cancellable ? <button type="button" onClick={cancel} className="rounded-2xl border border-rose-200 px-5 py-3 font-bold text-rose-700 dark:border-rose-400/30 dark:text-rose-200">Cancel booking</button> : null}</div></div></div></div></main>;
}
