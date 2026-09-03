'use client';

import { useEffect, useState } from 'react';
import { ArrowRight, Briefcase, Car, Plane, ShoppingBag } from 'lucide-react';
import { landingAnalytics } from '../../utils/analytics';

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  examples: string[];
}

export default function FeaturedServices() {
  useEffect(() => {
    landingAnalytics.trackSectionImpression('featured-services');
  }, []);

  const services: Service[] = [
    {
      id: 'transport',
      title: 'Transport & Logistics',
      description: 'Professional transportation services for travelers and groups',
      icon: <Car className="w-8 h-8" />,
      examples: ['Car rental', 'Driver services', 'Airport transfers'],
    },
    {
      id: 'travel',
      title: 'Travel Services',
      description: 'Tour guides, travel planning, and curated itineraries',
      icon: <Plane className="w-8 h-8" />,
      examples: ['Tour guides', 'Travel planning', 'Visa assistance'],
    },
    {
      id: 'lifestyle',
      title: 'Lifestyle Services',
      description: 'Wellness, dining, and hospitality services',
      icon: <ShoppingBag className="w-8 h-8" />,
      examples: ['Spa & wellness', 'Fine dining', 'Shopping guides'],
    },
  ];

  const handleViewMore = () => {
    landingAnalytics.trackCategoryClick('services');
  };

  return (
    <section className="relative py-24 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-3xl mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-[0.14em] mb-4">
            Support
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Everything you need for your journey
          </h2>
          <p className="text-lg text-slate-600">
            Professional services to enhance your Rwanda experience
          </p>
        </div>

        {/* Services grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-8 rounded-2xl border border-slate-200 hover:border-emerald-300 hover:shadow-lg transition duration-300 group"
            >
              <div className="text-emerald-700 mb-4 group-hover:scale-110 transition duration-300">
                {service.icon}
              </div>

              <h3 className="text-2xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 mb-6">{service.description}</p>

              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.1em]">
                  Examples:
                </p>
                <ul className="space-y-2">
                  {service.examples.map((example, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-slate-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-700" />
                      {example}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="/?category=services"
            onClick={handleViewMore}
            className="inline-flex items-center gap-2 px-8 py-4 bg-emerald-800 text-white font-bold rounded-2xl hover:bg-emerald-900 hover:scale-105 transition duration-300 shadow-lg shadow-emerald-800/30"
          >
            Explore all services
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
