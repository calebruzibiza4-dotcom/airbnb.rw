'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { landingAnalytics } from '../../utils/analytics';

const features = [
  {
    title: 'Local authenticity',
    description: 'Every experience is designed by people who know Rwanda, not algorithms.',
  },
  {
    title: 'Community impact',
    description: 'Your bookings directly support local entrepreneurs and sustainable tourism.',
  },
  {
    title: 'Meaningful travel',
    description: 'Go beyond sightseeing. Leave with stories and connections that last.',
  },
];

export default function RwandaStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const paragraphY = useTransform(scrollYProgress, [0, 1], ['20px', '-20px']);

  useEffect(() => {
    landingAnalytics.trackSectionImpression('rwanda-story');
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream py-28 border-t border-charcoal-900/8"
      aria-label="About Rwanda"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Pull-quote row */}
        <div className="mb-20">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal-200 mb-6">
            <motion.span
              className="block h-px bg-brand"
              initial={reduce ? false : { width: 0 }}
              animate={inView ? { width: 32 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />
            Discover
          </div>

          <div className="overflow-hidden">
            <motion.h2
              initial={reduce ? false : { y: '105%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-4xl font-800 leading-[0.95] tracking-tightest text-charcoal-900 sm:text-5xl lg:text-[5rem] max-w-3xl text-balance"
            >
              Rwanda is more than a destination.
            </motion.h2>
          </div>
        </div>

        {/* Body and features */}
        <div className="grid gap-16 lg:grid-cols-[0.8fr_1fr] items-start">

          {/* Left: editorial paragraph */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            style={reduce ? {} : { y: paragraphY }}
          >
            <p className="text-base leading-8 text-charcoal-200 max-w-sm">
              Through INZU STAY, you access the true heart of Rwanda, guided by local hosts, expert guides and vibrant communities who want to share what they love most.
            </p>
          </motion.div>

          {/* Right: feature list */}
          <div className="space-y-0">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.65, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="border-t border-charcoal-900/8 py-8 grid grid-cols-[1.5rem_1fr] gap-5 items-start"
              >
                {/* Marker */}
                <motion.span
                  className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0"
                  initial={reduce ? false : { scale: 0 }}
                  animate={inView ? { scale: 1 } : {}}
                  transition={{ duration: 0.4, delay: 0.35 + i * 0.12, ease: 'backOut' }}
                  aria-hidden="true"
                />

                <div>
                  <h3 className="font-display text-lg font-700 text-charcoal-900 tracking-tight mb-1.5">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-6 text-charcoal-200">
                    {feature.description}
                  </p>
                </div>
              </motion.div>
            ))}
            <div className="border-t border-charcoal-900/8" aria-hidden="true" />
          </div>

        </div>
      </div>
    </section>
  );
}
