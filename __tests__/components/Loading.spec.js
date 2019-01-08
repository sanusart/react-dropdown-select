import React from 'react';
import renderer from 'react-test-renderer';

import Loading from '../../src/components/Loading';

const props = {
  parentProps: {
    loadingRenderer: null
  }
};

it('<Loading/> renders correctly', () => {
  const tree = renderer.create(<Loading {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
