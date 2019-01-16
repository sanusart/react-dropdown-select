import React from 'react';
import Select from '../../../src';

const Multi = ({ options, title }) => (
  <React.Fragment>
    <h2>{ title }</h2>
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
