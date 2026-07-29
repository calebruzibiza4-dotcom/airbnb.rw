import { motion } from 'framer-motion';

export default function AuthHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="mb-8"
    >
      <a href="#" className="inline-flex items-center gap-3 text-slate-950 transition hover:opacity-75 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-4">
        <span className="grid h-11 w-11 place-items-center rounded-2xl bg-emerald-800 text-white shadow-lg shadow-emerald-900/20">
          <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M5 18 9.5 6h5L19 18" />
            <path d="M7 14h10" />
          </svg>
        </span>
        <span className="text-xl font-bold tracking-tight">Mara</span>
      </a>
    </motion.div>
  );
}
