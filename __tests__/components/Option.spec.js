import React from 'react';
import TestRenderer from 'react-test-renderer';

import Option from '../../src/components/Option';

import { options } from '../options';

let spy;

const props = (props = {}) => ({
  props: {
    optionRenderer: null
  },
  state: {
    cursor: 0
  },
  methods: {
    isSelected: () => undefined,
    addItem: () => undefined,
    removeItem: () => spy
  },
  ...props
});

describe('<Option/> component', () => {

  beforeEach(() => {
    spy = jest.fn();
  });

  afterEach(() => {
    spy = null;
  });

  it('renders correctly', () => {
    const tree = TestRenderer.create(
      <Option {...props({ item: options[0] })}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
  });

  it('onClick remove item', () => {
    TestRenderer.create(
      <Option {...props({ item: options[0] })} onClick={spy}/>)
      .root.findByProps({ className: 'react-dropdown-select-option-remove' }).props.onClick();

    expect(spy).toHaveBeenCalled;
  });

});
