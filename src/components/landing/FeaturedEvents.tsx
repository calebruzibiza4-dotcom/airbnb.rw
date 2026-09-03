'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
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
    } catch (error) {
      console.error('Failed to fetch events:', error);
      setEvents(mockEvents);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMore = () => {
    landingAnalytics.trackCategoryClick('events');
  };

  return (
    <section className="relative py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div className="flex-1">
            <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-[0.14em] mb-4">
              Upcoming
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">
              What's happening in Rwanda
            </h2>
            <p className="text-lg text-slate-600 mt-4 max-w-lg">
              From concerts to cultural festivals, discover events happening now
            </p>
          </div>

          <a
            href="/?category=events"
            onClick={handleViewMore}
            className="hidden sm:flex items-center gap-2 text-emerald-800 font-bold hover:text-emerald-900 transition duration-300 group whitespace-nowrap"
          >
            View all events
            <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
          </a>
        </div>

        {/* Events grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-video bg-slate-200 rounded-2xl mb-4" />
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                </div>
              </div>
            ))
          ) : events.length > 0 ? (
            events.map((event) => (
              <a
                key={event.id}
                href={`/events/${event.id}`}
                onClick={() => landingAnalytics.trackListingClick(event.id, event.title)}
                className="group block rounded-2xl overflow-hidden border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition duration-300"
              >
                {/* Event image */}
                <div className="relative aspect-video bg-gradient-to-br from-emerald-400 to-emerald-600 overflow-hidden">
                  {event.image ? (
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Calendar className="w-8 h-8 text-white opacity-50" />
                    </div>
                  )}
                  <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/90 text-emerald-800 text-xs font-bold">
                    Coming soon
                  </span>
                </div>

                {/* Event details */}
                <div className="p-6">
                  <h3 className="font-bold text-lg text-slate-900 line-clamp-2 mb-3 group-hover:text-emerald-700 transition">
                    {event.title}
                  </h3>

                  <div className="space-y-2 text-sm text-slate-600">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-emerald-700 shrink-0" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-slate-200 flex items-center justify-between">
                    <div className="font-bold text-slate-900">{event.price ? `$${event.price}` : 'Free'}</div>
                    <span className="text-emerald-700 text-sm font-semibold group-hover:translate-x-1 transition inline-block">
                      →
                    </span>
                  </div>
                </div>
              </a>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-600">No events scheduled yet. Check back soon!</p>
            </div>
          )}
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 sm:hidden text-center">
          <a
            href="/?category=events"
            onClick={handleViewMore}
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-800 text-white font-bold rounded-2xl hover:bg-emerald-900 transition duration-300"
          >
            View all events
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Kigali Jazz Festival',
    date: 'September 15-17, 2024',
    location: 'Kigali Convention Centre',
    price: 25,
  },
  {
    id: '2',
    title: 'Rwanda Food & Wine Festival',
    date: 'October 5-7, 2024',
    location: 'Lake Kivu Serena',
    price: 50,
  },
  {
    id: '3',
    title: 'Kigali Cycling Festival',
    date: 'October 20-21, 2024',
    location: 'Downtown Kigali',
    price: 15,
  },
];
