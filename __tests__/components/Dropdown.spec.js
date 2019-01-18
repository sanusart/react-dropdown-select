import React from 'react';
import renderer from 'react-test-renderer';

import Dropdown from '../../src/components/Dropdown';

const props = {
  props: {
    dropdownRenderer: null,
  },
  state: {
    selectBounds: {}
  },
  methods: {
    searchResults: () => []
  }
};

it('<Dropdown/> renders correctly', () => {
  const tree = renderer.create(<Dropdown {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
