type StepBasicsProps = {
  values: {
    title: string;
    summary: string;
    description: string;
    languages: string;
    maxGuests: string;
    duration: string;
    operatingDays: string;
    operatingHours: string;
    included: string;
    guestRequirements: string;
    accessibility: string;
  };
  onChange: (field: string, value: string) => void;
  onNext: () => void;
  onBack: () => void;
  errors?: {
    title?: string;
    summary?: string;
    description?: string;
    languages?: string;
    maxGuests?: string;
    duration?: string;
    operatingDays?: string;
    operatingHours?: string;
    included?: string;
  };
};

const inputClassName = 'w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm outline-none transition focus:border-emerald-400';

export default function StepBasics({ values, onChange, onNext, onBack, errors }: StepBasicsProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-white/70 bg-white/70 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-700">Step 5</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Tell guests about your offering</h2>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
            <span>Listing Title</span>
            <input value={values.title} onChange={(event) => onChange('title', event.target.value)} className={inputClassName} placeholder="Beautiful Kigali food tour" />
            {errors?.title ? <p className="text-sm font-medium text-rose-600">{errors.title}</p> : null}
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
            <span>Short Summary</span>
            <textarea value={values.summary} onChange={(event) => onChange('summary', event.target.value)} className={inputClassName} rows={3} placeholder="A quick snapshot of what guests can expect." />
            {errors?.summary ? <p className="text-sm font-medium text-rose-600">{errors.summary}</p> : null}
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
            <span>Detailed Description</span>
            <textarea value={values.description} onChange={(event) => onChange('description', event.target.value)} className={inputClassName} rows={5} placeholder="Describe the experience, event, or service in detail." />
            {errors?.description ? <p className="text-sm font-medium text-rose-600">{errors.description}</p> : null}
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Languages Spoken</span>
            <input value={values.languages} onChange={(event) => onChange('languages', event.target.value)} className={inputClassName} placeholder="English, Kinyarwanda, French" />
            {errors?.languages ? <p className="text-sm font-medium text-rose-600">{errors.languages}</p> : null}
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Maximum Guests</span>
            <input value={values.maxGuests} onChange={(event) => onChange('maxGuests', event.target.value)} className={inputClassName} placeholder="10" />
            {errors?.maxGuests ? <p className="text-sm font-medium text-rose-600">{errors.maxGuests}</p> : null}
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Duration</span>
            <input value={values.duration} onChange={(event) => onChange('duration', event.target.value)} className={inputClassName} placeholder="3 hours" />
            {errors?.duration ? <p className="text-sm font-medium text-rose-600">{errors.duration}</p> : null}
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Operating Days</span>
            <input value={values.operatingDays} onChange={(event) => onChange('operatingDays', event.target.value)} className={inputClassName} placeholder="Mon-Sun" />
            {errors?.operatingDays ? <p className="text-sm font-medium text-rose-600">{errors.operatingDays}</p> : null}
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700">
            <span>Operating Hours</span>
            <input value={values.operatingHours} onChange={(event) => onChange('operatingHours', event.target.value)} className={inputClassName} placeholder="8:00 AM - 6:00 PM" />
            {errors?.operatingHours ? <p className="text-sm font-medium text-rose-600">{errors.operatingHours}</p> : null}
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
            <span>What is included?</span>
            <textarea value={values.included} onChange={(event) => onChange('included', event.target.value)} className={inputClassName} rows={3} placeholder="List what you include for guests." />
            {errors?.included ? <p className="text-sm font-medium text-rose-600">{errors.included}</p> : null}
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
            <span>What should guests bring? (optional)</span>
            <textarea value={values.guestRequirements} onChange={(event) => onChange('guestRequirements', event.target.value)} className={inputClassName} rows={2} placeholder="Bring comfortable shoes, a camera, or water." />
          </label>
          <label className="space-y-2 text-sm font-medium text-slate-700 md:col-span-2">
            <span>Accessibility information (optional)</span>
            <textarea value={values.accessibility} onChange={(event) => onChange('accessibility', event.target.value)} className={inputClassName} rows={2} placeholder="Mention ramps, accessible restrooms, or other needs." />
          </label>
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
