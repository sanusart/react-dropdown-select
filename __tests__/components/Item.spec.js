import React from 'react';
import renderer from 'react-test-renderer';

import Item from '../../src/components/Item';

import {options} from '../../docs/src/options';

const props = {
  item: options[0],
  parentProps: {
    itemRenderer: null
  },
  parentState: {
    cursor: 0
  },
  parentMethods: {
    isSelected: () => undefined
  }
};

it('<Item/> renders correctly', () => {
  const tree = renderer.create(<Item {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
