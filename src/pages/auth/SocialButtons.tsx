import { faApple, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { motion } from 'framer-motion';

export default function SocialButtons() {
  const handleGoogleSignIn = () => {
    window.location.assign('/api/auth/signin/google');
  };

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <motion.button
        type="button"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleGoogleSignIn}
        className="flex h-12 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2"
      >
        <FontAwesomeIcon icon={faGoogle} size="lg" style={{ color: '#4285F4' }} />
      </motion.button>
      <motion.button type="button" whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="flex h-12 items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-white text-sm font-semibold text-slate-800 transition hover:border-slate-300 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2">
        <FontAwesomeIcon icon={faApple} size="lg" style={{ color: 'rgb(4, 3, 0)' }} />
      </motion.button>
    </div>
  );
}
