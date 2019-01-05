import React from 'react';
import { Link } from 'gatsby';

export default () => (
  <footer className="py3 border-top">

    <div className="left">
      <Link className="m1" to="/">Home</Link>
      <Link className="m1" to="props">Props types</Link>
      <Link to="demo" className="m1">
        Demo
      </Link>

      <a href="https://github.com/sanusart/react-dropdown-select" className="m1">
        Github
      </a>
    </div>

    <div className="right">
      <p className="btn compact btn-link p1">
        &copy;{new Date().getFullYear()} All rights reserved
      </p>
    </div>
  </footer>
);
