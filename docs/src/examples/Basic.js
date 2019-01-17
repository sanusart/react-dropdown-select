import React from 'react';
import Select from '../../../src';

const Basic = ({ options, title }) => (
  <React.Fragment>
    <h2>{ title } | <a href="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/Basic.js">Source</a></h2>
    <Select
      options={options}
      values={[]}
      onChange={(value) => console.log(`%c > onChange ${ title } `, 'background: #555; color: tomato', value)}
    />
  </React.Fragment>
);

Basic.propTypes = {};

export default Basic;
