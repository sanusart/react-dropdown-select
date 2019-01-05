const path = require('path');

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  const blogPostTemplate = path.resolve(`src/templates/page-template.js`);

  return graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }, limit: 1000) {
        edges {
          node {
            frontmatter {
              path
              demo
              innerState
              innerProps
              innerMethods
            }
          }
        }
      }
    }
  `).then((result) => {
    if (result.errors) {
      return Promise.reject(result.errors);
    }

    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      createPage({
        path: node.frontmatter.path,
        demo: node.frontmatter.demo || null,
        innerState: node.frontmatter.innerState || null,
        innerProps: node.frontmatter.innerProps || null,
        innerMethods: node.frontmatter.innerMethods || null,
        component: blogPostTemplate,
        context: {
          all: node.frontmatter
        } // additional data can be passed via context
      });
    });
  });
};
