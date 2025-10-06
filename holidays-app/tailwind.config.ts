/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brazil: {
          DEFAULT: '#47A1C3',
          light: '#E8F2FF',
          dark: '#3A87A4',
        },
        colombia: {
          DEFAULT: '#FF6B6B',
          light: '#FFE5E5',
          dark: '#FF5252',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

