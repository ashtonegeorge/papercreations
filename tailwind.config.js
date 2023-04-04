/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        amatic: ['Amatic SC', 'sans-serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        open: ['Open Sans', 'sans-serif'],
      },
      colors: {
        offwhite: {
          nude: '#E2D4C2',
          cream: '#F2EFE8',
          cashew: '#E5E0D0',
          gray: '#D3D4CC',
          bone: '#E9E8E0',
        },
      },
    },
  },
  plugins: [],
};
