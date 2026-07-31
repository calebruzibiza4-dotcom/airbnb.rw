import { Compass, PartyPopper, Sparkles } from 'lucide-react';
import type { ReactNode } from 'react';
import SelectionCard from './SelectionCard';
import type { ListingType } from './types';

type StepListingTypeProps = {
  value: ListingType | null;
  onSelect: (value: ListingType) => void;
  onNext: () => void;
  onBack: () => void;
  errors?: {
    listingType?: string;
  };
};

const options: Array<{ value: ListingType; title: string; description: string; examples: string[]; icon: ReactNode }> = [
  {
    value: 'experiences',
    title: 'Experiences',
    description: 'Activities people can join and enjoy.',
    examples: ['Gorilla Trekking', 'Coffee Tours', 'Cultural Experiences', 'Hiking', 'Boat Trips'],
    icon: <Compass className="h-5 w-5" />,
  },
  {
    value: 'events',
    title: 'Events',
    description: 'Organized events people can attend.',
    examples: ['Concerts', 'Festivals', 'Conferences', 'Sports Events', 'Community Events'],
    icon: <PartyPopper className="h-5 w-5" />,
  },
  {
    value: 'services',
    title: 'Services',
    description: 'Professional services travelers and locals may need.',
    examples: ['Airport Transfers', 'Car Rentals', 'Tour Guides', 'Photography', 'Catering'],
    icon: <Sparkles className="h-5 w-5" />,
  },
];

export default function StepListingType({ value, onSelect, onNext, onBack, errors }: StepListingTypeProps) {
  return (
    <div className="space-y-6">
      <div className="rounded-[32px] border border-white/70 bg-white/70 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-700">Step 2</p>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">Choose what you want to offer</h2>
        </div>
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {options.map((option) => (
            <SelectionCard
              key={option.value}
              title={option.title}
              description={option.description}
              icon={option.icon}
              selected={value === option.value}
              onClick={() => onSelect(option.value)}
            >
              <ul className="space-y-1">
                {option.examples.map((example) => (
                  <li key={example} className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>{example}</span>
                  </li>
                ))}
              </ul>
            </SelectionCard>
          ))}
        </div>
        {errors?.listingType ? <p className="mt-4 text-sm font-medium text-rose-600">{errors.listingType}</p> : null}
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
