import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        surface: '#f8fafc',
        'surface-hover': '#f1f5f9',
        'violet-primary': '#7c3aed',
        'violet-light': '#a78bfa',
        'violet-soft': '#f5f3ff',
        'indigo-vibrant': '#6366f1',
        'text-primary': '#020617',
        'text-secondary': '#64748b',
        'border-soft': 'rgba(0, 0, 0, 0.05)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.04em',
        tight: '-0.02em',
      },
      lineHeight: {
        tightest: '0.9',
        tight: '1.1',
      },
      boxShadow: {
        'premium': '0 20px 50px rgba(0, 0, 0, 0.05)',
        'premium-hover': '0 30px 60px rgba(124, 58, 237, 0.1)',
      }
    },
  },
  plugins: [],
}
export default config
