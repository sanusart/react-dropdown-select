import React from 'react';
import styled from '@emotion/styled';

import Select from '../../../src';

const OpenOnTop = ({ options, title }) => (
  <React.Fragment>
    <Title>
      <h2>{title}</h2>
      <a href="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/OpenOnTop.js">
        Source
      </a>
    </Title>
    <Select
      multi
      openOnTop
      options={options}
      values={[]}
      onChange={(value) =>
        console.log(`%c > onChange ${title} `, 'background: #555; color: tomato', value)
      }
    />
  </React.Fragment>
);

OpenOnTop.propTypes = {};

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export default OpenOnTop;
