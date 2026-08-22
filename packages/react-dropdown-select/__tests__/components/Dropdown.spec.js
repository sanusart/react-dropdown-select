/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';

import Dropdown from '../../src/components/Dropdown';

const props = {
  props: {
    dropdownRenderer: null,
    dropdownGap: 5,
    dropdownHeight: '300px',
  },
  state: {
    selectBounds: {},
    searchResults: [],
  },
  methods: {
    searchResults: () => [],
    getSelectRef: () => ({
      blur: () => {},
      getBoundingClientRect: () => ({ top: 100, bottom: 100 }),
    }),
  },
};

it('<Dropdown/> renders correctly', () => {
  let tree;
  renderer.act(() => {
    tree = renderer.create(<Dropdown {...props} />);
  });

  expect(tree.toJSON()).toMatchSnapshot();
});
