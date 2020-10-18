import React from 'react';
import { Heading } from './components/Heading';
import Select from '../../../src';

import {
  getByPath,
} from '../../../src/util';

const WithSearchFn = ({ options, title }) => {
  const onSearch = ({ props, state, methods }) => {
    console.log({ props, state, methods });

    const regexp = new RegExp(methods.safeString(state.search), 'i');
    return methods
      .sortBy()
      .filter((item) =>
        regexp.test(getByPath(item, props.searchBy) || getByPath(item, props.valueField))
      );
  };

  return (
    <React.Fragment>
      <Heading
        title={title}
        source="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/WithSearchFn.js"
      />
      <Select
        options={options}
        searchFn={onSearch}
      />
    </React.Fragment>
  );
};

WithSearchFn.propTypes = {};

export default WithSearchFn;
