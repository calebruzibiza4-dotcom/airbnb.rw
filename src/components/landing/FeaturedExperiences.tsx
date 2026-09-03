'use client';

import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ListingCard, { type PublicListing } from '../listings/ListingCard';
import { landingAnalytics } from '../../utils/analytics';

export default function FeaturedExperiences() {
  const [listings, setListings] = useState<PublicListing[]>([]);
  const [loading, setLoading] = useState(true);

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
    } catch (error) {
      console.error('Failed to fetch featured experiences:', error);
      // Use mock data for development
      setListings(mockExperiences);
    } finally {
      setLoading(false);
    }
  };

  const handleViewMore = () => {
    landingAnalytics.trackCategoryClick('experiences');
  };

  return (
    <section className="relative py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex items-end justify-between mb-12">
          <div className="flex-1">
            <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-[0.14em] mb-4">
              Featured
            </span>
            <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">
              Experience Rwanda
            </h2>
            <p className="text-lg text-slate-600 mt-4 max-w-lg">
              Discover unforgettable activities and immersive experiences led by local experts
            </p>
          </div>

          <a
            href="/?category=experiences"
            onClick={handleViewMore}
            className="hidden sm:flex items-center gap-2 text-emerald-800 font-bold hover:text-emerald-900 transition duration-300 group whitespace-nowrap"
          >
            View all experiences
            <ArrowRight className="w-4 h-4 transition group-hover:translate-x-1" />
          </a>
        </div>

        {/* Listings grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {loading ? (
            // Loading skeletons
            Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="aspect-[4/3] bg-slate-200 rounded-2xl mb-4" />
                <div className="space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 rounded w-1/2" />
                </div>
              </div>
            ))
          ) : listings.length > 0 ? (
            listings.map((listing) => (
              <div key={listing.id} onClick={() => landingAnalytics.trackListingClick(listing.id, listing.title)}>
                <ListingCard listing={listing} />
              </div>
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-slate-600">No experiences available yet. Check back soon!</p>
            </div>
          )}
        </div>

        {/* Mobile CTA */}
        <div className="mt-12 sm:hidden text-center">
          <a
            href="/?category=experiences"
            onClick={handleViewMore}
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-800 text-white font-bold rounded-2xl hover:bg-emerald-900 transition duration-300"
          >
            View all experiences
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}

// Mock data for development
const mockExperiences: PublicListing[] = [
  {
    id: '1',
    title: 'Gorilla Trekking in Volcanoes National Park',
    description: 'Experience the majesty of mountain gorillas in their natural habitat',
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
    title: 'Coffee Farm Tour & Tasting',
    description: 'Learn about Rwanda\'s famous coffee and taste freshly roasted beans',
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
    description: 'Paddle across stunning Lake Kivu with breathtaking mountain views',
    listingType: 'Experience',
    category: 'Adventure',
    location: 'Lake Kivu',
    address: 'Karongi, Rwanda',
    images: [],
    price: 60,
    currency: 'USD',
  },
];
