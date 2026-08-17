import React, { createRef } from 'react';
import TestRenderer from 'react-test-renderer';
import Select from '../../src/index';
import Item from '../../src/components/Item';
import { options } from '../options';

export const selectWithProps = (component) => {
  const testRef = createRef();
  const renderer = TestRenderer.create(React.cloneElement(component, { ref: testRef }), {
    createNodeMock: (element) => {
      if (element.type === 'input') {
        return {
          focus: () => {},
          blur: () => {},
          scrollIntoView: () => {},
        };
      }
      if (element.type === 'span') {
        return {
          focus: () => {},
          blur: () => {},
          scrollIntoView: () => {},
        };
      }
      if (element.type === 'div') {
        return {
          focus: () => {},
          blur: () => {},
          scrollIntoView: () => {},
          contains: () => true,
          setAttribute: () => {},
          getBoundingClientRect: () => ({
            top: 0,
            bottom: 100,
            height: 100,
            width: 400,
            left: 0,
            right: 400,
          }),
        };
      }
      return null;
    },
  });
  const origUpdate = renderer.update.bind(renderer);
  renderer.getInstance = () =>
    new Proxy(
      {},
      {
        get: (_, prop) => (testRef.current ? testRef.current[prop] : undefined),
      },
    );
  renderer.update = (el) => origUpdate(React.cloneElement(el, { ref: testRef }));
  return renderer;
};

export const findByClassName = (component, className) =>
  component.root.find((el) => el.props.className && el.props.className.includes(className));

export const openDropdown = (component) => {
  TestRenderer.act(() => {
    findByClassName(component, 'react-dropdown-select-content').props.onClick({
      stopPropagation: () => {},
    });
  });
};

export const clickItem = (component, label) => {
  const item = component.root.findAllByType(Item).find((el) => el.props.item.name === label);
  TestRenderer.act(() => {
    item.findByType('span').props.onClick();
  });
};

export const fixture = options.slice(0, 3);
export const activeFixture = fixture.filter((o) => !o.disabled);
export { TestRenderer, Select, Item };
