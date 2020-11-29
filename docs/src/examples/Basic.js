import React from 'react';
import { Heading } from './components/Heading';
import Select from '../../../src';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import theme from 'prism-react-renderer/themes/github';

const code = `<Select
  options={options}
  values={[]}
  onChange={(value) => console.log(value)}
/>`;

const Basic = ({ options, title }) => (
  <React.Fragment>
    <Heading
      title={title}
      source="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/Basic.js"
    />

    <LiveProvider theme={theme} code={code} scope={{ Select, options }}>
      <LiveEditor/>
      <br/>
      <LiveError />
      <LivePreview />
    </LiveProvider>
  </React.Fragment>
);

export default Basic;
