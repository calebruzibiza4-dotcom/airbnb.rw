import { FormEvent, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { CalendarDays, MapPin, Search, Users, X } from 'lucide-react';
import AuthModal from '../../pages/auth/AuthModal';
import ForgotPasswordModal from '../../pages/auth/ForgotPasswordModal';
import LoginModal from '../../pages/auth/LoginModal';
import SignupModal from '../../pages/auth/SignupModal';
import AccountMenu from './AccountMenu';
import Categories from './categories';
import type { TopCategoryKey } from '../../data/categoryNavigation';
import { useAuthSession } from '../../auth/AuthSessionProvider';

type NavbarProps = {
  onOpenHostWizard?: () => void;
  hostProfileComplete?: boolean;
  onCategoryChange?: (category: TopCategoryKey) => void;
};

type SearchType = 'everything' | 'experiences' | 'events' | 'services';

type SearchState = {
  type: SearchType;
  query: string;
  location: string;
  startDate: string;
  endDate: string;
  guests: {
    adults: number;
    children: number;
    infants: number;
  };
};

const initialSearch: SearchState = {
  type: 'everything',
  query: '',
  location: '',
  startDate: '',
  endDate: '',
  guests: { adults: 0, children: 0, infants: 0 },
};

const searchTypes: Array<{ value: SearchType; label: string }> = [
  { value: 'everything', label: 'Everything' },
  { value: 'experiences', label: 'Experiences' },
  { value: 'events', label: 'Events' },
  { value: 'services', label: 'Services' },
];

const locations = ['Kigali', 'Musanze', 'Rubavu', 'Lake Kivu', 'Huye', 'Nyungwe', 'Akagera'];
const searchSuggestions = ['Stays', 'Gorilla trekking', 'Coffee experiences', 'Concerts', 'Car rental', 'Tour guide', 'Spa'];

function SearchIcon({ className = 'h-4 w-4' }: { className?: string }) {
  return <Search className={className} aria-hidden="true" />;
}

function guestLabel(guests: SearchState['guests']) {
  const total = guests.adults + guests.children;
  return total ? `${total} ${total === 1 ? 'guest' : 'guests'}` : 'Add guests';
}

function dateLabel(search: SearchState) {
  if (!search.startDate) return 'Any date';
  if (search.type === 'everything' || search.type === 'experiences' || search.type === 'services') {
    return search.endDate ? `${search.startDate} - ${search.endDate}` : search.startDate;
  }
  return search.startDate;
}

function SearchField({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`min-w-0 flex-1 rounded-2xl px-4 py-2.5 transition hover:bg-emerald-50/70 ${className}`}>
      <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">{label}</span>
      {children}
    </div>
  );
}

