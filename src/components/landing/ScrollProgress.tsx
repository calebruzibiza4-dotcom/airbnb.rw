import { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * Thin brand-coloured scroll progress bar fixed at the very top of the viewport.
 * Driven by native scroll position so it's always in sync.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setVisible(v > 0.01));
    return () => unsub();
  }, [scrollYProgress]);

  if (!visible) return null;

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-[2px] origin-left bg-brand"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
