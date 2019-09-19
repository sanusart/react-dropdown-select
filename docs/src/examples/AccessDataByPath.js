import React from 'react';
import Select from '../../../src';
import { options } from '../options';
import { Heading } from './components/Heading';

const AccessDataByPath = ({ title }) => (
  <React.Fragment>
    <Heading
      title={title}
      source="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/AccessDataByPath.js"
    />
    <p>
      "Label" is accessed via <code>company.catchPhrase</code> nested property of the{' '}
      <a href="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/options.js#L21">
        options
      </a>{' '}
      object
    </p>
    <Select
      multi
      options={options}
      values={[]}
      valueField="address.city"
      labelField="company.catchPhrase"
      searchBy="company.catchPhrase"
      sortBy="company.catchPhrase"
      onChange={(value) =>
        console.log(`%c > onChange ${title} `, 'background: #555; color: tomato', value)
      }
    />
  </React.Fragment>
);

AccessDataByPath.propTypes = {};

export default AccessDataByPath;
