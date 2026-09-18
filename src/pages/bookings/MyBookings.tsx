'use client';

import { useEffect, useMemo, useState } from 'react';
import { CalendarDays, MapPin } from 'lucide-react';
import Link from '../../components/ui/Link';

type Booking = {
  id: string;
  reference: string;
  listingTitle: string;
  listingType: string;
  listingImage?: string | null;
  location?: string | null;
  status: string;
  paymentStatus: string;
  selectedDate?: string | null;
  selectedTime?: string | null;
  total: number;
  currency: string;
};

const tabs = ['UPCOMING', 'PAST', 'CANCELLED'] as const;

function isPast(booking: Booking) {
  return booking.selectedDate ? new Date(`${booking.selectedDate}T23:59:59`) < new Date() : booking.status === 'COMPLETED';
}

export default function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('UPCOMING');
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    fetch('/api/bookings', { credentials: 'include' })
      .then(async (response) => {
        const payload = await response.json();
        if (!response.ok) throw new Error(payload?.error?.message || 'Sign in to view your bookings.');
        setBookings(payload.bookings || []);
        setState('ready');
      })
      .catch(() => setState('error'));
  }, []);

  const filtered = useMemo(() => bookings.filter((booking) => {
    if (activeTab === 'CANCELLED') return booking.status === 'CANCELLED' || booking.status === 'REFUNDED';
    if (activeTab === 'PAST') return booking.status === 'COMPLETED' || isPast(booking);
    return booking.status !== 'CANCELLED' && booking.status !== 'REFUNDED' && !isPast(booking);
  }), [activeTab, bookings]);

  return (
    <main className="min-h-screen bg-cream px-4 py-12 text-charcoal-900 sm:px-6 lg:px-8 dark:bg-[#121614] dark:text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/?view=browse" className="text-sm font-semibold text-emerald-700 hover:text-emerald-800">← Back to explore</Link>
        <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">Your account</p><h1 className="mt-2 text-4xl font-bold tracking-tight">My bookings</h1></div><div className="flex gap-2" role="tablist" aria-label="Booking status"><span className="sr-only">Filter bookings</span>{tabs.map((tab) => <button key={tab} type="button" role="tab" aria-selected={activeTab === tab} onClick={() => setActiveTab(tab)} className={`rounded-full px-4 py-2 text-xs font-bold tracking-[0.12em] transition ${activeTab === tab ? 'bg-charcoal-900 text-cream dark:bg-white dark:text-slate-900' : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-white/5 dark:text-slate-300 dark:hover:bg-white/10'}`}>{tab}</button>)}</div></div>

        {state === 'loading' ? <div className="mt-10 grid gap-5 md:grid-cols-2"><div className="h-52 animate-pulse rounded-3xl bg-slate-200 dark:bg-white/10" /><div className="h-52 animate-pulse rounded-3xl bg-slate-200 dark:bg-white/10" /></div> : null}
        {state === 'error' ? <div className="mt-10 rounded-3xl border border-amber-200 bg-amber-50 p-8 text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">Sign in to see your private bookings.</div> : null}
        {state === 'ready' && filtered.length === 0 ? <div className="mt-10 rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600 dark:border-white/15 dark:bg-white/5 dark:text-slate-300">No {activeTab.toLowerCase()} bookings yet.</div> : null}
        <div className="mt-10 grid gap-5 md:grid-cols-2">{filtered.map((booking) => <Link key={booking.id} href={`/bookings/${booking.id}`} className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5"><div className="flex gap-4 p-4">{booking.listingImage ? <img src={booking.listingImage} alt="" className="h-28 w-32 rounded-2xl object-cover" /> : <div className="h-28 w-32 rounded-2xl bg-slate-200 dark:bg-white/10" />}<div className="min-w-0 flex-1"><div className="flex items-start justify-between gap-3"><span className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700">{booking.listingType}</span><span className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">{booking.status.replace('_', ' ')}</span></div><h2 className="mt-2 truncate text-lg font-bold text-slate-950 dark:text-white">{booking.listingTitle}</h2><p className="mt-2 flex items-center gap-1 truncate text-sm text-slate-600 dark:text-slate-300"><MapPin className="h-3.5 w-3.5" />{booking.location || 'Rwanda'}</p><p className="mt-2 flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300"><CalendarDays className="h-3.5 w-3.5" />{booking.selectedDate || 'Date pending'}{booking.selectedTime ? ` · ${booking.selectedTime}` : ''}</p></div></div><div className="flex items-center justify-between border-t border-slate-100 px-4 py-3 text-sm dark:border-white/10"><span className="text-slate-500">{booking.reference}</span><strong className="text-slate-950 dark:text-white">{booking.currency} {booking.total.toLocaleString()}</strong></div></Link>)}</div>
      </div>
    </main>
  );
}
