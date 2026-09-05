'use client';

import { useEffect } from 'react';
import { landingAnalytics } from '../../utils/analytics';

const exploreLinks = [
  { label: 'Stays', href: '/?view=browse&category=stays' },
  { label: 'Experiences', href: '/?view=browse&category=experiences' },
  { label: 'Events', href: '/?view=browse&category=events' },
  { label: 'Services', href: '/?view=browse&category=services' },
];

const hostLinks = [
  { label: 'Become a Host', href: '/host/setup' },
  { label: 'Host Resources', href: '/host/resources' },
  { label: 'Manage Listings', href: '/host/listings' },
  { label: 'Payouts', href: '/host/payments' },
];

const companyLinks = [
  { label: 'About Us', href: '/about' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
  { label: 'Help', href: '/help' },
];

const legalLinks = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Cookie Policy', href: '/cookies' },
  { label: 'Accessibility', href: '/accessibility' },
];

const sections = [
  { title: 'Explore', links: exploreLinks },
  { title: 'For Hosts', links: hostLinks },
  { title: 'Company', links: companyLinks },
  { title: 'Legal', links: legalLinks },
];

export default function Footer() {
  useEffect(() => {
    landingAnalytics.trackSectionImpression('footer');
  }, []);

  const track = (label: string) =>
    landingAnalytics.trackEvent('navigation', 'footer_link_click', label);

  return (
    <footer className="bg-charcoal-900 border-t border-white/6" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Main grid */}
        <div className="grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <a
              href="/"
              className="inline-flex items-center gap-2.5 mb-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-lg"
              aria-label="INZU STAY homepage"
            >
              <span className="grid h-7 w-7 place-items-center rounded-lg bg-cream text-charcoal-900" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 18 9.5 6h5L19 18" />
                  <path d="M7 14h10" />
                </svg>
              </span>
              <span className="font-display text-sm font-700 tracking-[0.18em] text-cream uppercase">
                INZU STAY
              </span>
            </a>

            <p className="text-sm leading-6 text-white/40 max-w-[220px]">
              Discover Rwanda through authentic experiences and local connections.
            </p>
          </div>

          {/* Link columns */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/30 mb-5">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => track(link.label)}
                      className="text-sm text-white/50 hover:text-white transition-colors duration-200 focus-visible:outline-none focus-visible:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/6 py-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} INZU STAY. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-5">
            {legalLinks.slice(0, 2).map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => track(link.label)}
                className="text-xs text-white/30 hover:text-white/60 transition-colors duration-200 focus-visible:outline-none focus-visible:text-white/60"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
