const colors = require('tailwindcss/colors');

const config = {
  mode: 'jit',
  purge: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      colors: {
        orange: colors.orange
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif']
      }
    }
  },

  plugins: [
    require('@tailwindcss/aspect-ratio')
  ]
};

module.exports = config;
