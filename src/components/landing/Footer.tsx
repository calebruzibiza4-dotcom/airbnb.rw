'use client';

import { useEffect } from 'react';
import { landingAnalytics } from '../../utils/analytics';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

export default function Footer() {
  useEffect(() => {
    landingAnalytics.trackSectionImpression('footer');
  }, []);

  const sections: FooterSection[] = [
    {
      title: 'Explore',
      links: [
        { label: 'Experiences', href: '/?category=experiences' },
        { label: 'Events', href: '/?category=events' },
        { label: 'Services', href: '/?category=services' },
        { label: 'Stays', href: '/?category=stays' },
      ],
    },
    {
      title: 'For Hosts',
      links: [
        { label: 'Become a Host', href: '/host/setup' },
        { label: 'Host Resources', href: '/host/resources' },
        { label: 'Manage Listings', href: '/host/listings' },
        { label: 'Commission & Payouts', href: '/host/payments' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About us', href: '/about' },
        { label: 'Contact', href: '/contact' },
        { label: 'Blog', href: '/blog' },
        { label: 'Help', href: '/help' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Cookie Policy', href: '/cookies' },
        { label: 'Accessibility', href: '/accessibility' },
      ],
    },
  ];

  const handleLinkClick = (label: string) => {
    landingAnalytics.trackEvent('navigation', 'footer_link_click', label);
  };

  return (
    <footer className="bg-slate-900 text-slate-200 border-t border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8 py-16">
          {/* Brand section */}
          <div className="lg:col-span-1">
            <a href="/" className="inline-flex items-center gap-2 mb-6 group">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-emerald-700 text-white shadow-sm group-hover:bg-emerald-600 transition">
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 18 9.5 6h5L19 18" />
                  <path d="M7 14h10" />
                </svg>
              </span>
              <div>
                <div className="text-sm font-bold text-white">INZU</div>
                <div className="text-xs text-slate-400">STAY</div>
              </div>
            </a>
            <p className="text-sm text-slate-400 mb-6">
              Discover Rwanda through authentic experiences and local connections.
            </p>
            <div className="flex gap-4">
              {[
                { label: 'Twitter', href: '#' },
                { label: 'Facebook', href: '#' },
                { label: 'Instagram', href: '#' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="h-9 w-9 rounded-lg bg-slate-800 hover:bg-slate-700 transition flex items-center justify-center text-slate-400 hover:text-white"
                  onClick={() => handleLinkClick(`social_${social.label.toLowerCase()}`)}
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20v-7.21h-2.04V9.99h2.04V8.58c0-2.02 1.23-3.12 3.04-3.12.86 0 1.6.06 1.82.09v2.11h-1.25c-.98 0-1.17.47-1.17 1.15v1.51h2.34l-.3 2.8h-2.04V20H8.29z" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Footer links sections */}
          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-sm font-bold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={() => handleLinkClick(`footer_${link.label.toLowerCase()}`)}
                      className="text-sm text-slate-400 hover:text-white hover:underline transition duration-200"
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
        <div className="border-t border-slate-800 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-400">
          <p>© 2024 INZU STAY. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/sitemap" className="hover:text-white transition">Sitemap</a>
            <a href="/preferences" className="hover:text-white transition">Preferences</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
