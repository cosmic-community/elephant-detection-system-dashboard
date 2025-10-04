/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#10b981',
          foreground: '#ffffff',
          hover: '#059669',
        },
        secondary: {
          DEFAULT: '#64748b',
          foreground: '#ffffff',
          hover: '#475569',
        },
        danger: {
          DEFAULT: '#ef4444',
          foreground: '#ffffff',
          hover: '#dc2626',
        },
        warning: {
          DEFAULT: '#f59e0b',
          foreground: '#ffffff',
          hover: '#d97706',
        },
        success: {
          DEFAULT: '#10b981',
          foreground: '#ffffff',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}