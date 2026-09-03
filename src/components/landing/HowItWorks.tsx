'use client';

import { useEffect } from 'react';
import { Compass, CheckCircle, Zap } from 'lucide-react';
import { landingAnalytics } from '../../utils/analytics';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export default function HowItWorks() {
  useEffect(() => {
    landingAnalytics.trackSectionImpression('how-it-works');
  }, []);

  const steps: Step[] = [
    {
      number: '01',
      title: 'Discover',
      description: 'Find an experience, event, service or place to stay that speaks to you',
      icon: <Compass className="w-8 h-8" />,
    },
    {
      number: '02',
      title: 'Choose',
      description: 'Select your dates, time, preferences and secure your booking',
      icon: <CheckCircle className="w-8 h-8" />,
    },
    {
      number: '03',
      title: 'Experience',
      description: 'Enjoy authentic Rwanda and create unforgettable memories',
      icon: <Zap className="w-8 h-8" />,
    },
  ];

  return (
    <section className="relative py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-[0.14em] mb-4">
            Simple
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            How it works
          </h2>
          <p className="text-lg text-slate-600">
            Getting started with INZU STAY is simple and straightforward
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div
                  className="hidden md:block absolute top-20 -right-6 lg:-right-8 w-12 lg:w-16 h-0.5 bg-gradient-to-r from-emerald-300 to-emerald-50"
                  aria-hidden="true"
                />
              )}

              {/* Step card */}
              <div className="relative z-10 flex flex-col h-full">
                {/* Step number badge */}
                <div className="mb-6 inline-block">
                  <div className="relative">
                    <div className="h-14 w-14 rounded-full bg-emerald-100 flex items-center justify-center">
                      <span className="text-2xl font-bold text-emerald-800">{step.number}</span>
                    </div>
                    <div className="absolute inset-0 rounded-full border-2 border-emerald-200 animate-pulse" />
                  </div>
                </div>

                {/* Icon */}
                <div className="mb-4 text-emerald-700">
                  {step.icon}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 pt-16 border-t border-slate-200 text-center">
          <p className="text-lg text-slate-600 mb-6">
            Ready to start your Rwanda adventure?
          </p>
          <a
            href="/"
            onClick={() => landingAnalytics.trackCTAClick('Get Started', 'how-it-works')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-800 text-white font-bold rounded-2xl hover:bg-emerald-900 hover:scale-105 transition duration-300 shadow-lg shadow-emerald-800/30"
          >
            Get Started
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
