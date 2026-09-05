'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { landingAnalytics } from '../../utils/analytics';

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  price: number;
  image?: string;
}

export default function FeaturedEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    landingAnalytics.trackSectionImpression('featured-events');
    fetchFeaturedEvents();
  }, []);

  const fetchFeaturedEvents = async () => {
    try {
      const response = await fetch('/api/listings?category=events&limit=3');
      if (response.ok) {
        const data = await response.json();
        setEvents(data.listings || []);
      }
    } catch {
      setEvents(mockEvents);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative bg-charcoal-900 py-24"
      aria-label="Upcoming events"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-4">
              <motion.span
                className="block h-px bg-brand"
                initial={reduce ? false : { width: 0 }}
                animate={inView ? { width: 32 } : {}}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                aria-hidden="true"
              />
              Upcoming
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={reduce ? false : { y: '105%' }}
                animate={inView ? { y: '0%' } : {}}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-3xl font-800 tracking-tightest text-white sm:text-4xl"
              >
                What's happening in Rwanda
              </motion.h2>
            </div>
          </div>
          <motion.a
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            href="/?view=browse&category=events"
            onClick={() => landingAnalytics.trackCategoryClick('events')}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all duration-200 whitespace-nowrap"
          >
            View all events
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </motion.a>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="animate-pulse rounded-xl overflow-hidden border border-white/8">
                  <div className="aspect-video bg-white/5" />
                  <div className="p-5 space-y-2.5">
                    <div className="h-4 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/10 rounded w-1/2" />
                  </div>
                </div>
              ))
            : events.length > 0
            ? events.map((event, i) => (
                <motion.a
                  key={event.id}
                  href={`/events/${event.id}`}
                  onClick={() => landingAnalytics.trackListingClick(event.id, event.title)}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group block rounded-xl overflow-hidden border border-white/8 hover:border-white/20 transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                >
                  {/* Image / placeholder */}
                  <div className="relative aspect-video bg-charcoal-800 overflow-hidden">
                    {event.image ? (
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg className="h-8 w-8 text-white/15" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                        </svg>
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="p-5">
                    <h3 className="font-semibold text-white text-sm leading-6 mb-2 line-clamp-2 group-hover:text-brand transition-colors duration-200">
                      {event.title}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-white/40">
                      <span>{event.location}</span>
                      <span className="font-medium text-white/60">
                        {event.price ? `$${event.price}` : 'Free'}
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))
            : (
              <div className="col-span-full py-12 text-center text-sm text-white/30">
                No events scheduled yet. Check back soon.
              </div>
            )
          }
        </div>

        {/* Mobile CTA */}
        <div className="mt-10 sm:hidden text-center">
          <a
            href="/?view=browse&category=events"
            onClick={() => landingAnalytics.trackCategoryClick('events')}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-white/60 hover:text-white underline underline-offset-4 decoration-white/20 hover:decoration-white transition-all duration-200"
          >
            View all events
            <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}

const mockEvents: Event[] = [
  { id: '1', title: 'Kigali Jazz Festival', date: 'September 15-17, 2025', location: 'Kigali Convention Centre', price: 25 },
  { id: '2', title: 'Rwanda Food and Wine Festival', date: 'October 5-7, 2025', location: 'Lake Kivu Serena', price: 50 },
  { id: '3', title: 'Kigali Cycling Festival', date: 'October 20-21, 2025', location: 'Downtown Kigali', price: 15 },
];
