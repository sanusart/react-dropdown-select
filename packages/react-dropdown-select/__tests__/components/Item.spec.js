/**
 * @jest-environment jsdom
 */
import React from 'react';
import TestRenderer from 'react-test-renderer';
import Item from '../../src/components/Item';
import { options } from '../options';

let spy;

const props = (props = {}) => ({
  props: {
    itemRenderer: null,
  },
  state: {
    cursor: 0,
  },
  methods: {
    isSelected: () => undefined,
    addItem: () => undefined,
  },
  ...props,
});

describe('<Item/> component', () => {
  beforeEach(() => {
    spy = jest.fn();
  });

  test('renders correctly', () => {
    let renderer;
    TestRenderer.act(() => {
      renderer = TestRenderer.create(<Item {...props({ item: options[0] })} />);
    });
    const tree = renderer.toJSON();

    expect(tree).toMatchSnapshot();
  });

  test('onChange with click', () => {
    const addItemSpy = jest.fn();
    let instance;
    TestRenderer.act(() => {
      instance = TestRenderer.create(
        <Item
          {...props({
            item: options[0],
            methods: { isSelected: () => undefined, addItem: addItemSpy },
          })}
        />,
      );
    });
    instance.root.findByType('span').props.onClick();

    expect(addItemSpy).toHaveBeenCalled;
  });

  test('onChange with key press', () => {
    const addItemSpy = jest.fn();
    let instance;
    TestRenderer.act(() => {
      instance = TestRenderer.create(
        <Item
          {...props({
            item: options[0],
            methods: { isSelected: () => undefined, addItem: addItemSpy },
          })}
        />,
      );
    });
    instance.root.findByType('span').props.onKeyDown({ key: 'Enter' });

    expect(addItemSpy).toHaveBeenCalled;
  });

  test('keepSelectedInList: false', () => {
    let tree;
    TestRenderer.act(() => {
      tree = TestRenderer.create(
        <Item
          {...props({
            item: options[0],
            parentProps: {
              itemRenderer: null,
              keepSelectedInList: false,
            },
            parentMethods: {
              isSelected: () => true,
            },
          })}
        />,
      ).toJSON();
    });
  });

  test('pass item renderer', () => {
    let renderer;
    TestRenderer.act(() => {
      renderer = TestRenderer.create(
        <Item {...props({ item: options[0], itemRenderer: () => <div>item</div> })} />,
      );
    });
    const tree = renderer.toJSON();

    expect(tree).toMatchSnapshot();
  });
});
