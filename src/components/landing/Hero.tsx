'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { landingAnalytics } from '../../utils/analytics';
import { getLandingConfig } from '../../utils/landingConfig';

interface HeroProps {
  onExploreClick: () => void;
  onHostClick: () => void;
}

/* ── Clip-path reveal: text slides up from behind an invisible curtain ── */
function RevealLine({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className="overflow-hidden">
      <motion.div
        initial={reduce ? false : { y: '110%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.85, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ── Simple fade-up ── */
function FadeUp({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { y: 24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Hero({ onExploreClick, onHostClick }: HeroProps) {
  const config = getLandingConfig();
  const reduce = useReducedMotion();

  /* Scroll-driven exit animation */
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const heroContentY = useTransform(scrollYProgress, [0, 1], ['0px', '-45px']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.2]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.97]);
  const cardY = useTransform(scrollYProgress, [0, 1], ['0px', '-90px']);
  const floatingCardY = useTransform(scrollYProgress, [0, 1], ['0px', '-50px']);

  useEffect(() => {
    landingAnalytics.trackSectionImpression('hero');
  }, []);

  const handleExploreClick = () => {
    landingAnalytics.trackCTAClick('Start Exploring', 'hero');
    onExploreClick();
  };

  const handleHostClick = () => {
    landingAnalytics.trackHostSignup();
    onHostClick();
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden bg-cream"
      aria-label="Hero section"
    >
      {/* Subtle noise grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
          backgroundSize: '128px 128px',
        }}
        aria-hidden="true"
      />

      <motion.div
        style={reduce ? {} : { y: heroContentY, opacity: heroOpacity, scale: heroScale }}
        className="relative z-10 mx-auto max-w-7xl px-6 pb-20 pt-36 lg:px-8 lg:pt-44"
      >
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_0.9fr]">

          {/* Left column */}
          <div className="flex flex-col">

            {/* Eyebrow label with animated line */}
            <FadeUp delay={0} className="mb-8">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-charcoal-200">
                <motion.span
                  className="block h-px bg-brand"
                  initial={reduce ? false : { width: 0 }}
                  animate={{ width: 32 }}
                  transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                  aria-hidden="true"
                />
                Rwanda Marketplace
              </span>
            </FadeUp>

            {/* Headline: clip-path curtain reveal, each line staggered */}
            <h1
              className="font-display text-[3.25rem] font-800 leading-[0.92] tracking-tightest text-charcoal-900 sm:text-[4.5rem] lg:text-[5.75rem]"
              aria-label="Discover Rwanda your way."
            >
              <RevealLine delay={0.1}>Discover</RevealLine>
              <RevealLine delay={0.2}>Rwanda{' '}
                <span className="italic text-brand">your way.</span>
              </RevealLine>
            </h1>

            {/* Sub-copy */}
            <FadeUp delay={0.38} className="mt-7">
              <p className="max-w-md text-base leading-7 text-charcoal-200 sm:text-lg">
                Stays, experiences, events and services, curated by local hosts who know Rwanda best.
              </p>
            </FadeUp>

            {/* CTAs */}
            <FadeUp delay={0.48} className="mt-10">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <motion.button
                  onClick={handleExploreClick}
                  whileHover={reduce ? {} : { y: -2, boxShadow: '0 20px 40px rgba(0,0,0,0.18)' }}
                  whileTap={reduce ? {} : { scale: 0.97 }}
                  transition={{ duration: 0.2 }}
                  className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-charcoal-900 px-7 py-3.5 text-sm font-semibold text-cream shadow-elevated transition-colors hover:bg-charcoal-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-900 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
                  aria-label="Start exploring Rwanda"
                >
                  Start Exploring
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden="true" />
                </motion.button>

                <button
                  onClick={handleHostClick}
                  className="inline-flex items-center justify-center gap-1.5 px-2 py-3.5 text-sm font-semibold text-charcoal-900 underline underline-offset-4 decoration-charcoal-900/30 hover:decoration-charcoal-900 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-charcoal-900 rounded-lg"
                  aria-label="List your experience as a host"
                >
                  List your experience
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </FadeUp>

            {/* Trust line */}
            <FadeUp delay={0.56} className="mt-8">
              <p className="text-xs text-charcoal-200">
                Trusted by travelers and local hosts across Rwanda.
              </p>
            </FadeUp>
          </div>

          {/* Right column: parallax abstract card */}
          <div className="relative hidden lg:block">
            {/* Main card with parallax scroll */}
            <motion.div
              initial={reduce ? false : { opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={reduce ? {} : { y: cardY }}
              className="relative overflow-hidden rounded-2xl bg-charcoal-900 aspect-[4/5]"
            >
              {/* Grid background */}
              <div aria-hidden="true" className="absolute inset-0">
                <div className="absolute -top-24 -right-24 h-80 w-80 rounded-full border border-white/5" />
                <div className="absolute -top-12 -right-12 h-56 w-56 rounded-full border border-white/5" />
                <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-brand/20 to-transparent" />
                <svg
                  className="absolute inset-0 h-full w-full opacity-[0.07]"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
                      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
              </div>

              {/* Content layer */}
              <div className="relative flex h-full flex-col justify-between p-8">
                <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/40">
                  Inzu Stay
                </span>
                <div className="text-center select-none" aria-hidden="true">
                  <p className="font-display text-[8rem] font-800 leading-none tracking-tightest text-white/5">
                    RW
                  </p>
                  <div className="mt-4 flex justify-center gap-3">
                    {['Stays', 'Experiences', 'Events', 'Services'].map((cat) => (
                      <span
                        key={cat}
                        className="rounded-lg border border-white/10 px-2.5 py-1 text-[10px] font-medium text-white/50"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-px flex-1 bg-white/10" aria-hidden="true" />
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-white/40">
                    Kigali, Rwanda
                  </span>
                  <div className="h-px flex-1 bg-white/10" aria-hidden="true" />
                </div>
              </div>

              <div className="absolute top-8 right-8 h-3 w-3 rounded-full bg-brand" aria-hidden="true" />
            </motion.div>

            {/* Floating info card: parallaxes at different rate (depth effect) */}
            <motion.div
              initial={reduce ? false : { opacity: 0, x: 16, y: 16 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.75, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={reduce ? {} : { y: floatingCardY }}
              className="absolute -bottom-6 -left-8 rounded-xl border border-charcoal-900/8 bg-cream px-5 py-4 shadow-elevated"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-charcoal-200">
                Local hosts
              </p>
              <p className="mt-1 text-sm font-semibold text-charcoal-900">
                Across all of Rwanda
              </p>
            </motion.div>
          </div>

        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2" aria-hidden="true">
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex h-8 w-8 items-center justify-center rounded-full border border-charcoal-900/15 bg-cream/80 backdrop-blur-sm"
        >
          <svg className="h-3.5 w-3.5 text-charcoal-900" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14m0 0 6-6m-6 6-6-6" />
          </svg>
        </motion.div>
      </div>
    </section>
  );
}
