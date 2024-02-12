/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primaryBlue': {
          100: '#ccd9ff',
          200: '#4772ef',
          300: '#2655dc',
          400: '#153eb2',
        },
      },
    },
  },
  plugins: [],
}

