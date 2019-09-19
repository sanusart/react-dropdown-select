import React from 'react';
import styled from '@emotion/styled';
import Select from '../../../src';
import { Heading } from './components/Heading';

const CreateEntries = ({ options, title }) => (
  <React.Fragment>
    <Heading
      title={title}
      source="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/CreateEntries.js"
    />

    <p>Type search and hit `Return` key</p>
    <Select
      multi
      create
      onCreateNew={(item) => console.log('%c New item created ', 'background: #555; color: tomato', item)}
      options={options}
      values={[]}
      onChange={(value) =>
        console.log(`%c > onChange ${title} `, 'background: #555; color: tomato', value)
      }
    />
  </React.Fragment>
);

CreateEntries.propTypes = {};

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export default CreateEntries;
