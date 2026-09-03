'use client';

import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { landingAnalytics } from '../../utils/analytics';
import { getLandingConfig } from '../../utils/landingConfig';

interface HeroProps {
  onExploreClick: () => void;
  onHostClick: () => void;
}

export default function Hero({ onExploreClick, onHostClick }: HeroProps) {
  const config = getLandingConfig();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    landingAnalytics.trackSectionImpression('hero');
  }, []);

  const handleExploreClick = () => {
    landingAnalytics.trackCTAClick('Explore Rwanda', 'hero');
    onExploreClick();
  };

  const handleHostClick = () => {
    landingAnalytics.trackHostSignup();
    onHostClick();
  };

  const reveal = prefersReducedMotion
    ? { initial: { opacity: 1, y: 0 }, animate: { opacity: 1, y: 0 } }
    : {
        initial: { opacity: 0, y: 36 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <section
      className="relative min-h-screen w-full overflow-hidden bg-[#f4f1eb] text-slate-900"
      aria-label="Hero section"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-12%] top-[-10%] h-80 w-80 rounded-full bg-emerald-200/50 blur-3xl" />
        <div className="absolute bottom-[-12%] right-[-8%] h-[26rem] w-[26rem] rounded-full bg-emerald-100/60 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <motion.div
            initial={reveal.initial}
            animate={reveal.animate}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col justify-center"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-emerald-700/20 bg-white/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900 backdrop-blur-sm">
                Rwanda marketplace
              </span>
            </div>

            <div className="space-y-5">
              <h1 className="max-w-xl text-5xl font-semibold leading-[0.9] tracking-[-0.08em] text-slate-900 sm:text-6xl lg:text-[6.5rem]">
                {config.heroHeadline.split(' ').slice(0, 3).join(' ')}
                <span className="block text-emerald-900">{config.heroHeadline.split(' ').slice(3).join(' ') || 'your way.'}</span>
              </h1>
            </div>

            <motion.p
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
              animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
              className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg"
            >
              {config.heroSubheading}
            </motion.p>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.7, ease: 'easeOut' }}
              className="mt-8 flex flex-col gap-4 sm:flex-row"
            >
              <button
                onClick={handleExploreClick}
                className="group inline-flex items-center justify-center gap-3 rounded-full bg-emerald-800 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(6,78,59,0.25)] transition duration-300 hover:-translate-y-0.5 hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300 focus-visible:ring-offset-2"
                aria-label={`${config.primaryCTAText} - start exploring Rwanda`}
              >
                {config.primaryCTAText}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button
                onClick={handleHostClick}
                className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-7 py-3.5 text-sm font-semibold text-slate-900 transition duration-300 hover:-translate-y-0.5 hover:border-slate-400 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-slate-300 focus-visible:ring-offset-2"
                aria-label={config.secondaryCTAText}
              >
                {config.secondaryCTAText}
              </button>
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.7, ease: 'easeOut' }}
              className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-slate-200 pt-6"
            >
              {[
                { value: '500+', label: 'Experiences' },
                { value: '1k+', label: 'Hosts' },
                { value: '4.9/5', label: 'Rated' },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-semibold tracking-[-0.06em] text-emerald-900">{stat.value}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 1.04, y: 30 }}
            animate={prefersReducedMotion ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.22, duration: 0.9, ease: 'easeOut' }}
            className="relative"
          >
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white p-3 shadow-[0_30px_100px_rgba(15,23,42,0.12)]">
              <div className="relative overflow-hidden rounded-[1.5rem]">
                <img
                  src="https://images.unsplash.com/photo-1521292270410-a8c4d716d518?auto=format&fit=crop&w=1200&q=80"
                  alt="Rwanda landscape with hills and greenery"
                  className="h-[520px] w-full object-cover object-center transition-transform duration-700 ease-out hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-slate-900/10 to-transparent" />
              </div>

              <div className="absolute inset-x-8 bottom-8 rounded-[1.5rem] bg-white/90 p-4 shadow-[0_10px_25px_rgba(15,23,42,0.08)] backdrop-blur-sm sm:inset-x-10 sm:p-5">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-800">featured stay</div>
                    <h2 className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-900">Lake Kivu Escape</h2>
                  </div>
                  <div className="rounded-full bg-emerald-900 px-3 py-1.5 text-xs font-semibold text-white">From $120</div>
                </div>
              </div>
            </div>

            <motion.div
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, x: 20, y: 20 }}
              animate={prefersReducedMotion ? { opacity: 1, x: 0, y: 0 } : { opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.45, duration: 0.8 }}
              className="absolute -bottom-6 -left-6 rounded-[1.25rem] border border-slate-200 bg-white/90 p-4 shadow-[0_20px_35px_rgba(15,23,42,0.08)] backdrop-blur-sm"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-800">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
                    <path d="M12 21s-6.7-4.35-9.5-8.56C.84 9.72 2.9 4.5 7.7 4.5c2.14 0 3.15 1.14 4.3 2.64C13.15 5.64 14.16 4.5 16.3 4.5c4.8 0 6.86 5.22 5.2 7.94C18.7 16.65 12 21 12 21Z" />
                  </svg>
                </div>
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">trusted by</div>
                  <div className="text-sm font-semibold text-slate-900">Local hosts</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-[pulse_2s_ease-in-out_infinite]">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300/60 bg-white/60 text-emerald-900 backdrop-blur-sm">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0 6-6m-6 6-6-6" />
          </svg>
        </div>
      </div>
    </section>
  );
}
