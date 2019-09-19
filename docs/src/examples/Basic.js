import React from 'react';
import styled from '@emotion/styled';
import { Heading } from './components/Heading';
import Select from '../../../src';

const Basic = ({ options, title }) => (
  <React.Fragment>
    <Heading
      title={title}
      source="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/Basic.js"
    />

    <Select
      options={options}
      values={[]}
      onChange={(value) =>
        console.log(`%c > onChange ${title} `, 'background: #555; color: tomato', value)
      }
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
