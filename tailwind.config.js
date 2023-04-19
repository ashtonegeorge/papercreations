/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        amatic: ['Amatic SC', 'sans-serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        open: ['Open Sans', 'sans-serif'],
      },
      colors: {
        palette: {
          forest: '#283618',
          army: '#606C38',
          tea: '#CCD5AE',
          bean: '#E9EDC9',
          cream: '#FEFAE0',
          sand: '#FAEDCD',
          clay: '#D4A373',
          burnt: '#BC6C25',
        },
      },
    },
  },
  plugins: [require('flowbite/plugin')],
};
