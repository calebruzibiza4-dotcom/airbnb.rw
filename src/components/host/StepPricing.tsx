import { DollarSign, Percent, ShieldCheck, Sparkles, Wallet } from 'lucide-react';
import type { HostFormData } from './types';

type StepPricingProps = {
  listingType: HostFormData['listingType'];
  values: HostFormData['pricing'];
  onChange: (field: keyof HostFormData['pricing'], value: string | boolean) => void;
  onNext: () => void;
  onBack: () => void;
  errors?: Partial<Record<keyof HostFormData['pricing'], string>>;
};

const inputClass = 'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-emerald-400';

export default function StepPricing({ listingType, values, onChange, onNext, onBack, errors }: StepPricingProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-white/70 bg-white/70 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-emerald-700" />
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-700">Step 8</p>
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Pricing options</h2>
          <p className="mt-3 text-slate-600">Customize pricing for your listing type and display estimated host earnings.</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span className="flex items-center gap-2"><Wallet className="h-4 w-4" /> Currency</span>
            <select value={values.currency} onChange={(event) => onChange('currency', event.target.value)} className={inputClass}>
              <option value="RWF">RWF</option>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
            </select>
          </label>

          {listingType === 'experiences' ? (
            <>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span className="flex items-center gap-2"><DollarSign className="h-4 w-4" /> Price per guest</span>
                <input value={values.pricePerGuest} onChange={(event) => onChange('pricePerGuest', event.target.value)} className={inputClass} placeholder="e.g. 15000" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span className="flex items-center gap-2"><Percent className="h-4 w-4" /> Group discount</span>
                <input value={values.groupDiscount} onChange={(event) => onChange('groupDiscount', event.target.value)} className={inputClass} placeholder="e.g. 10%" />
              </label>
            </>
          ) : listingType === 'events' ? (
            <>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span className="flex items-center gap-2"><DollarSign className="h-4 w-4" /> Standard ticket price</span>
                <input value={values.standardTicketPrice} onChange={(event) => onChange('standardTicketPrice', event.target.value)} className={inputClass} placeholder="e.g. 15000" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span className="flex items-center gap-2"><Sparkles className="h-4 w-4" /> VIP ticket (optional)</span>
                <input value={values.vipTicketPrice} onChange={(event) => onChange('vipTicketPrice', event.target.value)} className={inputClass} placeholder="e.g. 25000" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span className="flex items-center gap-2"><Percent className="h-4 w-4" /> Early bird price</span>
                <input value={values.earlyBirdPrice} onChange={(event) => onChange('earlyBirdPrice', event.target.value)} className={inputClass} placeholder="e.g. 13000" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
                <div className="flex items-center gap-3">
                  <input id="freeEvent" type="checkbox" checked={values.freeEvent} onChange={(event) => onChange('freeEvent', event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-emerald-600" />
                  <label htmlFor="freeEvent" className="text-sm font-medium text-slate-700">Free event</label>
                </div>
              </label>
            </>
          ) : (
            <>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span className="flex items-center gap-2"><DollarSign className="h-4 w-4" /> Hourly rate</span>
                <input value={values.hourlyRate} onChange={(event) => onChange('hourlyRate', event.target.value)} className={inputClass} placeholder="e.g. 10000" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span className="flex items-center gap-2"><DollarSign className="h-4 w-4" /> Daily rate</span>
                <input value={values.dailyRate} onChange={(event) => onChange('dailyRate', event.target.value)} className={inputClass} placeholder="e.g. 60000" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700">
                <span className="flex items-center gap-2"><DollarSign className="h-4 w-4" /> Fixed package price</span>
                <input value={values.fixedPackagePrice} onChange={(event) => onChange('fixedPackagePrice', event.target.value)} className={inputClass} placeholder="e.g. 250000" />
              </label>
              <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
                <div className="flex items-center gap-3">
                  <input id="negotiable" type="checkbox" checked={values.negotiable} onChange={(event) => onChange('negotiable', event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-emerald-600" />
                  <label htmlFor="negotiable" className="text-sm font-medium text-slate-700">Negotiable pricing</label>
                </div>
              </label>
            </>
          )}

          <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
            <span className="flex items-center gap-2"><Percent className="h-4 w-4" /> Taxes included</span>
            <div className="flex items-center gap-3">
              <input id="taxesIncluded" type="checkbox" checked={values.taxesIncluded} onChange={(event) => onChange('taxesIncluded', event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-emerald-600" />
              <label htmlFor="taxesIncluded" className="text-sm font-medium text-slate-700">Prices include taxes</label>
            </div>
          </label>

          <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
            <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Service fee (%)</span>
            <input value={values.serviceFee} onChange={(event) => onChange('serviceFee', event.target.value)} className={inputClass} placeholder="10" />
          </label>
        </div>

        <div className="mt-6 rounded-[24px] border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
          <p className="font-semibold">Estimated earnings</p>
          <p className="mt-2">Use your pricing details to preview how much guests pay and what you keep after fees.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Host earnings</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{listingType === 'events' ? values.standardTicketPrice || '0' : listingType === 'services' ? values.hourlyRate || '0' : values.pricePerGuest || '0'} {values.currency}</p>
            </div>
            <div className="rounded-2xl bg-white p-4 shadow-sm">
              <p className="text-xs uppercase tracking-[0.24em] text-slate-500">Guest total</p>
              <p className="mt-2 text-xl font-semibold text-slate-900">{listingType === 'events' ? values.standardTicketPrice || '0' : listingType === 'services' ? values.hourlyRate || '0' : values.pricePerGuest || '0'} {values.currency}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-between gap-3">
        <button type="button" onClick={onBack} className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
          Back
        </button>
        <button type="button" onClick={onNext} className="rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,185,129,0.2)] transition hover:bg-emerald-700">
          Continue
        </button>
      </div>
    </div>
  );
}
