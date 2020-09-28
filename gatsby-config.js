require('dotenv').config({
  path: `.env.${process.env.NODE_ENV || 'development'}`
})

const frontendUrl = process.env.FRONTEND_URL.replace(/\/*$/, "") + "/";

module.exports = {
  siteMetadata: {
    name: 'Gatsby Template',
    siteUrl: frontendUrl,
  },
  plugins: [
    {
      resolve: `gatsby-plugin-postcss`,
      options: {
        postCssPlugins: [
          require("postcss-import"),
          require("postcss-nesting"),
          require(`postcss-preset-env`)({ stage: 0 }),
          require(`tailwindcss`)(`./tailwind.config.js`),
        ],
      },
    },
    {
      resolve: "gatsby-plugin-anchor-links",
      options: {
        offset: -100
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: `${__dirname}/src/images`,
      },
    },
    'gatsby-plugin-use-query-params',
    'gatsby-plugin-sitemap',
    'gatsby-transformer-sharp',
    'gatsby-plugin-sharp',
    `gatsby-plugin-typescript`,
    `gatsby-plugin-layout`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
  ],
}