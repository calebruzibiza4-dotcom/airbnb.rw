import { MapPin, Navigation } from 'lucide-react';

type LocationPickerProps = {
  province: string;
  district: string;
  sector: string;
  address: string;
  landmark: string;
  onChange: (field: string, value: string) => void;
  onUseCurrentLocation: () => void;
};

export default function LocationPicker({ province, district, sector, address, landmark, onChange, onUseCurrentLocation }: LocationPickerProps) {
  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Province</span>
          <input value={province} onChange={(event) => onChange('province', event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm outline-none focus:border-emerald-400" placeholder="e.g. Kigali" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>District</span>
          <input value={district} onChange={(event) => onChange('district', event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm outline-none focus:border-emerald-400" placeholder="e.g. Gasabo" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Sector</span>
          <input value={sector} onChange={(event) => onChange('sector', event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm outline-none focus:border-emerald-400" placeholder="e.g. Kacyiru" />
        </label>
        <label className="space-y-2 text-sm font-medium text-slate-700">
          <span>Street Address</span>
          <input value={address} onChange={(event) => onChange('address', event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm outline-none focus:border-emerald-400" placeholder="e.g. KG 7 Ave" />
        </label>
      </div>

      <label className="space-y-2 text-sm font-medium text-slate-700">
        <span>Landmark (optional)</span>
        <input value={landmark} onChange={(event) => onChange('landmark', event.target.value)} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm outline-none focus:border-emerald-400" placeholder="e.g. Near Kigali Heights" />
      </label>

      <div className="rounded-[24px] border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-sm font-semibold text-slate-900">Google Maps search</p>
            <p className="text-sm text-slate-600">Search an address and confirm the pin location.</p>
          </div>
          <button type="button" onClick={onUseCurrentLocation} className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700">
            <Navigation className="h-4 w-4" />
            Use My Current Location
          </button>
        </div>
        <div className="mt-4 flex items-center gap-3 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-3 text-sm text-slate-600">
          <MapPin className="h-5 w-5 text-emerald-700" />
          <span>Interactive map preview will appear here and can be connected to a mapping provider later.</span>
        </div>
      </div>
    </div>
  );
}
