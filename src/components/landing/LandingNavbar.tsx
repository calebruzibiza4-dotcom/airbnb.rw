import { useEffect, useRef, useState } from 'react';
import { MoreHorizontal, X } from 'lucide-react';
import { useAuthSession } from '../../auth/AuthSessionProvider';
import { landingAnalytics } from '../../utils/analytics';

interface LandingNavbarProps {
  onLogoClick?: () => void;
  onExploreClick?: () => void;
}

function BrandMark() {
  return (
    <span className="inline-flex items-center gap-2 text-left">
      <span className="grid h-8 w-8 place-items-center rounded-xl bg-white text-[#0b0b0b] shadow-sm">
        <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 18 9.5 6h5L19 18" />
          <path d="M7 14h10" />
        </svg>
      </span>
      <span className="text-[0.8rem] font-bold tracking-[0.24em] text-white sm:text-xs">INZU STAY</span>
    </span>
  );
}

export default function LandingNavbar({ onLogoClick, onExploreClick }: LandingNavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const { status, session } = useAuthSession();

  const authenticated = status === 'authenticated' && !!session?.user;

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleMenuToggle = () => {
    setIsOpen((open) => !open);
  };

  const handleAction = (action: string, callback?: () => void) => {
    setIsOpen(false);
    landingAnalytics.trackEvent('navigation', action);
    callback?.();
  };

  const goToBrowse = (category?: string) => {
    if (typeof window === 'undefined') return;

    const params = new URLSearchParams();
    params.set('view', 'browse');
    if (category) {
      params.set('category', category);
    }

    window.location.href = `/?${params.toString()}`;
  };

  const goToLanding = () => {
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  };

  const navItems = [
    { label: 'Explore', action: () => handleAction('explore_clicked', () => onExploreClick?.() || goToBrowse()) },
    { label: 'Experiences', action: () => handleAction('experiences_clicked', () => goToBrowse('experiences')) },
    { label: 'Events', action: () => handleAction('events_clicked', () => goToBrowse('events')) },
    { label: 'Services', action: () => handleAction('services_clicked', () => goToBrowse('services')) },
    { label: 'Become a Host', action: () => handleAction('become_host_clicked', () => onExploreClick?.() || goToBrowse()) },
  ];

  const authItems = authenticated
    ? [
        { label: 'My Profile', action: () => handleAction('profile_clicked', () => goToBrowse()) },
        { label: 'Log out', action: () => handleAction('logout_clicked', () => goToBrowse()) },
      ]
    : [
        { label: 'Log in', action: () => handleAction('login_clicked', () => goToBrowse()) },
        { label: 'Sign up', action: () => handleAction('signup_clicked', () => goToBrowse()) },
      ];

  return (
    <div className="fixed left-1/2 top-4 z-50 w-[calc(100%-1.5rem)] max-w-5xl -translate-x-1/2 px-0 sm:top-5">
      <div ref={navRef} className={`overflow-hidden rounded-[1.5rem] border border-emerald-900/30 bg-emerald-800 text-white shadow-[0_18px_40px_rgba(6,78,59,0.24)] transition-all duration-300 ease-out ${isOpen ? 'pb-3' : 'pb-0'}`}>
        <div className="flex items-center justify-between gap-3 px-3 py-2.5 sm:px-4">
          <button
            type="button"
            onClick={() => handleAction('brand_click', onLogoClick || goToLanding)}
            className="flex items-center gap-2 rounded-full px-2 py-1 text-left transition hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800"
            aria-label="Go to homepage"
          >
            <BrandMark />
          </button>

          <button
            type="button"
            onClick={handleMenuToggle}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
            className="grid h-9 w-9 place-items-center rounded-full bg-[#f3f4f6] text-emerald-900 transition-transform duration-300 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800"
          >
            {isOpen ? <X className="h-4 w-4 transition-transform duration-300" /> : <MoreHorizontal className="h-4 w-4 transition-transform duration-300" />}
          </button>
        </div>

        <div className={`grid transition-all duration-300 ease-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <nav className="space-y-2.5 px-3 pb-3 pt-1 sm:px-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={item.action}
                  className="flex w-full items-center justify-between rounded-xl bg-[#0d5a4b] px-3.5 py-2.5 text-left text-sm font-semibold text-white transition hover:bg-[#0f685a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800"
                >
                  <span>{item.label}</span>
                  <span className="text-xs font-bold text-emerald-50">→</span>
                </button>
              ))}

              <div className="mt-3 border-t border-emerald-100/10 pt-3">
                {authItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={item.action}
                    className="flex w-full items-center justify-between rounded-xl border border-emerald-100/15 bg-[#0f6a5d] px-3.5 py-2.5 text-left text-sm font-semibold text-white transition hover:bg-[#11715f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/80 focus-visible:ring-offset-2 focus-visible:ring-offset-emerald-800"
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-bold text-emerald-50">→</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}
