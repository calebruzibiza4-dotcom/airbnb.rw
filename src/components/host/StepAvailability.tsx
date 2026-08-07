import { CalendarDays, Clock3, Repeat, ShieldCheck, Sparkles } from 'lucide-react';
import type { ListingType, HostFormData } from './types';

type StepAvailabilityProps = {
  listingType: ListingType | null;
  values: HostFormData['availability'];
  onChange: (field: keyof HostFormData['availability'], value: string | boolean) => void;
  onNext: () => void;
  onBack: () => void;
  errors?: Partial<Record<keyof HostFormData['availability'], string>>;
};

const inputClass = 'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-emerald-400';

export default function StepAvailability({ listingType, values, onChange, onNext, onBack, errors }: StepAvailabilityProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-white/70 bg-white/70 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-emerald-700" />
            <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-700">Step 7</p>
          </div>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Availability settings</h2>
          <p className="mt-3 text-slate-600">Set the right availability details so guests can book with confidence.</p>
        </div>

        {listingType === 'experiences' ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Operating days</span>
              <input value={values.multiDay ? '' : values.eventDate} disabled className={inputClass} placeholder="Mon-Sun" />
              {errors?.bookingCutoff ? <p className="text-sm font-medium text-rose-600">{errors.bookingCutoff}</p> : null}
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2"><Clock3 className="h-4 w-4" /> Start time</span>
              <input type="time" value={values.startTime} onChange={(event) => onChange('startTime', event.target.value)} className={inputClass} />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2"><Clock3 className="h-4 w-4" /> End time</span>
              <input type="time" value={values.endTime} onChange={(event) => onChange('endTime', event.target.value)} className={inputClass} />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2"><Repeat className="h-4 w-4" /> Booking cutoff</span>
              <input value={values.bookingCutoff} onChange={(event) => onChange('bookingCutoff', event.target.value)} className={inputClass} placeholder="24 hours before" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Duration</span>
              <input value={values.appointmentDuration} onChange={(event) => onChange('appointmentDuration', event.target.value)} className={inputClass} placeholder="3 hours" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
              <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Capacity</span>
              <input value={values.capacity} onChange={(event) => onChange('capacity', event.target.value)} className={inputClass} placeholder="Maximum guests" />
            </label>
          </div>
        ) : listingType === 'events' ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Event date</span>
              <input type="date" value={values.eventDate} onChange={(event) => onChange('eventDate', event.target.value)} className={inputClass} />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2"><Clock3 className="h-4 w-4" /> Start time</span>
              <input type="time" value={values.startTime} onChange={(event) => onChange('startTime', event.target.value)} className={inputClass} />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2"><Clock3 className="h-4 w-4" /> End time</span>
              <input type="time" value={values.endTime} onChange={(event) => onChange('endTime', event.target.value)} className={inputClass} />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2"><Repeat className="h-4 w-4" /> Multi-day event</span>
              <div className="flex items-center gap-3">
                <input id="multiDay" type="checkbox" checked={values.multiDay} onChange={(event) => onChange('multiDay', event.target.checked)} className="h-4 w-4 rounded border-slate-300 text-emerald-600" />
                <label htmlFor="multiDay" className="text-sm text-slate-700">Allow more than one day</label>
              </div>
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Capacity</span>
              <input value={values.capacity} onChange={(event) => onChange('capacity', event.target.value)} className={inputClass} placeholder="Event capacity" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
              <span className="flex items-center gap-2"><Repeat className="h-4 w-4" /> Booking cutoff</span>
              <input value={values.bookingCutoff} onChange={(event) => onChange('bookingCutoff', event.target.value)} className={inputClass} placeholder="24 hours before" />
            </label>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
              <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Weekly schedule</span>
              <input value={values.weeklySchedule} onChange={(event) => onChange('weeklySchedule', event.target.value)} className={inputClass} placeholder="Mon-Fri, 9am-5pm" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2"><Clock3 className="h-4 w-4" /> Working hours</span>
              <input value={values.startTime} onChange={(event) => onChange('startTime', event.target.value)} className={inputClass} placeholder="8:00 AM" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2"><Clock3 className="h-4 w-4" /> End time</span>
              <input value={values.endTime} onChange={(event) => onChange('endTime', event.target.value)} className={inputClass} placeholder="5:00 PM" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700">
              <span className="flex items-center gap-2"><ShieldCheck className="h-4 w-4" /> Appointment duration</span>
              <input value={values.appointmentDuration} onChange={(event) => onChange('appointmentDuration', event.target.value)} className={inputClass} placeholder="1 hour" />
            </label>
            <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
              <span className="flex items-center gap-2"><CalendarDays className="h-4 w-4" /> Closed days</span>
              <input value={values.closedDays} onChange={(event) => onChange('closedDays', event.target.value)} className={inputClass} placeholder="Sunday, public holidays" />
            </label>
          </div>
        )}

        <div className="mt-6 text-sm text-slate-600">
          {listingType === 'experiences' && 'Experiences need operating days, start/end times, duration, capacity, and booking cutoff details.'}
          {listingType === 'events' && 'Events need date, time, capacity, and optional multi-day settings.'}
          {listingType === 'services' && 'Services need a weekly schedule, working hours, appointments, and closed-day rules.'}
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
