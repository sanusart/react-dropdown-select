/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';

import Loading from '../../src/components/Loading';

const props = {
  props: {
    loadingRenderer: null,
  },
};

it('<Loading/> renders correctly', () => {
  let tree;
  renderer.act(() => {
    tree = renderer.create(<Loading {...props} />);
  });

  expect(tree.toJSON()).toMatchSnapshot();
});
