import React from 'react';
import TestRenderer from 'react-test-renderer';
import { LIB_NAME } from '../src/constants';

import Select from '../src/index';

const props = (props = {}) => ({
  onChange: () => undefined,
  ...props
});

const selectWithProps = (component) => {
  return TestRenderer.create(component, {
    createNodeMock: (element) => {
      if (element.type === 'div') {
        return {
          blur: () => {},
          getBoundingClientRect: () => {}
        };
      }
      return null;
    }
  });
};

describe('<Select/> component', () => {
  it('<Select/> renders correctly', () => {
    const tree = selectWithProps(<Select {...props()} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('<Select/> renders with separator', () => {
    const tree = selectWithProps(<Select {...props({ separator: true })} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('<Select/> renders with clearable', () => {
    const tree = selectWithProps(<Select {...props({ clearable: true })} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('<Select/> renders with short color', () => {
    const tree = selectWithProps(<Select {...props({ color: '#000' })} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('<Select/> renders with loading', () => {
    const tree = selectWithProps(<Select {...props({ loading: true })} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('<Select/> renders with name', () => {
    const tree = selectWithProps(<Select {...props({ name: 'form-select' })} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it('<Select/> renders with custom search function', () => {
    const options = [
      { id: 0, name: 'Zero' },
      { id: 1, name: 'One' },
      { id: 2, name: 'Two' },
    ];

    const searchFn = ({ props, state }) => {
      return props.options.filter(({ name }) => new RegExp(state.search).test(name) );
    };

    const component = selectWithProps(<Select {...props({ searchFn, options })} />);

    const input = component.root.find(element => element.props.className === `${LIB_NAME}-input`);

    TestRenderer.act(() => input.props.onChange({ target: { value: 'Zer' } }));

    expect(component.toTree().instance.state.search).toBe('Zer');
    expect(component.toTree().instance.state.searchResults).toStrictEqual([{ id: 0, name: 'Zero'}])
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('<Select/> is disabled', () => {
    const tree = selectWithProps(<Select {...props({ disabled: true })} />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
