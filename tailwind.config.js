/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkest: '#050505',
        swordGold: '#c5a059',
        ink: {
          950: '#000000',
          900: '#050505',
          850: '#0a0a0a',
          800: '#121212',
          700: '#1a1a1a',
          600: '#262626',
        },
        steel: {
          50: '#fbfbf9',
          100: '#f5f5f0',
          200: '#eaeaea',
          300: '#d4d4ce',
          400: '#a1a1a1',
          500: '#737373',
          600: '#525252',
        },
        vermillion: {
          DEFAULT: '#a83e32',
          muted: '#8f3329',
        },
        bronze: {
          light: '#dfc07e',
          DEFAULT: '#c5a059',
          dark: '#8b6e36',
        },
      },
      fontFamily: {
        serif: ['Cinzel', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'sheen': 'sheen 3s ease-in-out infinite',
      },
      keyframes: {
        sheen: {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
