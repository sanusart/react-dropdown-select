import React from 'react';
import renderer from 'react-test-renderer';

import Select from '../src';

const props = {
  onChange: () => undefined
};

it('<Select/> renders correctly', () => {
  const tree = renderer.create(<Select {...props}/>,
    {
      createNodeMock: (element) => {
        if (element.type === 'div') {
          return {
            blur: () => {},
            getBoundingClientRect: () => {}
          };
        }
        return null;
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
