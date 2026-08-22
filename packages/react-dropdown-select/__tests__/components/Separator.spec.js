/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';

import Separator from '../../src/components/Separator';

const props = {
  props: {
    separatorRenderer: null,
  },
};

it('<Separator/> renders correctly', () => {
  let tree;
  renderer.act(() => {
    tree = renderer.create(<Separator {...props} />);
  });

  expect(tree.toJSON()).toMatchSnapshot();
});
