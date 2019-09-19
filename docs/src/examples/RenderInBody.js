import React from 'react';
import styled from '@emotion/styled';
import { Heading } from './components/Heading';
import Select from '../../../src';

const RenderInBody = ({ options, title }) => (
  <React.Fragment>
    <Heading
      title={title}
      source="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/RenderInBody.js"
    />

    <div style={{ overflow: 'auto', height: '100px' }}>
      <p>
        I am wrapped in: <code>&lt;div style="overflow: auto; height: 100px;"&gt;</code>
      </p>
      <Select
        options={options}
        multi
        portal={typeof document !== `undefined` && document.body}
        values={[]}
        onChange={(value) =>
          console.log(`%c > onChange ${title} `, 'background: #555; color: tomato', value)
        }
      />
    </div>
  </React.Fragment>
);

export default RenderInBody;
