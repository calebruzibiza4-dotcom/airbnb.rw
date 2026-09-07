'use client';

import { useEffect, useState } from 'react';
import { useScrollTracking, landingAnalytics } from '../../utils/analytics';
import HostWizard from '../../components/host/HostWizard';
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
import ScrollProgress from '../../components/landing/ScrollProgress';
import AuthModal from '../auth/AuthModal';
import LoginModal from '../auth/LoginModal';
import SignupModal from '../auth/SignupModal';
import ForgotPasswordModal from '../auth/ForgotPasswordModal';

export default function Landing() {
  const [hostWizardOpen, setHostWizardOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot' | null>(null);

  useScrollTracking();

  useEffect(() => {
    landingAnalytics.trackSectionImpression('landing-page');
    return () => {
      landingAnalytics.sendAnalytics();
    };
  }, []);

  const handleExploreClick = () => {
    if (typeof window !== 'undefined') window.location.href = '/?view=browse';
  };

  const handleHostClick = () => {
    setHostWizardOpen(true);
  };

  const handleHostWizardClose = () => {
    setHostWizardOpen(false);
  };

  return (
    <div className="min-h-screen bg-cream text-charcoal-900">
      <ScrollProgress />
      <LandingNavbar
        onExploreClick={handleExploreClick}
        onLogoClick={() => (window.location.href = '/')}
        onLoginClick={() => setAuthMode('login')}
      />

      <main aria-label="Landing page content">
        <Hero onExploreClick={handleExploreClick} onHostClick={handleHostClick} />
        <ValueProposition />
        <CategorySection />
        <FeaturedExperiences />
        <FeaturedEvents />
        <FeaturedServices />
        <RwandaStory />
        <HowItWorks />
        <HostCTA onHostClick={handleHostClick} />
        <FinalCTA onExploreClick={handleExploreClick} />
        <Footer />
      </main>

      <AuthModal
        open={authMode !== null}
        title={authMode === 'signup' ? 'Sign up' : authMode === 'forgot' ? 'Password recovery' : 'Log in'}
        onClose={() => setAuthMode(null)}
      >
        {authMode === 'signup' ? (
          <SignupModal onSwitchToLogin={() => setAuthMode('login')} />
        ) : authMode === 'forgot' ? (
          <ForgotPasswordModal onClose={() => setAuthMode(null)} onBackToLogin={() => setAuthMode('login')} />
        ) : (
          <LoginModal onSwitchToSignup={() => setAuthMode('signup')} onForgotPassword={() => setAuthMode('forgot')} />
        )}
      </AuthModal>

      {/* Host wizard overlay */}
      {hostWizardOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-charcoal-900/70 px-4 py-6 backdrop-blur-sm"
          onClick={handleHostWizardClose}
        >
          <div
            className="max-h-[95vh] w-full max-w-6xl overflow-y-auto rounded-2xl bg-cream shadow-elevated"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Create host profile"
          >
            <HostWizard onComplete={handleHostWizardClose} onCancel={handleHostWizardClose} />
          </div>
        </div>
      )}
    </div>
  );
}
