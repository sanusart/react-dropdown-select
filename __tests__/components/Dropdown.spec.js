import React from 'react';
import renderer from 'react-test-renderer';

import Dropdown from '../../src/components/Dropdown';

const props = {
  parentProps: {
    dropdownRenderer: null,
  },
  parentState: {
    selectBounds: {}
  },
  parentMethods: {
    searchResults: () => []
  }
};

it('<Dropdown/> renders correctly', () => {
  const tree = renderer.create(<Dropdown {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
