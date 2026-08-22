'use client';

import { useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import HostWizard from './components/host/HostWizard';
import ListingDetails from './components/listings/ListingDetails';
import ListingGrid from './components/listings/ListingGrid';
import type { TopCategoryKey } from './data/categoryNavigation';

const HOST_PROFILE_STORAGE_KEY = 'inzu-host-profile-complete';

export default function App() {
  const [hostWizardOpen, setHostWizardOpen] = useState(false);
  const [hostProfileComplete, setHostProfileComplete] = useState(false);
  const [hostNotice, setHostNotice] = useState('');
  const [category, setCategory] = useState<TopCategoryKey>('everything');
  const listingId = typeof window !== 'undefined' && window.location.pathname.startsWith('/listings/') ? window.location.pathname.split('/').pop() : null;

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    try {
      const stored = window.localStorage.getItem(HOST_PROFILE_STORAGE_KEY);
      setHostProfileComplete(stored === 'true');
    } catch {
      setHostProfileComplete(false);
    }
  }, []);

  const openHostWizard = () => {
    setHostNotice('');
    setHostWizardOpen(true);
  };

  const closeHostWizard = () => {
    setHostWizardOpen(false);
  };

  const handleHostWizardComplete = () => {
    setHostProfileComplete(true);
    setHostWizardOpen(false);
    setHostNotice('Your host profile is ready. You can manage it from your account.');

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(HOST_PROFILE_STORAGE_KEY, 'true');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-white text-slate-900">
      <Navbar onOpenHostWizard={openHostWizard} hostProfileComplete={hostProfileComplete} onCategoryChange={setCategory} />
      <main className="min-h-[calc(100vh-96px)]" aria-label="Main content">
        {hostNotice ? (
          <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 shadow-sm">
              {hostNotice}
            </div>
          </div>
        ) : null}
        {listingId ? <ListingDetails id={listingId} /> : <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"><div className="mb-8"><p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Discover Rwanda</p><h1 className="mt-2 text-3xl font-bold text-slate-950">Find your next local moment</h1><p className="mt-2 text-slate-600">Stays, experiences, events and services from local hosts.</p></div><ListingGrid category={category} /></section>}
        {hostWizardOpen ? (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur-sm" onClick={closeHostWizard}>
            <div className="max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-[32px] border border-white/70 bg-white/90 shadow-2xl" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label="Create host profile">
              <HostWizard onComplete={handleHostWizardComplete} onCancel={closeHostWizard} />
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}
