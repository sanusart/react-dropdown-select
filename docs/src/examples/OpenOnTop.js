import React from 'react';
import Select from '../../../src';

const OpenOnTop = ({ options, title }) => (
  <React.Fragment>
    <h2>{ title }</h2>
    <Select
      multi
      openOnTop
      options={options}
      values={[]}
      onChange={(value) => console.log(`%c > onChange ${ title } `, 'background: #555; color: tomato', value)}
    />
  </React.Fragment>
);

OpenOnTop.propTypes = {};

export default OpenOnTop;
