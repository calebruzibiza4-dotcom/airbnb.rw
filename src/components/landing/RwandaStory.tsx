'use client';

import { useEffect } from 'react';
import { landingAnalytics } from '../../utils/analytics';

export default function RwandaStory() {
  useEffect(() => {
    landingAnalytics.trackSectionImpression('rwanda-story');
  }, []);

  return (
    <section
      className="relative py-32 bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white overflow-hidden"
      aria-label="Rwanda story"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 300 Q360 100 720 300 T1440 300 L1440 600 L0 600 Z" fill="rgba(255,255,255,0.05)" />
          <path d="M0 250 Q360 50 720 250 T1440 250 L1440 600 L0 600 Z" fill="rgba(255,255,255,0.05)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-8">
            <div>
              <span className="inline-block px-4 py-2 rounded-full bg-emerald-700/40 border border-emerald-500/40 text-emerald-200 text-xs font-bold uppercase tracking-[0.14em] mb-6">
                Discover
              </span>
              <h2 className="text-5xl sm:text-6xl font-bold leading-tight mb-4">
                More than a destination.
              </h2>
              <p className="text-lg text-emerald-100 leading-relaxed">
                Rwanda isn't just a place to visit—it's an experience to live. Through INZU STAY, you'll discover the true heart of Rwanda through authentic connections with local hosts, expert guides, and vibrant communities.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40">
                    <svg className="h-6 w-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Local authenticity</h3>
                  <p className="text-emerald-100">Experiences crafted by people who know Rwanda best</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40">
                    <svg className="h-6 w-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Community impact</h3>
                  <p className="text-emerald-100">Support local entrepreneurs and sustainable tourism</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40">
                    <svg className="h-6 w-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold mb-1">Memories made</h3>
                  <p className="text-emerald-100">Create unforgettable stories and meaningful connections</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative h-96 md:h-full min-h-96 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-emerald-500/10 to-transparent" />
            <svg
              className="w-full h-full"
              viewBox="0 0 400 500"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              {/* Mountain illustration */}
              <path d="M50 300 L150 100 L250 200 L350 120 L400 300" stroke="rgba(255,255,255,0.2)" strokeWidth="2" fill="none" />
              <path d="M0 200 L100 50 L200 150 L300 80 L400 200 L400 500 L0 500 Z" fill="rgba(16,185,129,0.1)" />
              
              {/* Decorative elements */}
              <circle cx="100" cy="80" r="4" fill="rgba(255,255,255,0.3)" />
              <circle cx="280" cy="120" r="3" fill="rgba(255,255,255,0.2)" />
              <circle cx="180" cy="40" r="3" fill="rgba(255,255,255,0.25)" />
            </svg>

            {/* Text overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-8 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent">
              <p className="text-emerald-200 text-sm font-semibold mb-2">Welcome to Rwanda</p>
              <h3 className="text-2xl font-bold text-white">The land of a thousand hills</h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
