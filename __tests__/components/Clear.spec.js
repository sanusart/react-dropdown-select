import React from 'react';
import renderer from 'react-test-renderer';

import Clear from '../../src/components/Clear';

const props = {
  parentProps: {
    clearRenderer: null
  }
};

it('<Clear/> renders correctly', () => {
  const tree = renderer.create(<Clear {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
