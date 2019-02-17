import React from 'react';
import { graphql } from 'gatsby';
import Header from '../components/header';
import Footer from '../components/footer';

import '../styles.css';

export default function Template({ data }) {
  const { page, propsPage, statePage, methodsPage } = data;
  const { frontmatter: pageFrontmatter, html: pageHtml } = page;
  const { html: propsHtml } = propsPage;
  const { html: stateHtml } = statePage;
  const { html: methodsHtml } = methodsPage;

  return (
    <div className="container px2 sm-px3">
      <Header title={pageFrontmatter.title} />

      <article dangerouslySetInnerHTML={{ __html: pageHtml }} />

      {pageFrontmatter.innerProps && (
        <details>
          <summary>props</summary>
          <div dangerouslySetInnerHTML={{ __html: propsHtml }} />
        </details>
      )}

      {pageFrontmatter.innerState && (
        <details>
          <summary>state</summary>
          <div dangerouslySetInnerHTML={{ __html: stateHtml }} />
        </details>
      )}

      {pageFrontmatter.innerMethods && (
        <details>
          <summary>methods</summary>
          <div dangerouslySetInnerHTML={{ __html: methodsHtml }} />
        </details>
      )}

      <br />

      {pageFrontmatter.demo && (
        <iframe
          title={pageFrontmatter.title}
          src={`https://codesandbox.io/embed/${pageFrontmatter.demo}?autoresize=1&hidenavigation=1`}
          style={{
            width: '100%',
            height: '500px',
            border: 0,
            borderRadius: '4px',
            overflow: 'hidden'
          }}
          sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"
        />
      )}
      <Footer />
    </div>
  );
}

export const pageQuery = graphql`
  query($path: String) {
    page: markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
        demo
        innerProps
        innerState
        innerMethods
      }
    }
    methodsPage: markdownRemark(frontmatter: { path: { eq: "/methods" } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
    propsPage: markdownRemark(frontmatter: { path: { eq: "/api" } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
    statePage: markdownRemark(frontmatter: { path: { eq: "/state" } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`;
