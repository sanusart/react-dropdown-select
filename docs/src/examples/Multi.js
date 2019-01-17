import React from 'react';
import Select from '../../../src';

const Multi = ({ options, title }) => (
  <React.Fragment>
    <h2>{ title } | <a href="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/Multi.js">Source</a></h2>
    <Select
      multi
      options={options}
      values={[]}
      onChange={(value) => console.log(`%c > onChange ${ title } `, 'background: #555; color: tomato', value)}
    />
  </React.Fragment>
);

Multi.propTypes = {};

export default Multi;
