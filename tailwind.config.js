const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
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
          default:defaultTheme.colors.red['600'],
        },
        primary: {
          hl: defaultTheme.colors.blue['200'],
          light: defaultTheme.colors.blue['500'],
          default: defaultTheme.colors.blue['600'],
          dark: defaultTheme.colors.blue['700'],
        },
        secondary: {
          hl: defaultTheme.colors.orange['200'],
          light: defaultTheme.colors.orange['400'],
          default: defaultTheme.colors.orange['600'],
          dark: defaultTheme.colors.orange['800'],
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