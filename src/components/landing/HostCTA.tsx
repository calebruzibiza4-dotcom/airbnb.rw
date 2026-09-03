'use client';

import { useEffect } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { landingAnalytics } from '../../utils/analytics';

interface HostCTAProps {
  onHostClick: () => void;
}

export default function HostCTA({ onHostClick }: HostCTAProps) {
  useEffect(() => {
    landingAnalytics.trackSectionImpression('host-cta');
  }, []);

  const handleClick = () => {
    landingAnalytics.trackHostSignup();
    onHostClick();
  };

  return (
    <section
      className="relative py-24 bg-gradient-to-r from-emerald-50 via-white to-emerald-50 border-y border-slate-200"
      aria-label="Become a host"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-[0.14em] mb-6">
                <Sparkles className="w-4 h-4" />
                Opportunity
              </span>
              <h2 className="text-5xl sm:text-6xl font-bold text-slate-900 leading-tight mb-4">
                Have something worth sharing?
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Turn your experience, event, service or accommodation into an opportunity to connect with people exploring Rwanda. Earn income while sharing your passion.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-4">
              {[
                'Low commission rates and quick payouts',
                'Full support and host resources',
                'Marketing assistance and exposure',
                'Dedicated host community',
              ].map((benefit, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-emerald-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="text-slate-700 font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={handleClick}
              className="inline-flex items-center gap-3 px-8 py-4 bg-emerald-800 text-white font-bold rounded-2xl hover:bg-emerald-900 hover:scale-105 transition duration-300 shadow-lg shadow-emerald-800/30 group"
            >
              Become a Host
              <ArrowRight className="w-5 h-5 transition group-hover:translate-x-1" />
            </button>
          </div>

          {/* Right: Visual */}
          <div className="relative h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-600 to-emerald-800 shadow-2xl">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg className="w-full h-full" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <circle cx="100" cy="100" r="80" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
                <circle cx="300" cy="300" r="100" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
                <rect x="50" y="250" width="300" height="100" stroke="rgba(255,255,255,0.1)" strokeWidth="2" fill="none" />
              </svg>
            </div>

            {/* Content overlay */}
            <div className="relative h-full flex flex-col justify-end p-8 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent text-white">
              <p className="text-emerald-300 text-sm font-semibold mb-2">Join our community</p>
              <h3 className="text-3xl font-bold mb-3">Earn on your terms</h3>
              <p className="text-emerald-100 mb-6">Share your expertise and create income while helping others discover Rwanda</p>
              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-10 w-10 rounded-full bg-emerald-500/30 border border-emerald-400/50 flex items-center justify-center text-xs font-bold"
                  >
                    +
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
