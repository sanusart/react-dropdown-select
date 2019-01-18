import React from 'react';
import renderer from 'react-test-renderer';

import NoData from '../../src/components/NoData';

const props = {
  props: {
    noDataRenderer: null
  }
};

it('<NoData/> renders correctly', () => {
  const tree = renderer.create(<NoData {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