function GuestSelector({ search, onChange }: { search: SearchState; onChange: (guests: SearchState['guests']) => void }) {
  const [open, setOpen] = useState(false);
  const update = (key: keyof SearchState['guests'], amount: number) => {
    onChange({ ...search.guests, [key]: Math.max(0, search.guests[key] + amount) });
  };

  return (
    <div className="relative min-w-0 flex-1">
      <button type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} className="w-full rounded-2xl px-4 py-2.5 text-left transition hover:bg-emerald-50/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">
        <span className="block text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500">Guests</span>
        <span className="mt-0.5 flex items-center gap-2 truncate text-sm font-semibold text-slate-900"><Users className="h-4 w-4 text-emerald-700" />{guestLabel(search.guests)}</span>
      </button>
      {open ? (
        <div className="absolute right-0 top-full z-30 mt-2 w-64 rounded-2xl border border-slate-200 bg-white p-3 shadow-xl">
          {(['adults', 'children', 'infants'] as const).map((key) => (
            <div key={key} className="flex items-center justify-between py-2">
              <span className="text-sm font-medium capitalize text-slate-800">{key}</span>
              <div className="flex items-center gap-3">
                <button type="button" onClick={() => update(key, -1)} className="grid h-7 w-7 place-items-center rounded-full border border-slate-300 text-slate-700" aria-label={`Remove ${key}`}>-</button>
                <span className="w-4 text-center text-sm">{search.guests[key]}</span>
                <button type="button" onClick={() => update(key, 1)} className="grid h-7 w-7 place-items-center rounded-full border border-slate-300 text-slate-700" aria-label={`Add ${key}`}>+</button>
              </div>
            </div>
          ))}
        </div>
      ) : null}
    </div>
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

function SearchBar({ search, onChange, onSubmit }: { search: SearchState; onChange: (search: SearchState) => void; onSubmit: (event: FormEvent) => void }) {
  const handleQueryChange = (query: string) => {
    const matchingType = searchTypes.find((item) => item.label.toLowerCase() === query.trim().toLowerCase());
    onChange({ ...search, query, type: matchingType?.value ?? search.type });
  };

  return (
    <form onSubmit={onSubmit} className="hidden h-[70px] w-full max-w-[930px] items-center rounded-[24px] border border-slate-200 bg-white p-1.5 shadow-[0_8px_24px_rgba(15,23,42,0.08)] md:flex">
      <div className="relative min-w-0 flex-[1.25]">
        <SearchField label="What">
          <input value={search.query} onChange={(event) => handleQueryChange(event.target.value)} list="what-search-suggestions" placeholder="Stays, experiences, events..." className="mt-0.5 w-full truncate bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400" aria-label="What are you looking for?" />
          <datalist id="what-search-suggestions">{[...searchTypes.map((item) => item.label), ...searchSuggestions].map((suggestion) => <option key={suggestion} value={suggestion} />)}</datalist>
        </SearchField>
        <div className="absolute left-4 top-full z-20 mt-2 hidden w-60 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl group-focus-within:block">
          {searchTypes.slice(0, 4).map((item) => <button key={item.value} type="button" onClick={() => onChange({ ...search, type: item.value, query: item.value === 'everything' ? '' : item.label })} className="block w-full rounded-xl px-3 py-2 text-left text-sm hover:bg-emerald-50">{item.label}</button>)}
        </div>
      </div>
      <span className="h-9 w-px shrink-0 bg-slate-200" />
      <div className="relative min-w-0 flex-1">
        <SearchField label="Where">
          <MapPin className="mr-1 inline h-4 w-4 text-emerald-700" />
          <input value={search.location} onChange={(event) => onChange({ ...search, location: event.target.value })} list="rwanda-search-locations" placeholder="Rwanda, Kigali, Lake Kivu..." className="mt-0.5 w-[calc(100%-24px)] bg-transparent text-sm font-semibold text-slate-900 outline-none placeholder:text-slate-400" aria-label="Where" />
          <datalist id="rwanda-search-locations">{locations.map((location) => <option key={location} value={location} />)}</datalist>
        </SearchField>
      </div>
      <span className="h-9 w-px shrink-0 bg-slate-200" />
      <SearchField label={search.type === 'events' ? 'Event date' : 'When'}>
        <div className="flex items-center gap-1"><CalendarDays className="h-4 w-4 shrink-0 text-emerald-700" /><input type="date" value={search.startDate} onChange={(event) => onChange({ ...search, startDate: event.target.value })} className="mt-0.5 min-w-0 bg-transparent text-sm font-semibold text-slate-900 outline-none" aria-label="When" /></div>
      </SearchField>
      <span className="h-9 w-px shrink-0 bg-slate-200" />
      <GuestSelector search={search} onChange={(guests) => onChange({ ...search, guests })} />
      <button
        type="submit"
        aria-label="Search"
        className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-emerald-800 text-white transition duration-200 hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
      >
        <SearchIcon />
      </button>
    </form>
  );
}

function MobileSearch({ open, onToggle, search, onChange, onSubmit }: { open: boolean; onToggle: () => void; search: SearchState; onChange: (search: SearchState) => void; onSubmit: (event: FormEvent) => void }) {
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
        <span className="text-sm font-semibold text-slate-900">What are you looking for?</span>
        <span className="ml-auto max-w-[38%] truncate text-xs text-slate-500">{search.location || 'Anywhere'} · {dateLabel(search)}</span>
      </button>
      {open ? (
        <form onSubmit={onSubmit} className="fixed inset-x-0 top-0 z-[60] min-h-screen bg-white p-5 shadow-xl sm:absolute sm:inset-x-auto sm:left-0 sm:right-0 sm:top-full sm:mt-2 sm:min-h-0 sm:rounded-3xl sm:border sm:border-slate-200 sm:p-4">
          <div className="mb-5 flex items-center justify-between"><p className="text-lg font-bold text-slate-900">Discover Rwanda</p><button type="button" onClick={onToggle} aria-label="Close search" className="grid h-9 w-9 place-items-center rounded-full bg-slate-100"><X className="h-4 w-4" /></button></div>
          <label className="block text-sm font-bold text-slate-800">What<input value={search.query} onChange={(event) => onChange({ ...search, query: event.target.value })} placeholder="Stays, experiences, events, services" className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-700" /></label>
          <div className="mt-3 flex flex-wrap gap-2">{searchTypes.map((item) => <button key={item.value} type="button" onClick={() => onChange({ ...search, type: item.value, query: item.value === 'everything' ? '' : item.label })} className={`rounded-full border px-3 py-1.5 text-xs font-semibold ${search.type === item.value ? 'border-emerald-700 bg-emerald-50 text-emerald-800' : 'border-slate-200 text-slate-600'}`}>{item.label}</button>)}</div>
          <label className="mt-5 block text-sm font-bold text-slate-800">Where<input value={search.location} onChange={(event) => onChange({ ...search, location: event.target.value })} list="rwanda-mobile-locations" placeholder="Rwanda, Kigali, Lake Kivu..." className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-700" /><datalist id="rwanda-mobile-locations">{locations.map((location) => <option key={location} value={location} />)}</datalist></label>
          <label className="mt-5 block text-sm font-bold text-slate-800">{search.type === 'events' ? 'Event date' : 'When'}<input type="date" value={search.startDate} onChange={(event) => onChange({ ...search, startDate: event.target.value })} className="mt-2 w-full rounded-2xl border border-slate-200 px-4 py-3 outline-none focus:border-emerald-700" /></label>
          <div className="mt-5 rounded-2xl border border-slate-200"><GuestSelector search={search} onChange={(guests) => onChange({ ...search, guests })} /></div>
          <button type="submit" className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-emerald-800 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-900">
            <SearchIcon />
            Search
          </button>
        </form>
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

export default function Navbar({ onOpenHostWizard, hostProfileComplete = false, onCategoryChange }: NavbarProps) {
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [search, setSearch] = useState<SearchState>(initialSearch);
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

  const submitSearch = (event: FormEvent) => {
    event.preventDefault();
    const params = new URLSearchParams();
    if (search.type !== 'everything') params.set('type', search.type);
    if (search.query) params.set('query', search.query);
    if (search.location) params.set('location', search.location);
    if (search.startDate) params.set('startDate', search.startDate);
    if (search.endDate) params.set('endDate', search.endDate);
    const guestCount = search.guests.adults + search.guests.children + search.guests.infants;
    if (guestCount) params.set('guests', String(guestCount));
    window.history.pushState({}, '', `${window.location.pathname}${params.toString() ? `?${params}` : ''}`);
    setMobileSearchOpen(false);
  };

  return (
    <div className="relative">
      <header className="sticky top-0 z-50 bg-white/90 shadow-[0_4px_20px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Logo />
          <SearchBar search={search} onChange={setSearch} onSubmit={submitSearch} />
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
            <MobileSearch open={mobileSearchOpen} onToggle={() => setMobileSearchOpen((open) => !open)} search={search} onChange={setSearch} onSubmit={submitSearch} />
        </div>
      </div>
      <AuthModal open={authMode !== null} title={authMode === 'signup' ? 'Sign up' : authMode === 'forgot' ? 'Password recovery' : 'Log in'} onClose={() => setAuthMode(null)}>
        <AnimatePresence mode="wait" initial={false}>
          {authMode === 'signup' ? <SignupModal onSwitchToLogin={() => setAuthMode('login')} /> : authMode === 'forgot' ? <ForgotPasswordModal onClose={() => setAuthMode(null)} onBackToLogin={() => setAuthMode('login')} /> : <LoginModal onSwitchToSignup={() => setAuthMode('signup')} onForgotPassword={() => setAuthMode('forgot')} />}
        </AnimatePresence>
      </AuthModal>
    </header>
    <Categories onCategoryChange={onCategoryChange} />
    </div>
  );
}
