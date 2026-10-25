/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // ── Luminous Crystal Glassmorphism Palette ─────────────────────────
      colors: {
        // Parchment / Glass surfaces — crystal frosted opacities
        parchment: {
          50:  'rgba(255, 255, 255, 0.65)',
          100: 'rgba(255, 255, 255, 0.78)',
          200: 'rgba(255, 255, 255, 0.88)',
          300: '#f5edd9',
          400: '#eedfc0',
          500: '#d4b77f',
          600: '#c29f62',
          700: '#a38048',
          800: '#7d6135',
          900: '#5a4524',
        },
        // Saffron — radiant sacred vermilion & sunset ember
        saffron: {
          50:  '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        },
        // Ink — rich deep espresso & warm charcoal for ultra-clean legibility
        ink: {
          50:  '#fdfcfb',
          100: '#f8f5f1',
          200: '#eee7de',
          300: '#d6c9bc',
          400: '#b29f8f',
          500: '#8c7766',
          600: '#695545',
          700: '#4a3b2f',
          800: '#2b2119',
          900: '#16110e',
        },
        // Gold / Brass — Sarovar temple gold & antique brass
        gold: {
          200: '#fef08a',
          300: '#fde68a',
          400: '#fcd34d',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
        },
        sarovar: {
          light: '#67e8f9',
          DEFAULT: '#06b6d4',
          dark: '#0e7490',
        },
        brass: {
          light: '#f5d285',
          DEFAULT: '#d4a359',
          dark: '#996515',
        },
        heritage: {
          50:  '#fdf8f0',
          100: '#faefd9',
          200: '#f4ddb3',
          300: '#ecc482',
          400: '#e2a44d',
          500: '#d98c2a',
          600: '#c4751f',
          700: '#a35c1b',
          800: '#84491c',
          900: '#6c3d1a',
        },
      },

      // ── Fonts
      fontFamily: {
        display: ['"Fraunces"', 'Georgia', 'serif'],
        serif:   ['"Fraunces"', 'Georgia', 'serif'],
        cinzel:  ['"Outfit"', 'system-ui', 'sans-serif'],
        sans:    ['"Outfit"', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['"Outfit"', 'system-ui', 'sans-serif'],
      },

      // ── Crystal Glass Shadows & Glows ──────────────────────────────────
      boxShadow: {
        'glass':       '0 16px 36px -6px rgba(45, 26, 12, 0.08), 0 2px 8px rgba(45, 26, 12, 0.03), inset 0 1px 1px 0 rgba(255, 255, 255, 0.95)',
        'glass-hover': '0 22px 48px -8px rgba(234, 88, 12, 0.16), 0 0 25px rgba(245, 158, 11, 0.15), inset 0 1px 1px 0 #ffffff',
        'glass-dock':  '0 20px 48px -10px rgba(40, 20, 10, 0.18), inset 0 1px 1px 0 rgba(255, 255, 255, 0.95)',
        'glow-gold':   '0 0 25px rgba(245, 158, 11, 0.45)',
        'glow-cyan':   '0 0 25px rgba(6, 182, 212, 0.35)',
        'card':        '0 14px 34px -8px rgba(45, 26, 12, 0.07), inset 0 1px 1px 0 rgba(255, 255, 255, 0.9)',
        'retro':       '3px 3px 0px rgba(22, 17, 14, 0.85)',
        'retro-sm':    '2px 2px 0px rgba(22, 17, 14, 0.85)',
      },

      // ── Animations
      keyframes: {
        'float-up': {
          '0%':   { transform: 'translateY(100vh) scale(1)',   opacity: '0' },
          '10%':  { opacity: '0.8' },
          '85%':  { opacity: '0.4' },
          '100%': { transform: 'translateY(-10vh) scale(0.3)', opacity: '0' },
        },
        'fade-up': {
          '0%':   { transform: 'translateY(16px)', opacity: '0' },
          '100%': { transform: 'translateY(0)',     opacity: '1' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 12px rgba(245,158,11,0.35)' },
          '50%':      { boxShadow: '0 0 28px rgba(245,158,11,0.65), 0 0 45px rgba(234,88,12,0.3)' },
        },
        'float-3d': {
          '0%, 100%': { transform: 'translateY(0px) rotateX(0deg) rotateZ(0deg)' },
          '33%': { transform: 'translateY(-8px) rotateX(5deg) rotateZ(1deg)' },
          '66%': { transform: 'translateY(-4px) rotateX(-3deg) rotateZ(-1deg)' },
        },
        'slide-in-up': {
          '0%': { transform: 'translateY(24px) scale(0.98)', opacity: '0' },
          '100%': { transform: 'translateY(0) scale(1)', opacity: '1' },
        },
        'scale-pop': {
          '0%': { transform: 'scale(0.85)', opacity: '0' },
          '70%': { transform: 'scale(1.03)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'compass-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'plane-fly': {
          '0%': { transform: 'translateX(-20px) translateY(8px) rotate(-8deg)', opacity: '0' },
          '20%': { opacity: '0.85' },
          '80%': { opacity: '0.85' },
          '100%': { transform: 'translateX(20px) translateY(-8px) rotate(-8deg)', opacity: '0' },
        },
        'aurora-drift': {
          '0%, 100%': { transform: 'translate(0px, 0px) scale(1)' },
          '50%':      { transform: 'translate(25px, -18px) scale(1.06)' },
        },
      },
      animation: {
        'float-up':     'float-up linear infinite',
        'fade-up':      'fade-up 0.5s ease-out forwards',
        'pulse-glow':   'pulse-glow 2.5s ease-in-out infinite',
        'float-3d':     'float-3d 6s ease-in-out infinite',
        'slide-in-up':  'slide-in-up 0.45s cubic-bezier(0.34, 1.3, 0.64, 1) forwards',
        'scale-pop':    'scale-pop 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'compass-spin': 'compass-spin 25s linear infinite',
        'plane-fly':    'plane-fly 14s ease-in-out infinite',
        'aurora-drift': 'aurora-drift 14s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
