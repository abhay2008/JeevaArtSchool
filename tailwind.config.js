/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./context/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        serif: ["var(--font-display)", "Georgia", "serif"],
      },
      colors: {
        art: {
          acrylic: { light: '#f97316', dark: '#ea580c' },
          water: { light: '#3b82f6', dark: '#2563eb' },
          tanjore: { light: '#eab308', dark: '#ca8a04' },
          oil: { light: '#10b981', dark: '#059669' },
          pencil: { light: '#8b5cf6', dark: '#7c3aed' },
          student: { light: '#06b6d4', dark: '#0891b2' },
        }
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
