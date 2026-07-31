import { ArrowRight, Compass, Sparkles, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

type StepWelcomeProps = {
  onNext: () => void;
};

const benefits = [
  {
    title: 'Reach local and international travelers',
    icon: Compass,
  },
  {
    title: 'Earn money doing what you love',
    icon: TrendingUp,
  },
  {
    title: 'Build your reputation through reviews',
    icon: Sparkles,
  },
];

export default function StepWelcome({ onNext }: StepWelcomeProps) {
  return (
    <div className="space-y-8">
      <div className="rounded-[32px] border border-white/70 bg-white/70 p-8 shadow-[0_20px_80px_rgba(15,23,42,0.08)] backdrop-blur-xl">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.32em] text-emerald-700">Premium hosting</p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">Become a Host</h2>
          <p className="mt-4 text-lg text-slate-600">Share what makes Rwanda special. Whether you offer unforgettable experiences, exciting events, or professional services, you can reach thousands of travelers and locals through our platform.</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {benefits.map((benefit) => {
            const Icon = benefit.icon;
            return (
              <div key={benefit.title} className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-medium text-slate-700">{benefit.title}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        <button type="button" className="rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
          Learn More
        </button>
        <motion.button
          whileHover={{ y: -2, scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(16,185,129,0.2)] transition hover:bg-emerald-700"
        >
          Get Started <ArrowRight className="h-4 w-4" />
        </motion.button>
      </div>
    </div>
  );
}
