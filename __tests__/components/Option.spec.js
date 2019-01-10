import React from 'react';
import TestRenderer from 'react-test-renderer';

import Option from '../../src/components/Option';

import { options } from '../../docs/src/options';
import Item from './Item.spec';

let spy;

const props = (props = {}) => ({
  parentProps: {
    optionRenderer: null
  },
  parentState: {
    cursor: 0
  },
  parentMethods: {
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
      <Option {...props({ parentItem: options[0] })}/>
    ).toJSON();

  expect(tree).toMatchSnapshot();
  });

  it('onClick remove item', () => {
    TestRenderer.create(
      <Option {...props({ parentItem: options[0] })} onClick={spy}/>)
      .root.findByProps({ className: 'react-dropdown-select-option-remove' }).props.onClick();

    expect(spy).toHaveBeenCalled;
  });

});
