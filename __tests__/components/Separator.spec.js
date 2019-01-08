import React from 'react';
import renderer from 'react-test-renderer';

import Separator from '../../src/components/Separator';

const props = {
  parentProps: {
    separatorRenderer: null
  }
};

it('<Separator/> renders correctly', () => {
  const tree = renderer.create(<Separator {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
