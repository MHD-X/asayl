/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        'xs': '480px',    // ✅ إضافة breakpoint جديد
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
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
