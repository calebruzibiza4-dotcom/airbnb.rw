import LocationPicker from './LocationPicker';

type StepLocationProps = {
  values: {
    province: string;
    district: string;
    sector: string;
    address: string;
    landmark: string;
  };
  onChange: (field: string, value: string) => void;
  onUseCurrentLocation: () => void;
  onNext: () => void;
  onBack: () => void;
  errors?: {
    province?: string;
    district?: string;
    sector?: string;
    address?: string;
  };
};

export default function StepLocation({ values, onChange, onUseCurrentLocation, onNext, onBack, errors }: StepLocationProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-white/70 bg-white/70 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-700">Step 4</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Where do you operate?</h2>
          <p className="mt-3 text-slate-600">Guests will later see this location on your listing pages, so make it clear and accurate.</p>
        </div>
        <div className="mt-8">
          <LocationPicker province={values.province} district={values.district} sector={values.sector} address={values.address} landmark={values.landmark} onChange={onChange} onUseCurrentLocation={onUseCurrentLocation} />
          <div className="mt-4 space-y-2 text-sm font-medium text-rose-600">
            {errors?.province ? <p>{errors.province}</p> : null}
            {errors?.district ? <p>{errors.district}</p> : null}
            {errors?.sector ? <p>{errors.sector}</p> : null}
            {errors?.address ? <p>{errors.address}</p> : null}
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
