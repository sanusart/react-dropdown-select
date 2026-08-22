/**
 * @jest-environment jsdom
 */
import React from 'react';
import renderer from 'react-test-renderer';

import Input from '../../src/components/Input';
import { options } from '../options';

const props = (props = {}) => ({
  props: {
    inputRenderer: null,
    searchable: true,
    create: true,
  },
  state: {
    values: options,
  },
  methods: {
    getInputSize: () => undefined,
  },
  ...props,
});

it('<Input/> renders correctly', () => {
  let instance;
  renderer.act(() => {
    instance = renderer.create(<Input {...props()} />);
  });

  expect(instance.toJSON()).toMatchSnapshot();
});

it('<Input/> is disabled', () => {
  let instance;
  renderer.act(() => {
    instance = renderer.create(<Input {...props({ disabled: true })} />);
  });

  expect(instance.toJSON()).toMatchSnapshot();
});
