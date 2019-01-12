import React from 'react';
import renderer from 'react-test-renderer';

import Content from '../../src/components/Content';

import { options } from '../options';

const props = {
  parentProps: {
    contentRenderer: null
  },
  parentState: {
    values: options
  },
  parentMethods: {
    getInputSize: () => undefined
  }
};

it('<Content/> renders correctly', () => {
  const tree = renderer.create(<Content {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
