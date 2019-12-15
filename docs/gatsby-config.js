module.exports = {
  pathPrefix: process.env.NETLIFY ?  '/' : '/react-dropdown-select',
  plugins: [
    {
      resolve: 'gatsby-plugin-emotion'
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'markdown-pages'
      }
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        commonmark: true,
        footnotes: true,
        pedantic: true,
        gfm: true,
        plugins: [],
      },
    },
    'gatsby-plugin-catch-links'
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
    ]
  }
};
