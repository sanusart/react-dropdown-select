import React from 'react';
import styled from '@emotion/styled';

import Select from '../../../src';

const RenderInBody = ({ options, title }) => (
  <React.Fragment>
    <Title>
      <h2>{title}</h2>
      <a href="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/RenderInBody.js">
        Source
      </a>
    </Title>
    <div style={{ overflow: 'auto', height: '100px' }}>
      <p>
        I am wrapped in: <code>&lt;div style="overflow: auto; height: 100px;"&gt;</code>
      </p>
      <Select
        options={options}
        portal={typeof document !== `undefined` && document.body}
        values={[]}
        onChange={(value) =>
          console.log(`%c > onChange ${title} `, 'background: #555; color: tomato', value)
        }
      />
    </div>
  </React.Fragment>
);

RenderInBody.propTypes = {};

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export default RenderInBody;
