import React from 'react';
import styled from '@emotion/styled';

import Select from '../../../src';

const Basic = ({ options, title }) => (
  <React.Fragment>
    <Title>
    <h2>{ title }</h2>
    <a href="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/Basic.js">Source</a>
    </Title>
    <Select
      options={options}
      values={[]}
      onChange={(value) => console.log(`%c > onChange ${ title } `, 'background: #555; color: tomato', value)}
    />
  </React.Fragment>
);

Basic.propTypes = {};

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export default Basic;
