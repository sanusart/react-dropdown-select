import React from 'react';
import styled from '@emotion/styled';

import Select from '../../../src';
import { options } from '../options';

const AccessDataByPath = ({ title }) => (
  <React.Fragment>
    <Title>
      <h2>{title}</h2>
      <a href="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/AccessDataByPath.js">
        Source
      </a>
    </Title>
    <p>"Label" is accessed via <code>company.catchPhrase</code> nested property of the <a href="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/options.js#L21">options</a> object</p>
    <Select
      multi
      options={options}
      values={[]}
      valueField="address.city"
      labelField="company.catchPhrase"
      searchBy="company.catchPhrase"
      onChange={(value) =>
        console.log(`%c > onChange ${title} `, 'background: #555; color: tomato', value)
      }
    />
  </React.Fragment>
);

AccessDataByPath.propTypes = {};

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export default AccessDataByPath;
