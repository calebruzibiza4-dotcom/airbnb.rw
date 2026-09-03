/**
 * Landing Page Analytics Tracking Utility
 * Tracks meaningful user interactions and scroll depth
 */

type EventCategory = 
  | 'navigation'
  | 'cta'
  | 'engagement'
  | 'scroll'
  | 'impression';

interface AnalyticsEvent {
  category: EventCategory;
  action: string;
  label?: string;
  value?: number;
  timestamp: number;
  scrollDepth?: number;
}

class LandingAnalytics {
  private events: AnalyticsEvent[] = [];
  private scrollDepthTracked = new Set<number>();
  private sessionStart: number = Date.now();

  /**
   * Track a user interaction event
   */
  trackEvent(
    category: EventCategory,
    action: string,
    label?: string,
    value?: number
  ): void {
    const event: AnalyticsEvent = {
      category,
      action,
      label,
      value,
      timestamp: Date.now(),
      scrollDepth: this.getCurrentScrollDepth(),
    };

    this.events.push(event);
    this.logEvent(event);
  }

  /**
   * Track CTA clicks
   */
  trackCTAClick(ctaName: string, location: string): void {
    this.trackEvent('cta', 'click', `${ctaName} - ${location}`);
  }

  /**
   * Track category discovery clicks
   */
  trackCategoryClick(categoryName: string): void {
    this.trackEvent('engagement', 'category_click', categoryName);
  }

  /**
   * Track listing/experience clicks
   */
  trackListingClick(listingId: string, listingTitle: string): void {
    this.trackEvent('engagement', 'listing_click', listingTitle, parseInt(listingId, 10));
  }

  /**
   * Track host signup clicks
   */
  trackHostSignup(): void {
    this.trackEvent('cta', 'host_signup_click', 'Become a Host');
  }

  /**
   * Track scroll depth milestones (25%, 50%, 75%, 90%)
   */
  trackScrollDepth(): void {
    const depth = this.getCurrentScrollDepth();
    const milestones = [25, 50, 75, 90];

    milestones.forEach((milestone) => {
      if (depth >= milestone && !this.scrollDepthTracked.has(milestone)) {
        this.scrollDepthTracked.add(milestone);
        this.trackEvent('scroll', 'depth_reached', `${milestone}%`, milestone);
      }
    });
  }

  /**
   * Track section impressions (when a section becomes visible)
   */
  trackSectionImpression(sectionName: string): void {
    this.trackEvent('impression', 'section_viewed', sectionName);
  }

  /**
   * Get current scroll depth as percentage
   */
  private getCurrentScrollDepth(): number {
    if (typeof window === 'undefined') return 0;

    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - windowHeight;

    if (docHeight === 0) return 0;

    const scrolled = window.scrollY;
    return Math.round((scrolled / docHeight) * 100);
  }

  /**
   * Log event to console in development
   */
  private logEvent(event: AnalyticsEvent): void {
    if (process.env.NODE_ENV === 'development') {
      console.log('[Landing Analytics]', event);
    }
  }

  /**
   * Get all tracked events
   */
  getEvents(): AnalyticsEvent[] {
    return [...this.events];
  }

  /**
   * Clear events
   */
  clearEvents(): void {
    this.events = [];
    this.scrollDepthTracked.clear();
  }

  /**
   * Get session duration in seconds
   */
  getSessionDuration(): number {
    return Math.round((Date.now() - this.sessionStart) / 1000);
  }

  /**
   * Send analytics to backend (stub for future implementation)
   */
  async sendAnalytics(): Promise<void> {
    if (this.events.length === 0) return;

    try {
      // This can be integrated with your analytics backend
      const payload = {
        events: this.events,
        sessionDuration: this.getSessionDuration(),
        timestamp: Date.now(),
      };

      if (process.env.NODE_ENV === 'development') {
        console.log('[Analytics Payload]', payload);
      }

      // TODO: Send to analytics endpoint
      // await fetch('/api/analytics', { method: 'POST', body: JSON.stringify(payload) });
    } catch (error) {
      console.error('Failed to send analytics:', error);
    }
  }
}

// Singleton instance
export const landingAnalytics = new LandingAnalytics();

/**
 * Hook for tracking scroll depth
 */
export function useScrollTracking(): void {
  if (typeof window === 'undefined') return;

  const handleScroll = () => {
    landingAnalytics.trackScrollDepth();
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
}

// Re-export React for the hook
import React from 'react';
