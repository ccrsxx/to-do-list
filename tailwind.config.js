module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      },
      colors: {
        'nav-bg': '#db4c3f',
        'sidebar-bg': '#f7f7f7',
        'main-color': '#212529',
        'white-ish': 'rgba(0, 0, 0, 0.2)'
      }
    }
  },
  plugins: [
    ({ addVariant }) => {
      addVariant('children', '& > *');
    }
  ]
};
