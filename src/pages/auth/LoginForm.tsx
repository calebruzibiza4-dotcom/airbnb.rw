import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AuthDivider from './AuthDivider';
import AuthFooter from './AuthFooter';
import PasswordInput from './PasswordInput';
import SocialButtons from './SocialButtons';
import TextInput from './TextInput';

const loginSchema = z.object({
  identity: z.string().min(1, 'Enter your email or phone number.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});
type LoginValues = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });
  const onSubmit = async () => new Promise((resolve) => setTimeout(resolve, 700));

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Welcome back to Mara</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Welcome Back</h1>
      <p className="mt-4 max-w-md text-base leading-7 text-slate-500">Continue your journey through Rwanda, one memorable stay at a time.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
        <TextInput id="identity" label="Email or phone number" placeholder="you@example.com" autoComplete="username" {...register('identity')} error={errors.identity?.message} />
        <PasswordInput id="login-password" label="Password" placeholder="Enter your password" autoComplete="current-password" {...register('password')} error={errors.password?.message} />
        <div className="flex justify-end">
          <a href="/forgot-password" className="text-sm font-bold text-emerald-800 transition hover:text-emerald-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">Forgot Password?</a>
        </div>
        <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }} disabled={isSubmitting} type="submit" className="h-14 w-full rounded-2xl bg-emerald-800 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition duration-200 hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200">
          {isSubmitting ? 'Signing you in...' : 'Log in'}
        </motion.button>
      </form>
      <div className="my-7"><AuthDivider /></div>
      <SocialButtons />
      <div className="mt-8"><AuthFooter prompt="Don&apos;t have an account?" linkText="Create one" href="/signup" /></div>
    </motion.div>
  );
}
