const { colors } = require('@abdt/design-tokens');

const ABDT_COLORS = ['neon', 'mint'];

const themeColors = Object.entries(colors)
  .filter(([key]) => ABDT_COLORS.some(x => key.includes(x)))
  .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

module.exports = {
  purge: {
    enabled: false,
    content: ['./src/**/*.tsx'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        abdt: themeColors,
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['active'],
    },
  },
  plugins: [],
};
