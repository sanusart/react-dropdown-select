import React from 'react';
import Header from '../components/header';
import Demo from '../pages/demo';
import Navigation from '../components/navigation';
import styled from '@emotion/styled';

import '../styles.css';

const Home = () => (
  <Wrapper>
    <div className="flex flex-wrap">
      <Side className="sm-col-12 md-col-6 border-right p1 overflow-auto home-Side">
        <Inner className="px0 col-11 lg-col-8 px1 mx-auto home-Inner">
          <Header page="home" />
          <h1 id="what-it-is-all-about">Dropdown select for react</h1>

          <p>
            Customisable dropdown select/multi-select component for react with custom render
            callback props to override inner components
          </p>

          <h3>
            Install via <strong>npm</strong>:
          </h3>

          <pre>
            <span>SHELL</span>npm install --save react-dropdown-select
          </pre>

          <h3>Use:</h3>

          <pre>
            <span>JSX</span>
            {`import Select from 'react-dropdown-select';

export const App = ({ options }) => (
  <Select
    multi
    options={options}
    onChange={(values) => this.onChange(values)}
  />
);`}
          </pre>
        </Inner>
      </Side>
      <Side className="sm-col-12 md-col-6 p1 overflow-auto">
        <Nav className="sm-col-12 md-col-6 fixed top-0 right-0 p2 white bg-white">
          <Navigation />
        </Nav>

        <Inner className="col-11 lg-col-8 px1 mx-auto">
          <h1 className="center">Demo</h1>
          <Demo />
        </Inner>
      </Side>
    </div>
  </Wrapper>
);

const Side = styled.div`
  height: 100vh;
`;

const Wrapper = styled.div`
  width: 100vw;

  pre {
    overflow: auto;
  }
`;

const Inner = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
`;

const Nav = styled.div`
  z-index: 2;
  box-shadow: 153px -14px 40px #ccc;
`;

export default Home;
