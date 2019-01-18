import React from 'react';
import { version } from '../../../package';
import { Link } from 'gatsby';

export default ({ page, title }) =>
  page === 'home' ? (
    <div className="">
      <h3 className="m0">v{version}</h3>
      <span
        className="block color-inherit"
        style={{ fontSize: '5vw', lineHeight: '1', color: '#0074D9' }}>
        React dropdown select
      </span>
    </div>
  ) : (
    <div className="mb3">
      <header className="py2 mt3 border-bottom">
        <div className="sm-flex flex-center flex-wrap">
          <div className="flex-auto">
            <div className="mxn1">
              <Link to="/" className="btn compact btn-link btn-small p1">
                react-dropdown-select
              </Link>
              <span>v{version}</span>
            </div>
            <h1 className="m0" style={{ fontSize: '3rem', color: '#0074D9' }}>
              {title}
            </h1>
          </div>
        </div>
      </header>
      <div className="h5 mxn1">
        <Link to="/" title="Home" className="btn compact btn-link p1 regular">
          Home
        </Link>
        <span className="">
          <span className="muted">/</span>
          <span className="muted m1">{title}</span>
        </span>
      </div>
    </div>
  );
