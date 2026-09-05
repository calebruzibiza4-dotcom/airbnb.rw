'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { landingAnalytics } from '../../utils/analytics';

const steps = [
  {
    number: '01',
    title: 'Browse',
    description:
      'Search stays, experiences, events or services. Filter by location, date or category to find exactly what fits.',
  },
  {
    number: '02',
    title: 'Book',
    description:
      'Select your dates and preferences. Confirm your booking securely, with no hidden fees and no surprises.',
  },
  {
    number: '03',
    title: 'Experience',
    description:
      'Arrive and let local hosts take care of the rest. Every listing is crafted by someone who knows Rwanda.',
  },
];

/** Clip-path curtain reveal */
function RevealHeading({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={reduce ? false : { y: '105%' }}
        animate={inView ? { y: '0%' } : {}}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();

  const { scrollYProgress: stepsProgress } = useScroll({
    target: stepsContainerRef,
    offset: ['start 75%', 'end 55%'],
  });
  const lineHeight = useTransform(stepsProgress, [0, 1], ['0%', '100%']);

  useEffect(() => {
    landingAnalytics.trackSectionImpression('how-it-works');
  }, []);

  return (
    <section ref={sectionRef} className="relative py-28 bg-charcoal-900" aria-label="How it works">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-6">
            <motion.span
              className="block h-px bg-brand"
              initial={reduce ? false : { width: 0 }}
              animate={inView ? { width: 32 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />
            Simple
          </div>
          <RevealHeading delay={0.15}>
            <h2 className="font-display text-4xl font-800 leading-tight tracking-tightest text-white sm:text-5xl lg:text-6xl text-balance">
              Three steps to your next Rwanda experience.
            </h2>
          </RevealHeading>
        </div>

        {/* Steps with scroll-driven timeline line */}
        <div ref={stepsContainerRef} className="relative pl-6 sm:pl-8">
          {/* Background vertical track */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" aria-hidden="true" />
          {/* Animated active scroll track */}
          <motion.div
            style={reduce ? {} : { height: lineHeight }}
            className="absolute left-0 top-0 w-px bg-brand origin-top"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={reduce ? false : { opacity: 0, x: -24 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid grid-cols-[3rem_1fr] gap-6 py-10 sm:grid-cols-[4.5rem_1fr] lg:grid-cols-[8rem_1fr_0.5fr] items-start border-t border-white/8"
            >
              <div className="flex items-start">
                <span className="font-display text-sm font-600 text-white/30 tracking-[0.15em]">
                  {step.number}
                </span>
              </div>
              <div>
                <h3 className="font-display text-2xl font-700 text-white tracking-tight mb-3 sm:text-3xl">
                  {step.title}
                </h3>
                <p className="text-[0.9rem] leading-7 text-white/55 max-w-md">
                  {step.description}
                </p>
              </div>
              <div className="hidden lg:flex items-start justify-end">
                <motion.span
                  className="inline-flex h-2 w-2 rounded-full bg-brand mt-3"
                  initial={reduce ? false : { scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.15, ease: 'backOut' }}
                  aria-hidden="true"
                />
              </div>
            </motion.div>
          ))}
          <div className="border-t border-white/8" aria-hidden="true" />
        </div>

        {/* CTA */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14"
        >
          <motion.a
            href="/?view=browse"
            whileHover={reduce ? {} : { y: -2, boxShadow: '0 12px 32px rgba(10,124,92,0.35)' }}
            whileTap={reduce ? {} : { scale: 0.97 }}
            onClick={() => landingAnalytics.trackCTAClick('Get Started', 'how-it-works')}
            className="inline-flex items-center gap-2.5 rounded-xl bg-brand px-7 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-charcoal-900"
          >
            Get Started
            <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
