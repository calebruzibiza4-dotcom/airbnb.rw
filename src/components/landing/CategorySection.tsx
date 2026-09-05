'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { landingAnalytics } from '../../utils/analytics';

interface Category {
  id: string;
  label: string;
  description: string;
  href: string;
}

const categories: Category[] = [
  {
    id: 'stays',
    label: 'Stays',
    description: 'Hotels, lodges and private apartments',
    href: '/?view=browse&category=stays',
  },
  {
    id: 'experiences',
    label: 'Experiences',
    description: 'Guided activities and local adventures',
    href: '/?view=browse&category=experiences',
  },
  {
    id: 'events',
    label: 'Events',
    description: 'Concerts, festivals and gatherings',
    href: '/?view=browse&category=events',
  },
  {
    id: 'services',
    label: 'Services',
    description: 'Transport, guides and travel support',
    href: '/?view=browse&category=services',
  },
];

export default function CategorySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    landingAnalytics.trackSectionImpression('category-discovery');
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream py-24 border-t border-charcoal-900/8"
      aria-label="Explore categories"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal-200 mb-5">
              <motion.span
                className="block h-px bg-brand"
                initial={reduce ? false : { width: 0 }}
                animate={inView ? { width: 32 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              />
              Categories
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={reduce ? false : { y: '105%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-3xl font-800 tracking-tightest text-charcoal-900 sm:text-4xl lg:text-5xl"
              >
                Explore Rwanda
              </motion.h2>
            </div>
          </div>
          <motion.p
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="text-sm text-charcoal-200 max-w-xs"
          >
            Browse by type and discover what speaks to you.
          </motion.p>
        </div>

        {/* Category grid: 2x2 on mobile, 4-col on desktop */}
        <div className="grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {categories.map((cat, i) => (
            <motion.a
              key={cat.id}
              href={cat.href}
              onClick={() => landingAnalytics.trackCategoryClick(cat.label)}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.65, delay: 0.15 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduce ? {} : { y: -4 }}
              className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-charcoal-900/8 bg-white p-6 sm:p-7 transition-shadow duration-300 hover:shadow-elevated hover:border-charcoal-900/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-cream min-h-[180px]"
              aria-label={`Explore ${cat.label}`}
            >
              {/* Category label */}
              <div>
                <h3 className="font-display text-xl font-700 tracking-tight text-charcoal-900 mb-2">
                  {cat.label}
                </h3>
                <p className="text-[0.8rem] leading-6 text-charcoal-200">
                  {cat.description}
                </p>
              </div>

              {/* Arrow: transitions on hover */}
              <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-charcoal-900 transition-transform duration-200 group-hover:translate-x-1">
                Browse
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" aria-hidden="true" />
            </motion.a>
          ))}
        </div>

        {/* Browse all: text link */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5, ease: 'easeOut' }}
          className="mt-10 text-center"
        >
          <a
            href="/?view=browse"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal-900 underline underline-offset-4 decoration-charcoal-900/25 hover:decoration-charcoal-900 transition-all duration-200"
          >
            Browse all listings
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
