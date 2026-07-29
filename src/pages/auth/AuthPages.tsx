import { motion } from 'framer-motion';
import AuthFooter from './AuthFooter';
import AuthLayout from './AuthLayout';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

function SimpleAuthPage({ type }: { type: 'forgot' | 'reset' | 'verify' }) {
  const content = {
    forgot: { eyebrow: 'Account recovery', title: 'Forgot your password?', body: 'Enter your email and we will send a secure link to help you get back on the road.', action: 'Send reset link', fields: ['Email address'] },
    reset: { eyebrow: 'New beginning', title: 'Set a new password', body: 'Choose a strong password to keep your Mara account and travel plans secure.', action: 'Reset password', fields: ['New password', 'Confirm password'] },
    verify: { eyebrow: 'One last step', title: 'Verify your email', body: 'We sent a verification link to your inbox. Confirm your email to unlock your Mara journey.', action: 'Resend email', fields: [] },
  }[type];

  return <AuthLayout><motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}><p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">{content.eyebrow}</p><h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{content.title}</h1><p className="mt-4 max-w-md text-base leading-7 text-slate-500">{content.body}</p><form className="mt-8 space-y-5" onSubmit={(event) => event.preventDefault()}>{content.fields.map((field) => <label key={field} className="block space-y-2 text-sm font-semibold text-slate-800">{field}<input type={field.toLowerCase().includes('password') ? 'password' : 'email'} className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 font-normal outline-none transition focus:border-emerald-700 focus:ring-4 focus:ring-emerald-100" placeholder={field} /></label>)}<button type="submit" className="h-14 w-full rounded-2xl bg-emerald-800 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition hover:bg-emerald-900 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200">{content.action}</button></form><div className="mt-8"><AuthFooter prompt="Remembered your details?" linkText="Log in" href="/login" /></div></motion.div></AuthLayout>;
}

export default function AuthPages({ pathname }: { pathname: string }) {
  if (pathname === '/signup') return <AuthLayout><SignupForm /></AuthLayout>;
  if (pathname === '/forgot-password') return <SimpleAuthPage type="forgot" />;
  if (pathname === '/reset-password') return <SimpleAuthPage type="reset" />;
  if (pathname === '/verify-email') return <SimpleAuthPage type="verify" />;
  return <AuthLayout><LoginForm /></AuthLayout>;
}
