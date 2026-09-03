'use client';

import { useEffect, useState } from 'react';
import { useScrollTracking, landingAnalytics } from '../../utils/analytics';
import { getLandingConfig } from '../../utils/landingConfig';
import LandingNavbar from '../../components/landing/LandingNavbar';
import Hero from '../../components/landing/Hero';
import ValueProposition from '../../components/landing/ValueProposition';
import CategorySection from '../../components/landing/CategorySection';
import FeaturedExperiences from '../../components/landing/FeaturedExperiences';
import FeaturedEvents from '../../components/landing/FeaturedEvents';
import FeaturedServices from '../../components/landing/FeaturedServices';
import RwandaStory from '../../components/landing/RwandaStory';
import HowItWorks from '../../components/landing/HowItWorks';
import HostCTA from '../../components/landing/HostCTA';
import FinalCTA from '../../components/landing/FinalCTA';
import Footer from '../../components/landing/Footer';

export default function Landing() {
  const [hostWizardOpen, setHostWizardOpen] = useState(false);

  // Track scroll depth
  useScrollTracking();

  // Track page view
  useEffect(() => {
    landingAnalytics.trackSectionImpression('landing-page');
    
    // Send analytics when user leaves
    return () => {
      landingAnalytics.sendAnalytics();
    };
  }, []);

  const config = getLandingConfig();

  const handleExploreClick = () => {
    // Navigate to dashboard by adding a parameter
    if (typeof window !== 'undefined') {
      window.location.href = '/?view=browse';
    }
  };

  const handleHostClick = () => {
    setHostWizardOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white text-slate-900">
      {/* Navbar */}
      <LandingNavbar 
        onExploreClick={handleExploreClick}
        onLogoClick={() => window.location.href = '/'}
      />

      {/* Main content */}
      <main className="min-h-screen" aria-label="Landing page content">
        {/* Hero Section */}
        <Hero 
          onExploreClick={handleExploreClick}
          onHostClick={handleHostClick}
        />

        {/* Value Proposition */}
        <ValueProposition />

        {/* Category Section */}
        <CategorySection />

        {/* Featured Experiences */}
        <section id="featured-experiences">
          <FeaturedExperiences />
        </section>

        {/* Featured Events */}
        <FeaturedEvents />

        {/* Featured Services */}
        <FeaturedServices />

        {/* Rwanda Story */}
        <RwandaStory />

        {/* How It Works */}
        <HowItWorks />

        {/* Host CTA */}
        <HostCTA onHostClick={handleHostClick} />

        {/* Final CTA */}
        <FinalCTA onExploreClick={handleExploreClick} />

        {/* Footer */}
        <Footer />
      </main>

      {/* Analytics debug info (development only) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 right-4 bg-slate-900 text-slate-100 text-xs p-3 rounded max-w-xs max-h-32 overflow-y-auto font-mono opacity-75 hover:opacity-100 transition">
          <div>Landing Variant: {config.variant}</div>
          <div>Scroll Depth: {Math.round((window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100)}%</div>
          <div>Events: {landingAnalytics.getEvents().length}</div>
        </div>
      )}
    </div>
  );
}
