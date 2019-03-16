import React from 'react';
import TestRenderer from 'react-test-renderer';
import Item from '../../src/components/Item';
import { options } from '../options';

let spy;

const props = (props = {}) => ({
  props: {
    itemRenderer: null
  },
  state: {
    cursor: 0
  },
  methods: {
    isSelected: () => undefined,
    addItem: () => undefined
  },
  ...props
});

describe('<Item/> component', () => {
  beforeEach(() => {
    spy = jest.fn();
  });

  test('renders correctly', () => {
    const tree = TestRenderer.create(<Item {...props({ item: options[0] })} />).toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('onChange with click', () => {
    TestRenderer.create(<Item {...props({ item: options[0] })} onClick={spy} />)
      .root.findByType('span')
      .props.onClick();

    expect(spy).toHaveBeenCalled;
  });

  test('onChange with key press', () => {
    TestRenderer.create(<Item {...props({ item: options[0] })} ononKeyPress={spy} />)
      .root.findByType('span')
      .props.onKeyPress();

    expect(spy).toHaveBeenCalled;
  });

  test('keepSelectedInList: false', () => {
    const tree = TestRenderer.create(
      <Item
        {...props({
          item: options[0],
          parentProps: {
            itemRenderer: null,
            keepSelectedInList: false
          },
          parentMethods: {
            isSelected: () => true
          }
        })}
      />
    ).toJSON();
  });

  test('pass item renderer', () => {
    const tree = TestRenderer.create(
      <Item {...props({ item: options[0], itemRenderer: () => <div>item</div> })} />
    ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
