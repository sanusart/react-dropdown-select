import React from 'react';
import TestRenderer from 'react-test-renderer';
import { unmountComponentAtNode, render } from 'react-dom';
import { act } from 'react-dom/test-utils';

import Content from '../../src/components/Content';
import { options } from '../options';

let container = null;

const props = (props = {}) => ({
  props: {
    contentRenderer: null,
    multi: true,
    labelField: 'name'
  },
  state: {
    search: '',
    values: [options[0]]
  },
  methods: {
    dropDown: jest.fn(),
    getInputSize: () => undefined
  },
  ...props
});

describe('<Clear/> component', () => {
  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('<Content/> renders correctly', () => {
    const tree = TestRenderer.create(<Content {...props()} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('onClick opens dropdown', () => {
    const componentProps = props();

    act(() => {
      render(<Content {...componentProps}/>, container);
    });

    const content = document.querySelector('.react-dropdown-select-content');

    expect(componentProps.methods.dropDown).toHaveBeenCalledTimes(0);

    act(() => {
      content.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });

    expect(componentProps.methods.dropDown).toHaveBeenCalledTimes(1);
  });
});
