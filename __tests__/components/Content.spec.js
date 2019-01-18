import React from 'react';
import TestRenderer from 'react-test-renderer';

import Content from '../../src/components/Content';
import { options } from '../options';

let spy;

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
    dropDown: () => undefined,
    getInputSize: () => undefined,
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

  it('<Content/> renders correctly', () => {
    const tree = TestRenderer.create(<Content {...props()} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('onClick opens dropdown', () => {
    TestRenderer.create(
      <Content {...props()} onClick={spy}/>)
      .root.findByProps({ className: 'react-dropdown-select-content react-dropdown-select-type-multi' }).props.onClick();

    expect(spy).toHaveBeenCalled;
  });
});
