'use client';

import { useEffect } from 'react';
import { Compass, MapPin, Users } from 'lucide-react';
import { landingAnalytics } from '../../utils/analytics';

interface ValueProp {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function ValueProposition() {
  useEffect(() => {
    landingAnalytics.trackSectionImpression('value-proposition');
  }, []);

  const propositions: ValueProp[] = [
    {
      icon: <Compass className="w-8 h-8" />,
      title: 'Discover',
      description: 'Find unique experiences, events, services and places to stay across Rwanda.',
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: 'Explore',
      description: 'Venture beyond the usual tourist routes and discover authentic Rwanda.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Connect',
      description: 'Meet local hosts, providers and organizers who love sharing Rwanda.',
    },
  ];

  return (
    <section
      className="relative py-24 bg-white border-t border-slate-100"
      aria-label="Why choose our platform"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="max-w-2xl mb-16">
          <span className="inline-block px-4 py-2 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-[0.14em] mb-4">
            Why Us
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900">
            Why choose INZU STAY
          </h2>
        </div>

        {/* Value propositions grid */}
        <div className="grid md:grid-cols-3 gap-12">
          {propositions.map((prop, index) => (
            <div
              key={index}
              className="flex flex-col space-y-4 p-8 rounded-2xl hover:bg-slate-50 transition duration-300 group"
            >
              <div className="text-emerald-700 group-hover:scale-110 transition duration-300">
                {prop.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-900">{prop.title}</h3>
              <p className="text-slate-600 leading-relaxed">{prop.description}</p>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="mt-20 pt-20 border-t border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-emerald-700 mb-2">2024</div>
              <p className="text-slate-600 text-sm">Founded</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-700 mb-2">12+</div>
              <p className="text-slate-600 text-sm">Districts</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-700 mb-2">100%</div>
              <p className="text-slate-600 text-sm">Secure</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-700 mb-2">24/7</div>
              <p className="text-slate-600 text-sm">Support</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
