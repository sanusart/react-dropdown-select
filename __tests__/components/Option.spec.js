import React from 'react';
import renderer from 'react-test-renderer';

import Option from '../../src/components/Option';

import {options} from '../../docs/src/options';

const props = {
  parentItem: options[0],
  parentProps: {
    optionRenderer: null
  }
};

it('<Option/> renders correctly', () => {
  const tree = renderer.create(<Option {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
