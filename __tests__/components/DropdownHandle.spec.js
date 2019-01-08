import React from 'react';
import renderer from 'react-test-renderer';

import DropdownHandle from '../../src/components/DropdownHandle';

const props = {
  parentProps: {
    dropdownHandleRenderer: null
  },
  parentState: {
    dropdown: false
  }
};

it('<DropdownHandle/> renders correctly', () => {
  const tree = renderer.create(<DropdownHandle {...props}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
