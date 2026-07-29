import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useAuthSession } from '../../auth/AuthSessionProvider';
import AuthInput from './AuthInput';
import Divider from './Divider';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';
import PasswordInput from './PasswordInput';
import SocialButtons from './SocialButtons';

const loginSchema = z.object({
  identity: z.string().min(1, 'Enter your email or phone number.'),
  password: z.string().min(8, 'Password must be at least 8 characters.'),
});
type LoginValues = z.infer<typeof loginSchema>;

type LoginModalProps = {
  onSwitchToSignup: () => void;
  onForgotPassword: () => void;
};

export default function LoginModal({ onSwitchToSignup, onForgotPassword }: LoginModalProps) {
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<LoginValues>({ resolver: zodResolver(loginSchema) });
  const { signIn, updateSession } = useAuthSession();
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackTone, setFeedbackTone] = useState<'success' | 'error'>('success');

  const onSubmit = async (values: LoginValues) => {
    setFeedback(null);

    try {
      const success = await signIn({ identity: values.identity, password: values.password });
      if (!success) {
        setFeedbackTone('error');
        setFeedback('Unable to log in.');
        return;
      }

      setFeedbackTone('success');
      setFeedback('Logged in');
      reset();
    } catch {
      setFeedbackTone('error');
      setFeedback('Unable to reach the login service.');
    }
  };

  return (
    <motion.div key="login" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 12 }} transition={{ duration: 0.2 }}>
      <ModalHeader eyebrow="Welcome back to Inzu Stay" title="Welcome Back" subtitle="Log in to continue exploring Rwanda." />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4" noValidate>
        <AuthInput id="modal-identity" label="Email or phone number" placeholder="you@example.com" autoComplete="username" {...register('identity')} error={errors.identity?.message} />
        <PasswordInput id="modal-login-password" label="Password" placeholder="Enter your password" autoComplete="current-password" {...register('password')} error={errors.password?.message} />
        <div className="flex justify-end pt-1"><button type="button" onClick={onForgotPassword} className="text-sm font-bold text-emerald-800 transition hover:text-emerald-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">Forgot Password?</button></div>
        {feedback ? (
          <div className={`rounded-2xl border px-4 py-3 text-sm ${feedbackTone === 'success' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-rose-200 bg-rose-50 text-rose-700'}`}>
            {feedback}
          </div>
        ) : null}
        <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }} disabled={isSubmitting} type="submit" className="h-14 w-full rounded-2xl bg-emerald-800 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition duration-200 hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200">{isSubmitting ? 'Logging you in...' : 'Log In'}</motion.button>
      </form>
      <div className="my-6"><Divider /></div>
      <SocialButtons />
      <div className="mt-7"><ModalFooter prompt="Don&apos;t have an account?" action="Create Account" onAction={onSwitchToSignup} /></div>
    </motion.div>
  );
}
