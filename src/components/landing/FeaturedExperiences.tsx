'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import ListingCard, { type PublicListing } from '../listings/ListingCard';
import { landingAnalytics } from '../../utils/analytics';

export default function FeaturedExperiences() {
  const [listings, setListings] = useState<PublicListing[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    landingAnalytics.trackSectionImpression('featured-experiences');
    fetchFeaturedListings();
  }, []);

  const fetchFeaturedListings = async () => {
    try {
      const response = await fetch('/api/listings?category=experiences&limit=3');
      if (response.ok) {
        const data = await response.json();
        setListings(data.listings || []);
      }
    } catch {
      setListings(mockExperiences);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-cream py-24 border-t border-charcoal-900/8"
      aria-label="Featured experiences"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal-200 mb-4">
              <motion.span
                className="block h-px bg-brand"
                initial={reduce ? false : { width: 0 }}
                animate={inView ? { width: 32 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              />
              Featured
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={reduce ? false : { y: '105%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-3xl font-800 tracking-tightest text-charcoal-900 sm:text-4xl"
              >
                Experience Rwanda
              </motion.h2>
            </div>
          </div>
          <motion.a
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            href="/?view=browse&category=experiences"
            onClick={() => landingAnalytics.trackCategoryClick('experiences')}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal-900 underline underline-offset-4 decoration-charcoal-900/25 hover:decoration-charcoal-900 transition-all duration-200 whitespace-nowrap"
          >
            View all
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-xl bg-white overflow-hidden border border-charcoal-900/8">
                  <div className="aspect-[4/3] bg-charcoal-100" />
                  <div className="p-5 space-y-2.5">
                    <div className="h-4 bg-charcoal-100 rounded w-3/4" />
                    <div className="h-3 bg-charcoal-100 rounded w-1/2" />
                  </div>
                </div>
              ))
            : listings.length > 0
            ? listings.map((listing, i) => (
                <motion.div
                  key={listing.id}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  onClick={() => landingAnalytics.trackListingClick(listing.id, listing.title)}
                >
                  <ListingCard listing={listing} />
                </motion.div>
              ))
            : (
              <div className="col-span-full py-12 text-center text-sm text-charcoal-200">
                No experiences available yet. Check back soon.
              </div>
            )
          }
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 sm:hidden text-center">
          <a
            href="/?view=browse&category=experiences"
            onClick={() => landingAnalytics.trackCategoryClick('experiences')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-charcoal-900 underline underline-offset-4 decoration-charcoal-900/25 hover:decoration-charcoal-900 transition-all duration-200"
          >
            View all experiences
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

const mockExperiences: PublicListing[] = [
  {
    id: '1',
    title: 'Gorilla Trekking in Volcanoes National Park',
    description: 'Trek through lush rainforest to observe mountain gorillas in their natural habitat.',
    listingType: 'Experience',
    category: 'Adventure',
    location: 'Volcanoes National Park',
    address: 'Musanze, Rwanda',
    images: [],
    price: 750,
    currency: 'USD',
  },
  {
    id: '2',
    title: 'Coffee Farm Tour and Tasting',
    description: "Learn about Rwanda's award-winning coffee from bean to cup with a local farmer.",
    listingType: 'Experience',
    category: 'Culture',
    location: 'Southern Province',
    address: 'Huye, Rwanda',
    images: [],
    price: 45,
    currency: 'USD',
  },
  {
    id: '3',
    title: 'Kayaking on Lake Kivu',
    description: 'Paddle across the stunning lake with breathtaking views of the surrounding hills.',
    listingType: 'Experience',
    category: 'Adventure',
    location: 'Lake Kivu',
    address: 'Karongi, Rwanda',
    images: [],
    price: 60,
    currency: 'USD',
  },
];
