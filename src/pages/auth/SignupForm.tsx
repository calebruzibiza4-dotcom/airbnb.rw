import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AuthDivider from './AuthDivider';
import AuthFooter from './AuthFooter';
import PasswordInput from './PasswordInput';
import SocialButtons from './SocialButtons';
import TextInput from './TextInput';

const signupSchema = z.object({
  firstName: z.string().min(2, 'Enter your first name.'), lastName: z.string().min(2, 'Enter your last name.'),
  email: z.string().email('Enter a valid email address.'), phone: z.string().min(7, 'Enter a valid phone number.'),
  password: z.string().min(8, 'Use at least 8 characters.'), confirmPassword: z.string(), terms: z.boolean().refine((value) => value, 'You must accept the terms to continue.'),
}).refine((values) => values.password === values.confirmPassword, { path: ['confirmPassword'], message: 'Passwords do not match.' });
type SignupValues = z.infer<typeof signupSchema>;

export default function SignupForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<SignupValues>({ resolver: zodResolver(signupSchema), defaultValues: { terms: false } });
  const onSubmit = async () => new Promise((resolve) => setTimeout(resolve, 700));

  return (
    <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }}>
      <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Your next chapter starts here</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">Create your account</h1>
      <p className="mt-4 text-base leading-7 text-slate-500">Join a community discovering Rwanda through local eyes.</p>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4" noValidate>
        <div className="grid gap-4 sm:grid-cols-2"><TextInput id="first-name" label="First name" placeholder="Aline" autoComplete="given-name" {...register('firstName')} error={errors.firstName?.message} /><TextInput id="last-name" label="Last name" placeholder="Mutesi" autoComplete="family-name" {...register('lastName')} error={errors.lastName?.message} /></div>
        <TextInput id="email" label="Email address" placeholder="you@example.com" autoComplete="email" {...register('email')} error={errors.email?.message} />
        <TextInput id="phone" label="Phone number" placeholder="+250 7xx xxx xxx" autoComplete="tel" {...register('phone')} error={errors.phone?.message} />
        <PasswordInput id="signup-password" label="Password" placeholder="Create a password" autoComplete="new-password" {...register('password')} error={errors.password?.message} />
        <PasswordInput id="confirm-password" label="Confirm password" placeholder="Repeat your password" autoComplete="new-password" {...register('confirmPassword')} error={errors.confirmPassword?.message} />
        <label className="flex items-start gap-3 pt-1 text-sm leading-5 text-slate-600"><input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-slate-300 accent-emerald-800 focus:ring-emerald-700" {...register('terms')} /><span>I agree to the <a href="#terms" className="font-semibold text-emerald-800 underline underline-offset-4">Terms &amp; Privacy Policy</a>.</span></label>
        {errors.terms ? <p className="text-xs font-medium text-rose-600">{errors.terms.message}</p> : null}
        <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }} disabled={isSubmitting} type="submit" className="h-14 w-full rounded-2xl bg-emerald-800 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition duration-200 hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200">{isSubmitting ? 'Creating your account...' : 'Create Account'}</motion.button>
      </form>
      <div className="my-7"><AuthDivider /></div><SocialButtons /><div className="mt-8"><AuthFooter prompt="Already have an account?" linkText="Log In" href="/login" /></div>
    </motion.div>
  );
}
