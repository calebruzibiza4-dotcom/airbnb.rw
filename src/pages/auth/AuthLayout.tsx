import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import AuthHeader from './AuthHeader';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-[#f7f8f5] text-slate-900">
      <div className="mx-auto grid min-h-screen max-w-[1440px] lg:grid-cols-[0.92fr_1.08fr]">
        <section className="relative hidden overflow-hidden bg-emerald-950 lg:block">
          <img src="https://images.unsplash.com/photo-1528360983277-13d401cdc186?auto=format&fit=crop&w=1400&q=85" alt="Green hills and misty landscape in Rwanda" className="absolute inset-0 h-full w-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-950 via-emerald-950/20 to-emerald-950/10" />
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }} className="absolute inset-x-10 bottom-12 text-white xl:inset-x-16">
            <p className="mb-4 text-xs font-bold uppercase tracking-[0.28em] text-emerald-200">Travel deeper</p>
            <h2 className="max-w-xl text-4xl font-semibold leading-tight xl:text-5xl">Find the Rwanda that stays with you.</h2>
            <p className="mt-5 max-w-md text-sm leading-6 text-emerald-50/80">Thoughtful stays, local hosts, and unforgettable ways to experience the Land of a Thousand Hills.</p>
          </motion.div>
        </section>
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-10 lg:px-16">
          <div className="w-full max-w-[510px]">
            <AuthHeader />
            {children}
            <p className="mt-8 text-center text-xs leading-5 text-slate-400">By continuing, you agree to Mara&apos;s Terms of Service and Privacy Policy.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
