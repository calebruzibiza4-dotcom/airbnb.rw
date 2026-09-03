'use client';

import { useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { landingAnalytics } from '../../utils/analytics';

interface FinalCTAProps {
  onExploreClick: () => void;
}

export default function FinalCTA({ onExploreClick }: FinalCTAProps) {
  useEffect(() => {
    landingAnalytics.trackSectionImpression('final-cta');
  }, []);

  const handleClick = () => {
    landingAnalytics.trackCTAClick('Start Exploring', 'final-cta');
    onExploreClick();
  };

  return (
    <section
      className="relative py-32 bg-gradient-to-b from-slate-50 to-white overflow-hidden"
      aria-label="Final call to action"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-100/40 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-emerald-50/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 leading-tight">
          Your next Rwandan experience is waiting.
        </h2>

        {/* Subheading */}
        <p className="text-xl sm:text-2xl text-slate-600 mb-12 leading-relaxed max-w-2xl mx-auto">
          Explore experiences, events, services and places to stay curated by local experts.
        </p>

        {/* Primary CTA */}
        <button
          onClick={handleClick}
          className="inline-flex items-center gap-3 px-10 py-5 text-lg font-bold text-white bg-emerald-800 rounded-2xl hover:bg-emerald-900 hover:scale-105 transition duration-300 shadow-xl shadow-emerald-800/40 group mb-8"
          aria-label="Start exploring Rwanda"
        >
          Start Exploring
          <ArrowRight className="w-6 h-6 transition group-hover:translate-x-1" />
        </button>

        {/* Secondary text */}
        <p className="text-sm text-slate-500">
          No credit card required. Join thousands of travelers discovering Rwanda.
        </p>

        {/* Trust badges */}
        <div className="mt-16 pt-16 border-t border-slate-200">
          <p className="text-xs text-slate-500 uppercase tracking-[0.1em] font-bold mb-8">
            Trusted by
          </p>
          <div className="flex flex-wrap gap-8 items-center justify-center opacity-60">
            {['Secure Payments', 'Verified Hosts', 'Trusted Platform'].map((item) => (
              <div key={item} className="flex items-center gap-2">
                <svg className="w-4 h-4 text-emerald-700" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-sm font-medium text-slate-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
