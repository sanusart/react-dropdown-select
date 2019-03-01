import React from 'react';
import styled from '@emotion/styled';

import Select from '../../../src';

const options = [
  { value: 'hebrew1', label: 'עברית 1'},
  { value: 'hebrew2', label: 'עברית 2'},
  { value: 'hebrew3', label: 'עברית 3'},
  { value: 'hebrew4', label: 'עברית 4'},
];

const Rtl = ({ title }) => (
  <React.Fragment>
    <Title>
      <h2>{title}</h2>
      <a href="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/Rtl.js">
        Source
      </a>
    </Title>
    <Select
      multi
      options={options}
      values={[]}
      direction="rtl"
      onChange={(value) =>
        console.log(`%c > onChange ${title} `, 'background: #555; color: tomato', value)
      }
    />
  </React.Fragment>
);

Rtl.propTypes = {};

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export default Rtl;
