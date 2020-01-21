import React from 'react';
import renderer from 'react-test-renderer';

import Input from '../../src/components/Input';
import { options } from '../options';

const props = (props = {}) => ({
  props: {
    inputRenderer: null,
    searchable: true,
    create: true
  },
  state: {
    values: options
  },
  methods: {
    getInputSize: () => undefined
  },
  ...props
});

it('<Input/> renders correctly', () => {
  const tree = renderer.create(<Input {...props()}/>).toJSON();

  expect(tree).toMatchSnapshot();
});

it('<Input/> is disabled', () => {
  const tree = renderer.create(<Input {...props({disabled: true})}/>).toJSON();

  expect(tree).toMatchSnapshot();
});
