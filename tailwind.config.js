/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '58mm': '58mm',
        '80mm': '80mm',
      },
      maxWidth: {
        '58mm': '58mm',
        '80mm': '80mm',
      },
    },
  },
  plugins: [],
};
