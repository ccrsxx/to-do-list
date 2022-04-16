const colors = require('tailwindcss/colors');
const forms = require('@tailwindcss/forms');

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      transitionProperty: {
        height: 'height'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        'nav-bg': '#db4c3f',
        'sidebar-bg': '#f7f7f7',
        'main-color': colors.gray[600],
        'white-ish': 'rgba(0, 0, 0, 0.2)'
      }
    }
  },
  plugins: [
    forms,
    ({ addVariant }) => {
      addVariant('children', '& > *');
    }
  ]
};
