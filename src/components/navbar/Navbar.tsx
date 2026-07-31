import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import AuthModal from '../../pages/auth/AuthModal';
import ForgotPasswordModal from '../../pages/auth/ForgotPasswordModal';
import LoginModal from '../../pages/auth/LoginModal';
import SignupModal from '../../pages/auth/SignupModal';
import AccountMenu from './AccountMenu';
import Categories from './categories';
import { useAuthSession } from '../../auth/AuthSessionProvider';

type NavbarProps = {
  onOpenHostWizard?: () => void;
  hostProfileComplete?: boolean;
};

type SearchSectionProps = {
  label: string;
  placeholder: string;
  className?: string;
};

function SearchSection({ label, placeholder, className = '' }: SearchSectionProps) {
  return (
    <button
      type="button"
      className={`group flex min-w-0 flex-1 flex-col items-start rounded-full px-5 py-2 text-left transition duration-200 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 ${className}`}
    >
      <span className="text-[11px] font-semibold text-slate-900">{label}</span>
      <span className="truncate text-sm text-slate-500 transition group-hover:text-slate-700">{placeholder}</span>
    </button>
  );
}

function SearchIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function Logo() {
  return (
    <a href="#" aria-label="Inzu Stay home" className="inline-flex shrink-0 items-center gap-2 text-slate-950 transition duration-200 hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-4">
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-800 text-white shadow-sm shadow-emerald-900/20">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 18 9.5 6h5L19 18" />
          <path d="M7 14h10" />
        </svg>
      </span>
      <span className="text-xl font-bold tracking-tight">INZU STAY</span>
    </a>
  );
}

function SearchBar({ onSearch }: { onSearch: () => void }) {
  return (
    <div className="hidden h-[66px] w-full max-w-[850px] items-center rounded-full border border-slate-200 bg-white p-1.5 shadow-[0_5px_20px_rgba(15,23,42,0.08)] md:flex">
      <SearchSection label="Where" placeholder="Search destinations" />
      <span className="h-8 w-px shrink-0 bg-slate-200" />
      <SearchSection label="Check in" placeholder="Add dates" />
      <span className="h-8 w-px shrink-0 bg-slate-200" />
      <SearchSection label="Check out" placeholder="Add dates" />
      <span className="h-8 w-px shrink-0 bg-slate-200" />
      <SearchSection label="Guests" placeholder="Add guests" className="pr-2" />
      <button
        type="button"
        onClick={onSearch}
        aria-label="Search"
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-emerald-800 text-white transition duration-200 hover:scale-105 hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
      >
        <SearchIcon />
      </button>
    </div>
  );
}

function MobileSearch({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <div className="relative md:hidden">
      <button
        type="button"
        onClick={onToggle}
        aria-label="Open search"
        aria-expanded={open}
        className="flex h-12 w-full items-center gap-3 rounded-full border border-slate-200 bg-white px-4 text-left shadow-[0_5px_20px_rgba(15,23,42,0.08)] transition duration-200 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2"
      >
        <SearchIcon className="h-4 w-4 text-slate-900" />
        <span className="text-sm font-medium text-slate-900">Where to?</span>
        <span className="ml-auto text-xs text-slate-500">Any week · Add guests</span>
      </button>
      {open ? (
        <div className="absolute left-0 right-0 top-full z-10 mt-2 animate-[dropdown_200ms_ease-out] rounded-3xl border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/10">
          <SearchSection label="Where" placeholder="Search destinations" className="w-full" />
          <SearchSection label="When" placeholder="Add dates" className="mt-1 w-full" />
          <SearchSection label="Guests" placeholder="Add guests" className="mt-1 w-full" />
          <button type="button" className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#FF385C] px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-[#e61e4d] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF385C] focus-visible:ring-offset-2">
            <SearchIcon />
            Search
          </button>
        </div>
      ) : null}
    </div>
  );
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
    </svg>
  );
}

export default function Navbar({ onOpenHostWizard, hostProfileComplete = false }: NavbarProps) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot' | null>(null);
  const { status, session } = useAuthSession();
  const authenticated = status === 'authenticated' && !!session?.user;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileSearchOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative">
      <header className="sticky top-0 z-50 bg-white/90 shadow-[0_4px_20px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Logo />
          <SearchBar onSearch={() => setMobileSearchOpen(false)} />
          <div className="flex items-center gap-1 sm:gap-2">
            {authenticated ? (
              <button type="button" onClick={onOpenHostWizard} className="hidden rounded-full bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition duration-200 hover:bg-emerald-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 sm:inline-flex">
                {hostProfileComplete ? 'Host Dashboard' : 'Create Host Profile'}
              </button>
            ) : null}
            <button type="button" aria-label="Choose language" className="hidden h-11 w-11 place-items-center rounded-full text-slate-700 transition duration-200 hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 sm:grid">
              <GlobeIcon />
            </button>
            <AccountMenu onLogIn={() => setAuthMode('login')} onSignUp={() => setAuthMode('signup')} onSignOutComplete={() => setAuthMode(null)} onOpenHostWizard={onOpenHostWizard} hostProfileComplete={hostProfileComplete} />
          </div>
        </div>
        <div className="mt-3">
          <MobileSearch open={mobileSearchOpen} onToggle={() => setMobileSearchOpen((open) => !open)} />
        </div>
      </div>
      <AuthModal open={authMode !== null} title={authMode === 'signup' ? 'Sign up' : authMode === 'forgot' ? 'Password recovery' : 'Log in'} onClose={() => setAuthMode(null)}>
        <AnimatePresence mode="wait" initial={false}>
          {authMode === 'signup' ? <SignupModal onSwitchToLogin={() => setAuthMode('login')} /> : authMode === 'forgot' ? <ForgotPasswordModal onClose={() => setAuthMode(null)} onBackToLogin={() => setAuthMode('login')} /> : <LoginModal onSwitchToSignup={() => setAuthMode('signup')} onForgotPassword={() => setAuthMode('forgot')} />}
        </AnimatePresence>
      </AuthModal>
    </header>
    <Categories />
    </div>
  );
}
