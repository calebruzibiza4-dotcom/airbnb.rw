import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

type CategoryCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  href: string;
};

export default function CategoryCard({ title, description, icon: Icon, href }: CategoryCardProps) {
  return (
    <motion.a
      href={href}
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className="group flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all duration-200 hover:border-emerald-200 hover:bg-emerald-50/70 hover:shadow-md"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 transition duration-200 group-hover:bg-emerald-100">
        <Icon className="h-5 w-5" strokeWidth={1.9} />
      </div>
      <div className="mt-3">
        <p className="text-sm font-semibold text-slate-900">{title}</p>
        <p className="mt-1 text-sm text-slate-600">{description}</p>
      </div>
    </motion.a>
  );
}
