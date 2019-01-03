module.exports = {
  pathPrefix: "/react-dropdown-select",
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: "markdown-pages",
      },
    },
    `gatsby-transformer-remark`,
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
        path: 'props',
        displayName: 'Props'
      },
      {
        path: 'demo',
        displayName: 'Demo'
      }
    ],
  }
};
