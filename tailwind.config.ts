import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Core brand palette — see README "Brand & Design Tokens"
        ink: '#0B0F17', // primary background
        'ink-raised': '#0E1420', // slightly lighter panel background
        primary: {
          DEFAULT: '#0F4C81',
          light: '#1A6BAE',
          dark: '#0A3660',
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#E6C866',
          dim: '#8A7228',
        },
        line: 'rgba(212,175,55,0.16)',
        mist: '#9AA5B1', // muted body text on dark
      },
      fontFamily: {
        display: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'grid-overlay':
          'linear-gradient(rgba(212,175,55,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.05) 1px, transparent 1px)',
        'radial-fade':
          'radial-gradient(60% 60% at 50% 0%, rgba(15,76,129,0.35) 0%, rgba(11,15,23,0) 70%)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.35)',
        gold: '0 0 0 1px rgba(212,175,55,0.25), 0 8px 24px rgba(212,175,55,0.08)',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
      letterSpacing: {
        widest2: '0.28em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 30s linear infinite',
      },
    },
  },
  plugins: [],
} satisfies Config
