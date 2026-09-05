'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { landingAnalytics } from '../../utils/analytics';

interface FinalCTAProps {
  onExploreClick: () => void;
}

export default function FinalCTA({ onExploreClick }: FinalCTAProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end end'],
  });
  const glowScale = useTransform(scrollYProgress, [0, 1], [0.75, 1.2]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.8], [0.2, 1]);
  const contentY = useTransform(scrollYProgress, [0, 1], ['25px', '0px']);

  useEffect(() => {
    landingAnalytics.trackSectionImpression('final-cta');
  }, []);

  const handleClick = () => {
    landingAnalytics.trackCTAClick('Start Exploring', 'final-cta');
    onExploreClick();
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-charcoal-900 py-36 overflow-hidden"
      aria-label="Call to action"
    >
      {/* Subtle radial accent with scroll-linked glow expansion */}
      <motion.div
        className="pointer-events-none absolute inset-0 origin-bottom"
        style={reduce ? {} : { scale: glowScale, opacity: glowOpacity }}
        aria-hidden="true"
      >
        <div
          className="w-full h-full"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 110%, rgba(10,124,92,0.18) 0%, transparent 70%)',
          }}
        />
      </motion.div>

      <motion.div
        style={reduce ? {} : { y: contentY }}
        className="relative z-10 mx-auto max-w-4xl px-6 lg:px-8 text-center"
      >

        <div>
          <div className="inline-flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-8">
            <motion.span
              className="block h-px bg-brand"
              initial={reduce ? false : { width: 0 }}
              animate={inView ? { width: 32 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />
            Ready
            <motion.span
              className="block h-px bg-brand"
              initial={reduce ? false : { width: 0 }}
              animate={inView ? { width: 32 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />
          </div>

          <div className="overflow-hidden mb-10">
            <motion.h2
              initial={reduce ? false : { y: '105%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-5xl font-800 leading-[0.92] tracking-tightest text-white sm:text-6xl lg:text-7xl text-balance"
            >
              Your next Rwanda experience is waiting.
            </motion.h2>
          </div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-base leading-7 text-white/50 mb-12 max-w-lg mx-auto"
          >
            Stays, experiences, events and services curated by people who love Rwanda.
          </motion.p>

          {/* Primary CTA: brand green for differentiation on dark bg */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button
              onClick={handleClick}
              whileHover={reduce ? {} : { y: -2, boxShadow: '0 20px 45px rgba(10,124,92,0.4)' }}
              whileTap={reduce ? {} : { scale: 0.97 }}
              className="inline-flex items-center gap-2.5 rounded-xl bg-brand px-8 py-4 text-base font-semibold text-white transition-colors hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900"
              aria-label="Start exploring Rwanda"
            >
              Start Exploring
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
