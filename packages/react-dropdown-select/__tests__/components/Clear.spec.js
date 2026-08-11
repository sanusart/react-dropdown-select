/**
 * @jest-environment jsdom
 */
import React from 'react';
import TestRenderer from 'react-test-renderer';

import Clear from '../../src/components/Clear';
import { options } from '../options';

let spy;

const props = (props = {}) => ({
  props: {
    clearRenderer: null,
  },
  methods: {
    clearAll: () => undefined,
  },
  ...props,
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
    TestRenderer.create(<Clear {...props({ parentItem: options[0] })} onClick={spy} />)
      .root.findByProps({ className: 'react-dropdown-select-clear' })
      .props.onClick();

    expect(spy).toHaveBeenCalled;
  });

  it('onKeyDown clears all', () => {
    const clearSpy = jest.fn();
    TestRenderer.create(
      <Clear
        {...props({
          parentItem: options[0],
          methods: { clearAll: clearSpy },
        })}
      />,
    )
      .root.findByProps({ className: 'react-dropdown-select-clear' })
      .props.onKeyDown({ key: 'Enter' });

    expect(clearSpy).toHaveBeenCalled;
  });
});
