import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const Navigation = () => (
  <Links>
    <Link className="m1" to="/">Home</Link>

    <Link className="m1" to="props">Props types</Link>

    <Link to="examples" className="m1">
      Examples
    </Link>

    <a href="https://github.com/sanusart/react-dropdown-select" className="m1">
      Github
    </a>
  </Links>
);

Navigation.propTypes = {};

const Links = styled.div`
  text-align: center;
  background: #fff;
`;

export default Navigation;
