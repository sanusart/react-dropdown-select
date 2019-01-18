import React from 'react';
import TestRenderer from 'react-test-renderer';

import Clear from '../../src/components/Clear';
import { options } from '../options';

let spy;

const props = (props = {}) => ({
  props: {
    clearRenderer: null
  },
  methods: {
    clearAll: () => undefined
  },
  ...props
});

describe('<Clear/> component', () => {
  beforeEach(() => {
    spy = jest.fn();
  });

  afterEach(() => {
    spy = null;
  });

  it('<Clear/> renders correctly', () => {
    const tree = TestRenderer.create(<Clear {...props()} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('onClick clears all', () => {
    TestRenderer.create(
      <Clear {...props({ parentItem: options[0] })} onClick={spy}/>)
      .root.findByProps({ className: 'react-dropdown-select-clear' }).props.onClick();

    expect(spy).toHaveBeenCalled;
  });

  it('onKeyPress clears all', () => {
    TestRenderer.create(
      <Clear {...props({ parentItem: options[0] })} onKeyPress={spy}/>)
      .root.findByProps({ className: 'react-dropdown-select-clear' }).props.onKeyPress();

    expect(spy).toHaveBeenCalled;
  });
});
