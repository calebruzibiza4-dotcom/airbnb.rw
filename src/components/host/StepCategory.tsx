import { Sparkles } from 'lucide-react';
import SelectionCard from './SelectionCard';
import type { ListingType } from './types';

type StepCategoryProps = {
  listingType: ListingType | null;
  value: string;
  onSelect: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  errors?: {
    category?: string;
  };
};

const categoryMap: Record<ListingType, string[]> = {
  experiences: ['Nature', 'Culture', 'Adventure', 'Relaxation', 'Food & Drink', 'Learning', 'Family'],
  events: ['Concert', 'Festival', 'Sports Event', 'Theatre', 'Art Exhibition', 'Food Festival', 'Conference', 'Community Event', 'Workshop', 'Networking'],
  services: ['Transport', 'Travel', 'Accommodation Support', 'Lifestyle', 'Business', 'Photography', 'Cleaning', 'Security', 'Food & Catering', 'Health & Wellness'],
};

export default function StepCategory({ listingType, value, onSelect, onNext, onBack, errors }: StepCategoryProps) {
  const options = listingType ? categoryMap[listingType] : [];

  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-white/70 bg-white/70 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-700">Step 3</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Choose a category</h2>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {options.map((option) => (
            <SelectionCard
              key={option}
              title={option}
              description={`A ${option.toLowerCase()} option for your ${listingType ?? 'listing'}.`}
              icon={<Sparkles className="h-5 w-5" />}
              selected={value === option}
              onClick={() => onSelect(option)}
            />
          ))}
        </div>
        {errors?.category ? <p className="mt-4 text-sm font-medium text-rose-600">{errors.category}</p> : null}
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
