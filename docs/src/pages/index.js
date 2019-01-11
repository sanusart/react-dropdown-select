import React from 'react';
import { Link } from 'gatsby';
import Header from '../components/header';
import Footer from '../components/footer';

import '../styles.css';

const Home = () => (
  <div className="container px2 sm-px3">
    <Header page="home" />

    <article className="markdown-body px0">
      <h1 id="what-it-is-all-about">Customisable dropdown select for react</h1>

      <p>
        Customisable dropdown select for react with custom render callback props to override inner
        components
      </p>

      <h3>
        Install via <strong>npm</strong>:
      </h3>

      <pre><span>SHELL</span>npm install --save react-dropdown-select</pre>

      <h3>Use:</h3>

      <div>
        <pre><span>JSX</span>
          {`<Select
  multi={true}
  options={options}
  onChange={(values) => this.onChange(values)}
/>`
          }
</pre>
      </div>

      <p className="center">
        <Link to="props" className="m1 btn btn-outline center">
          Prop types
        </Link>

        <Link to="demo" className="m1 btn btn-outline center">
          Demo
        </Link>

        <a
          href="https://github.com/sanusart/react-dropdown-select"
          className="m1 btn btn-outline center">
          Github
        </a>
      </p>
    </article>

    <Footer />
  </div>
);

export default Home;
