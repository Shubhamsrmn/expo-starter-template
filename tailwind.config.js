/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        'background-dark': '#0F172A',
        foreground: '#0F172A',
        'foreground-dark': '#F8FAFC',
        surface: '#FFFFFF',
        'surface-dark': '#1E293B',
        'surface-pressed': '#F1F5F9',
        'surface-pressed-dark': '#334155',
        border: '#E2E8F0',
        'border-dark': '#334155',
        muted: '#64748B',
        'muted-dark': '#94A3B8',
        accent: '#2563EB',
        'on-accent': '#FFFFFF',
      },
    },
  },
  plugins: [],
};
