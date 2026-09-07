import { useEffect, useRef, useState } from 'react';
import { X, Menu } from 'lucide-react';
import { useAuthSession } from '../../auth/AuthSessionProvider';
import { landingAnalytics } from '../../utils/analytics';

interface LandingNavbarProps {
  onLogoClick?: () => void;
  onExploreClick?: () => void;
  onLoginClick?: () => void;
}

export default function LandingNavbar({ onLogoClick, onExploreClick, onLoginClick }: LandingNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const { status, session } = useAuthSession();
  const authenticated = status === 'authenticated' && !!session?.user;

  /* Scroll awareness */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close on outside click / Escape */
  useEffect(() => {
    if (!isOpen) return;
    const handlePointerDown = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setIsOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsOpen(false); };
    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const goToBrowse = (category?: string) => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams();
    params.set('view', 'browse');
    if (category) params.set('category', category);
    const href = `/?${params.toString()}`;
    if (window.location.pathname + window.location.search !== href) {
      window.history.pushState({}, '', href);
      window.dispatchEvent(new Event('pushstate'));
    }
  };

  const goToLanding = () => { 
    if (typeof window !== 'undefined') {
      if (window.location.pathname !== '/') {
        window.history.pushState({}, '', '/');
        window.dispatchEvent(new Event('pushstate'));
      }
    } 
  };

  const track = (action: string, cb?: () => void) => {
    setIsOpen(false);
    landingAnalytics.trackEvent('navigation', action);
    cb?.();
  };

  const navLinks = [
    { label: 'Stays', action: () => track('stays_clicked', () => goToBrowse('stays')) },
    { label: 'Experiences', action: () => track('experiences_clicked', () => goToBrowse('experiences')) },
    { label: 'Events', action: () => track('events_clicked', () => goToBrowse('events')) },
    { label: 'Services', action: () => track('services_clicked', () => goToBrowse('services')) },
  ];

  return (
    <div className="fixed left-1/2 top-5 z-50 w-[calc(100%-2rem)] max-w-5xl -translate-x-1/2">
      <div
        ref={navRef}
        className={`
          overflow-hidden rounded-xl border border-charcoal-900/10 bg-cream
          transition-all duration-300
          ${scrolled ? 'shadow-elevated backdrop-blur-md bg-cream/95' : 'shadow-card'}
          ${isOpen ? 'pb-2' : 'pb-0'}
        `}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
          {/* Wordmark */}
          <button
            type="button"
            onClick={() => track('brand_click', onLogoClick || goToLanding)}
            className="flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-lg"
            aria-label="Go to homepage"
          >
            <span
              className="grid h-7 w-7 place-items-center rounded-lg bg-charcoal-900 text-cream"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 18 9.5 6h5L19 18" />
                <path d="M7 14h10" />
              </svg>
            </span>
            <span className="font-display text-sm font-700 tracking-[0.18em] text-charcoal-900 uppercase select-none">
              INZU STAY
            </span>
          </button>

          {/* Desktop nav links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <button
                key={link.label}
                type="button"
                onClick={link.action}
                className="px-3 py-1.5 text-sm font-medium text-charcoal-700 hover:text-charcoal-900 rounded-lg hover:bg-charcoal-900/5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Desktop auth + CTA */}
            <div className="hidden md:flex items-center gap-2">
              {authenticated ? (
                <button
                  onClick={() => track('profile_clicked', () => goToBrowse())}
                  className="px-3 py-1.5 text-sm font-medium text-charcoal-700 hover:text-charcoal-900 rounded-lg hover:bg-charcoal-900/5 transition-colors duration-200"
                >
                  My Profile
                </button>
              ) : (
                <button
                  onClick={() => track('login_clicked', onLoginClick || (() => goToBrowse()))}
                  className="px-3 py-1.5 text-sm font-medium text-charcoal-700 hover:text-charcoal-900 rounded-lg hover:bg-charcoal-900/5 transition-colors duration-200"
                >
                  Log in
                </button>
              )}
              <button
                onClick={() => track('explore_clicked', () => onExploreClick?.() || goToBrowse())}
                className="px-4 py-2 bg-charcoal-900 text-cream text-sm font-semibold rounded-lg hover:bg-charcoal-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                Explore Rwanda
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setIsOpen((o) => !o)}
              aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isOpen}
              className="md:hidden grid h-9 w-9 place-items-center rounded-lg bg-charcoal-900 text-cream transition-colors hover:bg-charcoal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              {isOpen
                ? <X className="h-4 w-4" />
                : <Menu className="h-4 w-4" />
              }
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <div
          className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
        >
          <div className="overflow-hidden">
            <nav className="flex flex-col gap-1 px-4 pb-3 pt-1">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  type="button"
                  onClick={link.action}
                  className="flex items-center justify-between w-full px-3 py-2.5 text-left text-sm font-medium text-charcoal-900 rounded-lg hover:bg-charcoal-900/5 transition-colors duration-200"
                >
                  <span>{link.label}</span>
                  <span className="text-charcoal-200 text-xs">→</span>
                </button>
              ))}
              <div className="mt-2 pt-2 border-t border-charcoal-900/8 flex flex-col gap-1">
                {authenticated ? (
                  <button
                    onClick={() => track('profile_clicked', () => goToBrowse())}
                    className="flex items-center justify-between w-full px-3 py-2.5 text-left text-sm font-medium text-charcoal-900 rounded-lg hover:bg-charcoal-900/5 transition-colors duration-200"
                  >
                    <span>My Profile</span>
                    <span className="text-charcoal-200 text-xs">→</span>
                  </button>
                ) : (
                  <button
                    onClick={() => track('login_clicked', onLoginClick || (() => goToBrowse()))}
                    className="flex items-center justify-between w-full px-3 py-2.5 text-left text-sm font-medium text-charcoal-900 rounded-lg hover:bg-charcoal-900/5 transition-colors duration-200"
                  >
                    <span>Log in</span>
                    <span className="text-charcoal-200 text-xs">→</span>
                  </button>
                )}
                <button
                  onClick={() => track('explore_clicked', () => onExploreClick?.() || goToBrowse())}
                  className="mt-1 w-full px-4 py-2.5 bg-charcoal-900 text-cream text-sm font-semibold rounded-lg hover:bg-charcoal-800 transition-colors duration-200 text-center"
                >
                  Explore Rwanda
                </button>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
