import React from 'react';
import styled from '@emotion/styled';
import { Heading } from './components/Heading';
import Select from '../../../src';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import theme from 'prism-react-renderer/themes/github';

const code = `<form>
  <Select
    options={options}
    values={[]}
    required
    multi
    name="select"
    onChange={(value) => console.log(value)}
  />
  <button>Send</button>
</form>`;

const Form = ({ options, title }) => (
  <React.Fragment>
    <Heading
      title={title}
      source="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/Form.js"
    />

    <LiveProvider theme={theme} code={code} scope={{ Select, options }}>
      <LiveEditor />
      <br />
      <LiveError />
      <LivePreview />
    </LiveProvider>
  </React.Fragment>
);

Form.propTypes = {};

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export default Form;
