/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        summit: {
          navy: '#1B2B4B',
          blue: '#0066A4',
          teal: '#0098A6',
          light: '#E8F4FD',
          green: '#2E7D32',
          amber: '#F57C00',
          red: '#C62828',
          gray: '#F5F7FA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
