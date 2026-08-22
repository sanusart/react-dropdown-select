/**
 * @jest-environment jsdom
 */
import React from 'react';
import TestRenderer from 'react-test-renderer';

import DropdownHandle from '../../src/components/DropdownHandle';

let spy;

const props = (props = {}) => ({
  props: {
    dropdownHandleRenderer: null,
  },
  state: {
    dropdown: false,
  },
  methods: {
    dropDown: () => undefined,
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

  it('<DropdownHandle/> renders correctly', () => {
    let instance;
    TestRenderer.act(() => {
      instance = TestRenderer.create(<DropdownHandle {...props()} />);
    });

    expect(instance.toJSON()).toMatchSnapshot();
  });

  it('onClick toggles dropdown', () => {
    let instance;
    TestRenderer.act(() => {
      instance = TestRenderer.create(<DropdownHandle {...props()} onClick={spy} />);
    });
    instance.root.findByType('div').props.onClick();

    expect(spy).toHaveBeenCalled;
  });

  it('onKeyDown toggles dropdown', () => {
    let instance;
    TestRenderer.act(() => {
      instance = TestRenderer.create(<DropdownHandle {...props()} onKeyDown={spy} />);
    });
    instance.root.findByType('div').props.onKeyDown();

    expect(spy).toHaveBeenCalled;
  });
});
