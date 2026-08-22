/**
 * @jest-environment jsdom
 */
import React, { act } from 'react';
import TestRenderer from 'react-test-renderer';
import { createRoot } from 'react-dom/client';

import Content from '../../src/components/Content';
import { options } from '../options';

global.IS_REACT_ACT_ENVIRONMENT = true;

let container = null;
let root = null;

const props = (props = {}) => ({
  props: {
    contentRenderer: null,
    multi: true,
    labelField: 'name',
  },
  state: {
    search: '',
    values: [options[0]],
  },
  methods: {
    dropDown: jest.fn(),
    getInputSize: () => undefined,
  },
  ...props,
});

describe('<Content/> component', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
    root = createRoot(container);
  });

  afterEach(() => {
    act(() => root.unmount());
    container.remove();
    container = null;
    root = null;
  });

  it('<Content/> renders correctly', () => {
    let tree;
    TestRenderer.act(() => {
      tree = TestRenderer.create(<Content {...props()} />);
    });

    expect(tree.toJSON()).toMatchSnapshot();
  });

  it('onClick opens dropdown', () => {
    const componentProps = props();

    act(() => {
      root.render(<Content {...componentProps} />);
    });

    const content = document.querySelector('.react-dropdown-select-content');

    expect(componentProps.methods.dropDown).toHaveBeenCalledTimes(0);

    act(() => {
      content.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(componentProps.methods.dropDown).toHaveBeenCalledTimes(1);
  });
});
