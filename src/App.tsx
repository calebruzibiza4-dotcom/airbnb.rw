'use client';

import { useEffect, useState } from 'react';
import Navbar from './components/navbar/Navbar';
import HostWizard from './components/host/HostWizard';
import ListingDetails from './components/listings/ListingDetails';
import ListingGrid from './components/listings/ListingGrid';
import Landing from './pages/landing/Landing';
import type { TopCategoryKey } from './data/categoryNavigation';

// New Pages
import About from './pages/about/About';
import Contact from './pages/contact/Contact';
import Blog from './pages/blog/Blog';
import BlogPost from './pages/blog/BlogPost';
import Help from './pages/help/Help';
import MyBookings from './pages/bookings/MyBookings';
import BookingDetails from './pages/bookings/BookingDetails';

const HOST_PROFILE_STORAGE_KEY = 'inzu-host-profile-complete';

export default function App() {
  const [hostWizardOpen, setHostWizardOpen] = useState(false);
  const [hostProfileComplete, setHostProfileComplete] = useState(false);
  const [hostNotice, setHostNotice] = useState('');
  const [category, setCategory] = useState<TopCategoryKey>('everything');
  const [listingRefreshKey, setListingRefreshKey] = useState(0);
  
  // Custom router state
  const [currentPath, setCurrentPath] = useState(
    typeof window !== 'undefined' ? window.location.pathname : '/'
  );
  const [searchParams, setSearchParams] = useState(
    typeof window !== 'undefined' ? window.location.search : ''
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = window.localStorage.getItem(HOST_PROFILE_STORAGE_KEY);
      setHostProfileComplete(stored === 'true');
    } catch {
      setHostProfileComplete(false);
    }

    const handleLocationChange = () => {
      setCurrentPath(window.location.pathname);
      setSearchParams(window.location.search);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('pushstate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('pushstate', handleLocationChange);
    };
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
    setListingRefreshKey((current) => current + 1);
    setHostNotice('Your host profile is ready. You can manage it from your account.');

    if (typeof window !== 'undefined') {
      window.localStorage.setItem(HOST_PROFILE_STORAGE_KEY, 'true');
    }
  };

  // Route matching logic
  const isLandingPage = currentPath === '/' && !searchParams.includes('view=browse');
  const listingId = currentPath.startsWith('/listings/') ? currentPath.split('/').pop() : null;
  const bookingId = currentPath.startsWith('/bookings/') ? currentPath.split('/').pop() : null;
  const isAboutPage = currentPath === '/about';
  const isContactPage = currentPath === '/contact';
  const isHelpPage = currentPath === '/help';
  const isBlogPage = currentPath === '/blog';
  const blogSlug = currentPath.startsWith('/blog/') ? currentPath.split('/').pop() : null;

  const renderRoute = () => {
    if (isLandingPage) {
      return <Landing />;
    }

    if (bookingId && currentPath.startsWith('/bookings/')) {
      return <BookingDetails id={bookingId} />;
    }

    if (currentPath === '/bookings') {
      return <MyBookings />;
    }
    
    if (isAboutPage) {
      return <About />;
    }
    
    if (isContactPage) {
      return <Contact />;
    }
    
    if (isHelpPage) {
      return <Help />;
    }
    
    if (blogSlug && currentPath !== '/blog') {
      return <BlogPost />;
    }
    
    if (isBlogPage) {
      return <Blog />;
    }

    // Default route: browse/listings view
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-50 via-slate-100 to-white text-slate-900 font-inter">
        <Navbar 
          onOpenHostWizard={openHostWizard} 
          hostProfileComplete={hostProfileComplete} 
          onCategoryChange={setCategory}
          onOpenBookings={() => {
            window.history.pushState({}, '', '/bookings');
            window.dispatchEvent(new Event('pushstate'));
          }}
          onLogoClick={() => {
            window.history.pushState({}, '', '/');
            window.dispatchEvent(new Event('pushstate'));
          }} 
        />
        <main className="min-h-[calc(100vh-96px)]" aria-label="Main content">
          {hostNotice ? (
            <div className="mx-auto max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-800 shadow-sm">
                {hostNotice}
              </div>
            </div>
          ) : null}
          
          {listingId ? (
            <ListingDetails id={listingId} />
          ) : (
            <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
              <div className="mb-8">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Discover Rwanda</p>
              </div>
              <ListingGrid key={listingRefreshKey} category={category} />
            </section>
          )}

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
  };

  return <>{renderRoute()}</>;
}
