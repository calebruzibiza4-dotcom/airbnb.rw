export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#F5F2ED',
          50: '#FDFCFB',
          100: '#F5F2ED',
          200: '#EBE5DA',
          300: '#D8CFC0',
        },
        charcoal: {
          DEFAULT: '#111111',
          50: '#F7F7F7',
          100: '#E3E3E3',
          200: '#8A8A8A',
          700: '#2A2A2A',
          800: '#1A1A1A',
          900: '#111111',
        },
        brand: {
          DEFAULT: '#0A7C5C',
          50: '#E8F5F0',
          100: '#C5E8DB',
          200: '#8BCFB7',
          300: '#52B693',
          400: '#26A07A',
          500: '#0A7C5C',
          600: '#09704F',
          700: '#075F43',
          800: '#054F37',
          900: '#03402D',
        },
      },
      fontFamily: {
        display: ['"Clash Grotesk"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px rgba(15, 23, 42, 0.08)',
        card: '0 2px 8px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)',
        elevated: '0 20px 60px rgba(0,0,0,0.12)',
      },
      letterSpacing: {
        tightest: '-0.06em',
        tighter: '-0.04em',
        tight: '-0.02em',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'line-grow': {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'fade-in': 'fade-in 0.5s ease forwards',
        'line-grow': 'line-grow 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards',
      },
    },
  },
  plugins: [],
};
