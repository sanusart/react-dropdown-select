import React from 'react';
import renderer from 'react-test-renderer';

import Input from '../../src/components/Input';
import { options } from '../../docs/src/options';

const props = {
  parentProps: {
    inputRenderer: null
  },
  parentState: {
    values: options
  },
  parentMethods: {
    getInputSize: () => undefined
  }
};

it('<Input/> renders correctly', () => {
  const tree = renderer.create(<Input {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
