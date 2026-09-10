import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../theme/ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="group inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition duration-300 hover:border-emerald-300 hover:bg-emerald-50 hover:text-emerald-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700 focus-visible:ring-offset-2 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:border-emerald-500/50 dark:hover:bg-emerald-500/10 dark:hover:text-emerald-300"
    >
      {isDark ? <Sun className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" /> : <Moon className="h-4 w-4 transition-transform duration-300 group-hover:-rotate-12" />}
    </button>
  );
}
