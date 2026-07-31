import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

type CategoryBoxProps = {
  label: string;
  description: string;
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;
};

export default function CategoryBox({ label, description, icon: Icon, active = false, onClick }: CategoryBoxProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      aria-pressed={active}
      className={`group relative flex min-w-[120px] shrink-0 flex-col items-center gap-2 rounded-2xl border px-3 py-3 text-center transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 sm:min-w-[132px] sm:px-4 ${active
        ? 'border-emerald-200 bg-emerald-50/80 text-emerald-800 shadow-[0_10px_25px_rgba(16,185,129,0.12)]'
        : 'border-transparent bg-white text-slate-700 hover:border-emerald-100 hover:bg-emerald-50/50 hover:text-emerald-700'}`}
    >
      <span className={`flex h-10 w-10 items-center justify-center rounded-full border transition-all duration-200 ${active ? 'border-emerald-200 bg-white text-emerald-700' : 'border-slate-200 bg-slate-50 text-slate-600 group-hover:border-emerald-200 group-hover:bg-white group-hover:text-emerald-700'}`}>
        <Icon className="h-5 w-5" strokeWidth={1.8} />
      </span>
      <span className={`text-[13px] font-semibold leading-tight ${active ? 'font-semibold' : 'font-medium'}`}>{label}</span>
      <span className={`text-[11px] text-slate-500 ${active ? 'text-emerald-700/80' : 'group-hover:text-emerald-700/80'}`}>{description}</span>
      <span className={`mt-1 h-[2px] w-full rounded-full transition-all duration-200 ${active ? 'bg-emerald-600' : 'bg-transparent group-hover:bg-emerald-200'}`} />
    </motion.button>
  );
}
