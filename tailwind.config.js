const { colors } = require('@abdt/design-tokens');

module.exports = {
  // purge: {
  //   enabled: false,
  //   content: ['./src/**/*.tsx'],
  // },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        abdt: colors,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
