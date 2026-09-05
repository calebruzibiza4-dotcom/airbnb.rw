'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { landingAnalytics } from '../../utils/analytics';

const propositions = [
  {
    number: '01',
    title: 'Discover',
    description: 'Find unique experiences, events, services and stays across Rwanda, all in one place.',
  },
  {
    number: '02',
    title: 'Explore',
    description: 'Venture beyond the usual routes and discover authentic Rwanda at your own pace.',
  },
  {
    number: '03',
    title: 'Connect',
    description: 'Meet local hosts, expert guides and community organizers who love sharing Rwanda.',
  },
];

/** Clip-path curtain reveal: text slides up from an invisible mask */
function RevealHeading({
  children,
  delay = 0,
  className = '',
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();
  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        initial={reduce ? false : { y: '105%' }}
        animate={inView ? { y: '0%' } : {}}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

function Prop({
  number,
  title,
  description,
  delay,
}: {
  number: string;
  title: string;
  description: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const numberY = useTransform(scrollYProgress, [0, 1], ['-15px', '25px']);

  return (
    <motion.div
      ref={ref}
      initial={reduce ? false : { opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className="relative pt-8"
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-white/10" aria-hidden="true" />

      <motion.span
        style={reduce ? {} : { y: numberY }}
        className="absolute top-6 right-0 font-display text-[7rem] font-800 leading-none tracking-tightest text-white/[0.04] select-none pointer-events-none"
        aria-hidden="true"
      >
        {number}
      </motion.span>

      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/40 mb-4">
        {number}
      </p>
      <h3 className="font-display text-2xl font-700 text-white mb-3 tracking-tight">
        {title}
      </h3>
      <p className="text-[0.9rem] leading-7 text-white/60 max-w-xs">
        {description}
      </p>
    </motion.div>
  );
}

export default function ValueProposition() {
  const titleRef = useRef<HTMLDivElement>(null);
  const inView = useInView(titleRef, { once: true, margin: '-80px' });
  const reduce = useReducedMotion();

  useEffect(() => {
    landingAnalytics.trackSectionImpression('value-proposition');
  }, []);

  return (
    <section className="relative py-28 bg-charcoal-900" aria-label="Why choose our platform">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Header */}
        <div ref={titleRef} className="mb-20">
          {/* Animated eyebrow line */}
          <div className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40 mb-6">
            <motion.span
              className="block h-px bg-brand"
              initial={reduce ? false : { width: 0 }}
              animate={inView ? { width: 32 } : {}}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden="true"
            />
            Why Us
          </div>

          {/* Clip-path headline: two lines stagger */}
          <div>
            <RevealHeading delay={0.15}>
              <h2 className="font-display text-4xl font-800 leading-tight tracking-tightest text-white sm:text-5xl lg:text-6xl text-balance">
                Built for how Rwanda should be explored.
              </h2>
            </RevealHeading>
          </div>
        </div>

        {/* Grid */}
        <div className="grid gap-0 md:grid-cols-3 md:gap-12 lg:gap-16">
          {propositions.map((prop, i) => (
            <Prop
              key={prop.number}
              number={prop.number}
              title={prop.title}
              description={prop.description}
              delay={i * 0.12}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
