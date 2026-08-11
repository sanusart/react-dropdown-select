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
    const tree = TestRenderer.create(<DropdownHandle {...props()} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('onClick toggles dropdown', () => {
    TestRenderer.create(<DropdownHandle {...props()} onClick={spy} />)
      .root.findByType('div')
      .props.onClick();

    expect(spy).toHaveBeenCalled;
  });

  it('onKeyDown toggles dropdown', () => {
    TestRenderer.create(<DropdownHandle {...props()} onKeyDown={spy} />)
      .root.findByType('div')
      .props.onKeyDown();

    expect(spy).toHaveBeenCalled;
  });
});
