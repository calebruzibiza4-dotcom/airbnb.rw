/**
 * Landing Page Configuration & Split Testing
 * Allows A/B testing of different landing page variants
 */

export type LandingVariant = 'A' | 'B';

export interface LandingConfig {
  variant: LandingVariant;
  heroHeadline: string;
  heroSubheading: string;
  primaryCTAText: string;
  secondaryCTAText: string;
  heroImageStyle: 'gradient-overlay' | 'image-focus' | 'split-layout';
}

/**
 * Landing page variant configurations
 * Easily switch between variants for A/B testing
 */
export const landingVariants: Record<LandingVariant, LandingConfig> = {
  A: {
    variant: 'A',
    heroHeadline: 'Discover Rwanda, your way.',
    heroSubheading: 'Find unforgettable experiences, events, services and places to stay, all in one place.',
    primaryCTAText: 'Explore Rwanda',
    secondaryCTAText: 'Become a Host',
    heroImageStyle: 'gradient-overlay',
  },
  B: {
    variant: 'B',
    heroHeadline: 'Your next Rwandan experience starts here.',
    heroSubheading: 'Discover authentic experiences, local events, quality services, and premium accommodations across Rwanda.',
    primaryCTAText: 'Start Exploring',
    secondaryCTAText: 'Host Your Experience',
    heroImageStyle: 'image-focus',
  },
};

/**
 * Get the active landing variant
 * Can be determined by URL param, user segment, or localStorage
 */
export function getActiveLandingVariant(): LandingVariant {
  // Check URL parameter first (for testing)
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const variant = params.get('variant');
    
    if (variant === 'A' || variant === 'B') {
      return variant;
    }

    // Check localStorage
    const stored = localStorage.getItem('landing-variant');
    if (stored === 'A' || stored === 'B') {
      return stored;
    }

    // Randomly assign for first-time visitors
    const random = Math.random() > 0.5 ? 'A' : 'B';
    localStorage.setItem('landing-variant', random);
    return random;
  }

  return 'A';
}

/**
 * Force a specific landing variant (useful for testing)
 */
export function setLandingVariant(variant: LandingVariant): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('landing-variant', variant);
  }
}

/**
 * Get the current configuration based on active variant
 */
export function getLandingConfig(): LandingConfig {
  const variant = getActiveLandingVariant();
  return landingVariants[variant];
}

/**
 * Reset to default variant
 */
export function resetLandingVariant(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('landing-variant');
  }
}
