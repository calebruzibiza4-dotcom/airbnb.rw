'use client';

import { useEffect } from 'react';
import { Home, Sparkles, PartyPopper, Briefcase, Hotel, ArrowRight } from 'lucide-react';
import { landingAnalytics } from '../../utils/analytics';

interface Category {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  color: string;
}

export default function CategorySection() {
  useEffect(() => {
    landingAnalytics.trackSectionImpression('category-discovery');
  }, []);

  const categories: Category[] = [
    {
      id: 'experiences',
      label: 'Experiences',
      description: 'Unique activities and adventures',
      icon: <Sparkles className="w-8 h-8" />,
      href: '?category=experiences',
      color: 'from-purple-500 to-indigo-600',
    },
    {
      id: 'events',
      label: 'Events',
      description: 'Concerts, festivals and gatherings',
      icon: <PartyPopper className="w-8 h-8" />,
      href: '?category=events',
      color: 'from-pink-500 to-rose-600',
    },
    {
      id: 'services',
      label: 'Services',
      description: 'Support for your journey',
      icon: <Briefcase className="w-8 h-8" />,
      href: '?category=services',
      color: 'from-amber-500 to-orange-600',
    },
    {
      id: 'stays',
      label: 'Stays',
      description: 'Hotels, apartments and lodges',
      icon: <Hotel className="w-8 h-8" />,
      href: '?category=stays',
      color: 'from-cyan-500 to-blue-600',
    },
  ];

  const handleCategoryClick = (categoryName: string) => {
    landingAnalytics.trackCategoryClick(categoryName);
  };

  return (
    <section
      className="relative py-24 bg-gradient-to-b from-white via-slate-50 to-white"
      aria-label="Explore categories"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-[0.14em] mb-4">
            Categories
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Explore Rwanda
          </h2>
          <p className="text-lg text-slate-600">
            Browse by type and discover what speaks to you
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <a
              key={category.id}
              href={category.href}
              onClick={() => handleCategoryClick(category.label)}
              className="group relative overflow-hidden rounded-2xl h-64 transition duration-300 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-300"
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-90 group-hover:opacity-100 transition duration-300`}
              />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-6 text-white z-10">
                <div>
                  <div className="p-3 w-fit rounded-xl bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition duration-300 mb-4">
                    {category.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{category.label}</h3>
                  <p className="text-sm text-white/80">{category.description}</p>
                </div>

                {/* Arrow indicator */}
                <div className="flex items-center gap-2 text-sm font-semibold opacity-0 group-hover:opacity-100 transition duration-300 translate-y-2 group-hover:translate-y-0">
                  Explore
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute inset-0 bg-white/0 group-hover:bg-white/10 transition duration-300 z-0" />
            </a>
          ))}
        </div>

        {/* View all CTA */}
        <div className="mt-12 text-center">
          <a
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 text-emerald-800 font-bold rounded-2xl border-2 border-emerald-200 hover:border-emerald-300 hover:bg-emerald-50 transition duration-300"
          >
            View all categories
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
