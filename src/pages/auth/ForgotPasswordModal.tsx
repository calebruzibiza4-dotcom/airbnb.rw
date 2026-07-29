import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import AuthInput from './AuthInput';
import Divider from './Divider';
import ModalFooter from './ModalFooter';
import ModalHeader from './ModalHeader';

const recoverySchema = z.object({ email: z.string().email('Enter a valid email address.') });
type RecoveryValues = z.infer<typeof recoverySchema>;

type ForgotPasswordModalProps = {
  onClose: () => void;
  onBackToLogin: () => void;
};

export default function ForgotPasswordModal({ onClose, onBackToLogin }: ForgotPasswordModalProps) {
  const { register, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<RecoveryValues>({ resolver: zodResolver(recoverySchema) });
  const onSubmit = async () => new Promise((resolve) => setTimeout(resolve, 700));

  return (
    <motion.div key="forgot" initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }} transition={{ duration: 0.2 }}>
      <ModalHeader eyebrow="Account recovery" title="Reset your password" subtitle="Enter your email and we will send a secure link to help you get back on the road." />
      <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-4" noValidate>
        <AuthInput id="recovery-email" label="Email address" placeholder="you@example.com" autoComplete="email" {...register('email')} error={errors.email?.message} />
        {isSubmitSuccessful ? <p className="rounded-2xl bg-emerald-100 px-4 py-3 text-sm font-medium text-emerald-900">Check your inbox for a password reset link.</p> : null}
        <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.99 }} disabled={isSubmitting} type="submit" className="h-14 w-full rounded-2xl bg-emerald-800 px-4 py-3.5 text-sm font-bold text-white shadow-lg shadow-emerald-900/15 transition duration-200 hover:bg-emerald-900 disabled:cursor-not-allowed disabled:opacity-60 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-emerald-200">{isSubmitting ? 'Sending link...' : 'Send reset link'}</motion.button>
      </form>
      <div className="my-6"><Divider /></div>
      <ModalFooter prompt="Remembered your details?" action="Log in" onAction={onBackToLogin} />
      <button type="button" onClick={onClose} className="mx-auto mt-4 block text-xs font-semibold text-slate-400 transition hover:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700">Cancel</button>
    </motion.div>
  );
}
