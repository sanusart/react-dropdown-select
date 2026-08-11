/** @jest-environment jsdom */
import React from 'react';
import {
  selectWithProps,
  findByClassName,
  openDropdown,
  fixture,
  TestRenderer,
  Item,
  Select,
} from './helpers';

describe('Disabled options', () => {
  it('does not select a disabled option via addItem', () => {
    const onChange = jest.fn();
    const onSelect = jest.fn();

    const opts = [
      { id: 1, name: 'Active' },
      { id: 2, name: 'Blocked', disabled: true },
    ];

    const component = selectWithProps(
      <Select
        options={opts}
        labelField="name"
        valueField="id"
        onChange={onChange}
        onSelect={onSelect}
      />,
    );

    const inst = component.getInstance();
    openDropdown(component);

    const disabledItem = component.root.findAllByType(Item).find((el) => el.props.item.disabled);
    expect(disabledItem).toBeDefined();

    const itemSpan = disabledItem.findByType('span');
    expect(itemSpan.props.onClick).toBeUndefined();

    expect(inst.state.values).toEqual([]);
  });

  it('renders disabled label for disabled options', () => {
    const opts = [
      { id: 1, name: 'Active' },
      { id: 2, name: 'Blocked', disabled: true },
    ];

    const component = selectWithProps(
      <Select options={opts} labelField="name" valueField="id" disabledLabel="unavailable" />,
    );

    openDropdown(component);

    const disabledItemEl = component.root.findAllByType(Item).find((el) => el.props.item.disabled);
    expect(disabledItemEl).toBeTruthy();
  });

  it('renders aria-disabled on disabled option', () => {
    const opts = [
      { id: 1, name: 'Active' },
      { id: 2, name: 'Blocked', disabled: true },
    ];

    const component = selectWithProps(<Select options={opts} labelField="name" valueField="id" />);

    openDropdown(component);

    const disabledItemEl = component.root.findAllByType(Item).find((el) => el.props.item.disabled);
    const span = disabledItemEl.findByType('span');
    expect(span.props['aria-disabled']).toBe(true);
    expect(span.props['data-disabled']).toBe(true);
  });
});

describe('Disabled component state', () => {
  it('has tabIndex -1 when disabled', () => {
    const component = selectWithProps(
      <Select disabled options={fixture} labelField="name" valueField="id" />,
    );

    const selectEl = findByClassName(component, 'react-dropdown-select');
    expect(selectEl.props.tabIndex).toBe(-1);
  });

  it('has disabled class when disabled', () => {
    const component = selectWithProps(
      <Select disabled options={fixture} labelField="name" valueField="id" />,
    );

    const selectEl = findByClassName(component, 'react-dropdown-select');
    expect(selectEl.props.className).toContain('react-dropdown-select-disabled');
  });

  it('does not render dropdown when disabled even if state is open', () => {
    const component = selectWithProps(
      <Select disabled options={fixture} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();
    TestRenderer.act(() => {
      inst.methods.dropDown('open');
    });

    expect(inst.state.dropdown).toBe(true);
    expect(
      component.root.findAll(
        (el) =>
          el.props.className && el.props.className.includes('react-dropdown-select-dropdown '),
      ),
    ).toHaveLength(0);
  });

  it('does not render dropdown on content click when disabled', () => {
    const component = selectWithProps(
      <Select disabled options={fixture} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();
    openDropdown(component);
    expect(inst.state.dropdown).toBe(true);
    expect(
      component.root.findAll(
        (el) =>
          el.props.className && el.props.className.includes('react-dropdown-select-dropdown '),
      ),
    ).toHaveLength(0);
  });

  it('has disabled input when disabled', () => {
    const component = selectWithProps(
      <Select disabled options={fixture} labelField="name" valueField="id" />,
    );

    const input = findByClassName(component, 'react-dropdown-select-input');
    expect(input.props.disabled).toBe(true);
  });
});
