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
        <div className="grid items-center gap-12 lg:grid-cols-1 lg:gap-10">
          <motion.div
            initial={reveal.initial}
            animate={reveal.animate}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center text-center"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-emerald-700/20 bg-white/70 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.2em] text-emerald-900 backdrop-blur-sm">
                Rwanda marketplace
              </span>
            </div>

            <div className="space-y-5">
              <h1 className="mx-auto max-w-5xl text-5xl font-semibold leading-[0.9] tracking-[-0.08em] text-slate-900 sm:text-6xl lg:text-[6.5rem]">
                Discover Rwanda, yourway.
              </h1>
            </div>

            <motion.p
              initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 26 }}
              animate={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
              className="mt-6 max-w-3xl text-base leading-7 text-slate-600 sm:text-lg"
            >
              Find unforgettable experiences, events, services and places to stay, all in one place.
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
