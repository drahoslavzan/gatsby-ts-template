const colors = require('tailwindcss/colors');

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: [
    "./src/**/*.js", "./src/**/*.jsx", "./src/**/*.ts", "./src/**/*.tsx",
  ],
  theme: {
    extend: {
      padding: {
        'v169': '56.25%',
      },
      minWidth: {
        '1/4': '25%',
      },
      colors: {
        error: {
          DEFAULT: colors.red['600'],
        },
        primary: {
          DEFAULT: colors.blue['600'],
          hl: colors.blue['200'],
          light: colors.blue['500'],
          dark: colors.blue['700'],
        },
        secondary: {
          DEFAULT: colors.orange['600'],
          hl: colors.orange['200'],
          light: colors.orange['400'],
          dark: colors.orange['800'],
        },
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/custom-forms'),
    require('@tailwindcss/typography'),
  ]
}