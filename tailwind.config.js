const { colors } = require('@abdt/design-tokens');

module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.tsx'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
