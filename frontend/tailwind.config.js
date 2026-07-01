/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#e2a750',
          hover: '#c99344',
        },
        black: {
          DEFAULT: '#000000',
          soft: '#121212',
        },
        'bg-luxury': '#F4F4F4',
        primary: {
          green: '#b2eb99',
          dark: '#084224',
          light: '#e6f7e2',
        },
        accent: {
          orange: '#ff5630',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
