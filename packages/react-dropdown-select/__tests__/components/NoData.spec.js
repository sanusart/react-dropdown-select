/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';

import NoData from '../../src/components/NoData';

const props = {
  props: {
    noDataRenderer: null,
  },
};

it('<NoData/> renders correctly', () => {
  let instance;
  renderer.act(() => {
    instance = renderer.create(<NoData {...props} />);
  });

  expect(instance.toJSON()).toMatchSnapshot();
});
