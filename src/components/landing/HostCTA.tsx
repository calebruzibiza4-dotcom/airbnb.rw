'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { landingAnalytics } from '../../utils/analytics';

interface HostCTAProps {
  onHostClick: () => void;
}

const benefits = [
  'Low commission rates with fast, transparent payouts',
  'Dedicated host support and onboarding resources',
  'Exposure to travelers actively planning their Rwanda trip',
  'Full control over your listing, pricing and availability',
];

export default function HostCTA({ onHostClick }: HostCTAProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const cardParallaxY = useTransform(scrollYProgress, [0, 1], ['30px', '-30px']);

  useEffect(() => {
    landingAnalytics.trackSectionImpression('host-cta');
  }, []);

  const handleClick = () => {
    landingAnalytics.trackHostSignup();
    onHostClick();
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream py-24 border-t border-charcoal-900/8"
      aria-label="Become a host"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">

          {/* Left: Copy */}
          <div className="flex flex-col">
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal-200 mb-6">
              <motion.span
                className="block h-px bg-brand"
                initial={reduce ? false : { width: 0 }}
                animate={inView ? { width: 32 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              />
              For Hosts
            </div>

            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={reduce ? false : { y: '105%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-4xl font-800 leading-tight tracking-tightest text-charcoal-900 sm:text-5xl lg:text-6xl text-balance"
              >
                Have something worth sharing?
              </motion.h2>
            </div>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="text-base leading-7 text-charcoal-200 mb-10 max-w-md"
            >
              Turn your place, expertise or event into an opportunity. Earn income while helping travelers discover the real Rwanda.
            </motion.p>

            {/* Benefits: plain list, no icons */}
            <ul className="mb-10 space-y-3" aria-label="Host benefits">
              {benefits.map((benefit, i) => (
                <motion.li
                  key={benefit}
                  initial={reduce ? false : { opacity: 0, x: -12 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3 text-sm text-charcoal-900"
                >
                  <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {benefit}
                </motion.li>
              ))}
            </ul>

            {/* CTA: solid, high contrast */}
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.button
                onClick={handleClick}
                whileHover={reduce ? {} : { y: -2, boxShadow: '0 20px 40px rgba(0,0,0,0.18)' }}
                whileTap={reduce ? {} : { scale: 0.97 }}
                className="inline-flex items-center gap-2.5 rounded-xl bg-charcoal-900 px-7 py-3.5 text-sm font-semibold text-cream transition-colors hover:bg-charcoal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-900 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
              >
                Become a Host
                <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </motion.button>
            </motion.div>
          </div>

          {/* Right: Abstract card */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={reduce ? {} : { y: cardParallaxY }}
            className="relative hidden lg:block"
          >
            <div className="relative overflow-hidden rounded-2xl bg-charcoal-900 aspect-square">
              {/* Abstract grid */}
              <div aria-hidden="true" className="absolute inset-0">
                <svg className="h-full w-full opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="hostgrid" width="48" height="48" patternUnits="userSpaceOnUse">
                      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#hostgrid)" />
                </svg>
                {/* Brand accent */}
                <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-brand/15 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative flex h-full flex-col justify-between p-10">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/30">
                    Host on INZU STAY
                  </span>
                </div>

                <div>
                  <p
                    className="font-display text-[5rem] font-800 leading-none tracking-tightest text-white/[0.04] select-none"
                    aria-hidden="true"
                  >
                    Host
                  </p>
                  <div className="mt-6 h-px bg-white/10" aria-hidden="true" />
                  <p className="mt-4 text-sm text-white/40 max-w-xs leading-6">
                    Share your space, knowledge or event and earn income while connecting with travelers who care.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" aria-hidden="true" />
                  <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/30">
                    Rwanda
                  </span>
                  <div className="h-px flex-1 bg-white/10" aria-hidden="true" />
                </div>
              </div>

              {/* Accent dot */}
              <div className="absolute top-8 right-8 h-2.5 w-2.5 rounded-full bg-brand" aria-hidden="true" />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
