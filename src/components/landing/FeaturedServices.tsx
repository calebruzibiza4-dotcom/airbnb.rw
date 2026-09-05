'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { landingAnalytics } from '../../utils/analytics';

const services = [
  {
    id: 'transport',
    title: 'Transport and Logistics',
    description: 'Professional transportation for travelers and groups across Rwanda.',
    examples: ['Car rental', 'Driver services', 'Airport transfers'],
  },
  {
    id: 'travel',
    title: 'Travel Services',
    description: 'Expert guides, travel planning and curated itineraries.',
    examples: ['Local tour guides', 'Trip planning', 'Visa assistance'],
  },
  {
    id: 'lifestyle',
    title: 'Lifestyle Services',
    description: 'Wellness, dining and hospitality services for a complete experience.',
    examples: ['Spa and wellness', 'Fine dining', 'Shopping guides'],
  },
];

export default function FeaturedServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    landingAnalytics.trackSectionImpression('featured-services');
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream py-24 border-t border-charcoal-900/8"
      aria-label="Services"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal-200 mb-5">
            <motion.span
              className="block h-px bg-brand"
              initial={reduce ? false : { width: 0 }}
              animate={inView ? { width: 32 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />
            Support
          </div>
          <div className="overflow-hidden">
            <motion.h2
              initial={reduce ? false : { y: '105%' }}
              animate={inView ? { y: '0%' } : {}}
              transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="font-display text-3xl font-800 tracking-tightest text-charcoal-900 sm:text-4xl lg:text-5xl max-w-xl text-balance"
            >
              Everything you need for your journey.
            </motion.h2>
          </div>
        </div>

        {/* Services grid */}
        <div className="grid gap-5 md:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col rounded-xl border border-charcoal-900/8 bg-white p-7 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-elevated hover:border-charcoal-900/15"
            >
              {/* Top rule in brand color */}
              <div className="mb-6 h-0.5 w-8 bg-brand" aria-hidden="true" />

              <h3 className="font-display text-lg font-700 text-charcoal-900 tracking-tight mb-2">
                {service.title}
              </h3>
              <p className="text-sm leading-6 text-charcoal-200 mb-6">
                {service.description}
              </p>

              {/* Example list */}
              <ul className="mt-auto space-y-2">
                {service.examples.map((ex) => (
                  <li key={ex} className="flex items-center gap-2.5 text-xs text-charcoal-900">
                    <span className="h-1 w-1 flex-shrink-0 rounded-full bg-brand" aria-hidden="true" />
                    {ex}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.45, ease: 'easeOut' }}
          className="mt-10"
        >
          <a
            href="/?view=browse&category=services"
            onClick={() => landingAnalytics.trackCategoryClick('services')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal-900 underline underline-offset-4 decoration-charcoal-900/25 hover:decoration-charcoal-900 transition-all duration-200"
          >
            Explore all services
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
