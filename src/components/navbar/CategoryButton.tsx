import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

type CategoryButtonProps = {
  label: string;
  icon: LucideIcon;
  active?: boolean;
  onClick?: () => void;
};

export default function CategoryButton({ label, icon: Icon, active = false, onClick }: CategoryButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 ${active
        ? 'border-emerald-200 bg-emerald-600 text-white shadow-[0_10px_25px_rgba(16,185,129,0.16)]'
        : 'border-slate-200 bg-white text-slate-700 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700'}`}
    >
      <Icon className="h-4 w-4" strokeWidth={1.9} />
      <span>{label}</span>
    </motion.button>
  );
}
