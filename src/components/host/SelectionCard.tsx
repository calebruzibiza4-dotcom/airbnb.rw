import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

type SelectionCardProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  selected?: boolean;
  onClick?: () => void;
  children?: ReactNode;
};

export default function SelectionCard({ title, description, icon, selected = false, onClick, children }: SelectionCardProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ y: -2, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`w-full rounded-[24px] border p-5 text-left shadow-sm transition-all duration-200 ${selected ? 'border-emerald-400 bg-emerald-50 shadow-[0_12px_30px_rgba(16,185,129,0.13)]' : 'border-slate-200 bg-white hover:border-emerald-200 hover:bg-slate-50'}`}
    >
      <div className="flex items-start gap-3">
        {icon ? <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">{icon}</div> : null}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
          {children ? <div className="mt-3 space-y-1 text-sm text-slate-600">{children}</div> : null}
        </div>
      </div>
    </motion.button>
  );
}
