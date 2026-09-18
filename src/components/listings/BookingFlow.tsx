'use client';

import { useState } from 'react';
import { ArrowLeft, CheckCircle2, CreditCard, Loader2, MapPin, Smartphone } from 'lucide-react';
import type { PublicListing } from './ListingCard';

type BookingFlowProps = {
  listing: PublicListing;
  selectedDate: string | null;
  selectedTime: string | null;
  guestCount: number;
  ticketType: string | null;
  ticketQuantity: number;
  onClose: () => void;
};

type Booking = {
  id: string;
  reference: string;
  listingTitle: string;
  listingType: string;
  listingImage?: string | null;
  location?: string | null;
  selectedDate?: string | null;
  selectedTime?: string | null;
  guestCount?: number | null;
  ticketType?: string | null;
  ticketQuantity?: number | null;
  subtotal: number;
  serviceFee: number;
  total: number;
  currency: string;
};

function formatMoney(amount: number, currency: string) {
  return `${currency} ${amount.toLocaleString()}`;
}

function typeLabel(type: string) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export default function BookingFlow({ listing, selectedDate, selectedTime, guestCount, ticketType, ticketQuantity, onClose }: BookingFlowProps) {
  const [step, setStep] = useState<'review' | 'payment' | 'confirmation'>('review');
  const [booking, setBooking] = useState<Booking | null>(null);
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'mobile_money' | 'card'>('mobile_money');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const effectiveDate = selectedDate || (listing.availability?.eventDate as string | undefined) || null;
  const quantity = listing.listingType === 'event' ? ticketQuantity : guestCount;
  const estimatedSubtotal = listing.price * quantity;
  const estimatedFee = Math.floor(estimatedSubtotal * 0.05);

  const createBooking = async () => {
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          listingId: listing.id,
          listingType: listing.listingType,
          selectedDate: effectiveDate,
          selectedTime,
          guestCount: listing.listingType === 'event' ? undefined : guestCount,
          ticketType: listing.listingType === 'event' ? ticketType : undefined,
          ticketQuantity: listing.listingType === 'event' ? ticketQuantity : undefined,
        }),
      });
      const payload = await response.json();
      if (response.status === 401) {
        window.dispatchEvent(new CustomEvent('open-auth', { detail: 'login' }));
        throw new Error('Sign in to continue with your booking.');
      }
      if (!response.ok) throw new Error(payload?.error?.message || 'We could not create this booking.');
      setBooking(payload.booking);
      setPaymentId(payload.payment?.id || null);
      setStep('payment');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'We could not create this booking.');
    } finally {
      setIsLoading(false);
    }
  };

  const initializePayment = async () => {
    if (!paymentId) return;
    setError('');
    setIsLoading(true);
    try {
      const response = await fetch(`/api/payments/${paymentId}/initialize`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ method: paymentMethod }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload?.error?.message || 'Payment could not be started.');
      if (payload.redirectUrl) {
        window.location.assign(payload.redirectUrl);
        return;
      }
      setStep('confirmation');
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : 'Payment could not be started.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="max-h-[calc(100vh-2rem)] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-slate-200 bg-white p-5 shadow-2xl sm:p-8 dark:border-white/10 dark:bg-slate-900" role="dialog" aria-modal="true" aria-label="Booking flow">
        <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-5 dark:border-white/10">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">{step === 'confirmation' ? 'Confirmed' : `Step ${step === 'review' ? '1' : '2'} of 2`}</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">{step === 'review' ? 'Review your booking' : step === 'payment' ? 'Payment' : "You're booked!"}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full px-3 py-2 text-sm font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-white/10" aria-label="Close booking flow">Close</button>
        </div>

        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/10 dark:bg-white/5">
          <div className="flex gap-4 p-4">
            {listing.coverImage?.url || listing.images[0]?.url ? <img src={listing.coverImage?.url || listing.images[0]?.url} alt="" className="h-20 w-24 rounded-xl object-cover" /> : null}
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">{typeLabel(listing.listingType)}</p>
              <h3 className="mt-1 truncate font-bold text-slate-950 dark:text-white">{listing.title}</h3>
              <p className="mt-1 flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300"><MapPin className="h-3.5 w-3.5" />{listing.location}</p>
            </div>
          </div>
        </div>

        {step === 'review' ? (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{listing.listingType === 'event' ? 'Event date' : 'Date'}</p><p className="mt-1 font-semibold text-slate-900 dark:text-white">{effectiveDate || 'Not selected'}</p></div>
              {selectedTime ? <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Time</p><p className="mt-1 font-semibold text-slate-900 dark:text-white">{selectedTime}</p></div> : null}
              <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">{listing.listingType === 'event' ? 'Tickets' : 'Guests'}</p><p className="mt-1 font-semibold text-slate-900 dark:text-white">{quantity}</p></div>
              {ticketType ? <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-slate-500">Ticket type</p><p className="mt-1 font-semibold text-slate-900 dark:text-white">{ticketType}</p></div> : null}
            </div>
            <div className="mt-7 space-y-3 border-t border-slate-200 pt-5 dark:border-white/10">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300"><span>{typeLabel(listing.listingType)} × {quantity}</span><span>{formatMoney(estimatedSubtotal, listing.currency)}</span></div>
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-300"><span>Service fee estimate</span><span>{formatMoney(estimatedFee, listing.currency)}</span></div>
              <div className="flex justify-between border-t border-slate-200 pt-3 text-lg font-bold text-slate-950 dark:border-white/10 dark:text-white"><span>Total estimate</span><span>{formatMoney(estimatedSubtotal + estimatedFee, listing.currency)}</span></div>
            </div>
            {error ? <p role="alert" className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-200">{error}</p> : null}
            <button type="button" onClick={createBooking} disabled={isLoading} className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-5 py-3.5 font-bold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60">{isLoading ? <><Loader2 className="h-4 w-4 animate-spin" />Checking availability...</> : 'Continue to payment'}</button>
          </>
        ) : null}

        {step === 'payment' ? (
          <>
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-900 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-100">Your booking is held as <strong>PENDING_PAYMENT</strong>. Payment confirmation must come from the configured provider webhook. No payment will be marked successful in this browser.</div>
            <fieldset className="mt-6 space-y-3">
              <legend className="text-sm font-bold text-slate-900 dark:text-white">Payment method</legend>
              <label className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 ${paymentMethod === 'mobile_money' ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-400/10' : 'border-slate-200 dark:border-white/10'}`}><input type="radio" name="payment-method" checked={paymentMethod === 'mobile_money'} onChange={() => setPaymentMethod('mobile_money')} /><Smartphone className="h-5 w-5 text-emerald-700" /><span className="font-semibold text-slate-900 dark:text-white">Mobile Money</span></label>
              <label className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-4 ${paymentMethod === 'card' ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-400/10' : 'border-slate-200 dark:border-white/10'}`}><input type="radio" name="payment-method" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} /><CreditCard className="h-5 w-5 text-emerald-700" /><span className="font-semibold text-slate-900 dark:text-white">Card</span></label>
            </fieldset>
            {error ? <p role="alert" className="mt-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700 dark:border-rose-400/30 dark:bg-rose-400/10 dark:text-rose-200">{error}</p> : null}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-between"><button type="button" onClick={() => setStep('review')} className="inline-flex items-center justify-center gap-2 rounded-2xl px-4 py-3 font-semibold text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-white/10"><ArrowLeft className="h-4 w-4" />Back</button><button type="button" onClick={initializePayment} disabled={isLoading} className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-700 px-5 py-3.5 font-bold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60">{isLoading ? <><Loader2 className="h-4 w-4 animate-spin" />Redirecting to payment...</> : `Pay ${formatMoney(booking?.total || 0, booking?.currency || listing.currency)}`}</button></div>
          </>
        ) : null}

        {step === 'confirmation' && booking ? (
          <div className="py-8 text-center"><CheckCircle2 className="mx-auto h-14 w-14 text-emerald-600" /><p className="mt-5 text-lg font-bold text-slate-950 dark:text-white">Payment verified</p><p className="mt-2 text-slate-600 dark:text-slate-300">Booking reference: <strong>{booking.reference}</strong></p><button type="button" onClick={onClose} className="mt-7 rounded-2xl bg-emerald-700 px-5 py-3 font-bold text-white">View booking</button></div>
        ) : null}
      </div>
    </div>
  );
}
