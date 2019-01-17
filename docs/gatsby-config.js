module.exports = {
  pathPrefix: "/react-dropdown-select",
  plugins: [
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "markdown-pages",
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-catch-links`
  ],
  siteMetadata: {
    title: 'react-dropdown-select',
    description: 'Customisable dropdown select for react',
    navigation: [
      {
        path: '/',
        displayName: 'Home'
      },
      {
        path: 'api',
        displayName: 'API'
      },
      {
        path: 'demo',
        displayName: 'Demo'
      },
      {
        path: 'examples',
        displayName: 'Examples'
      }
    ],
  }
};
