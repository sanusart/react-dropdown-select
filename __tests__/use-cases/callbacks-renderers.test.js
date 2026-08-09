/** @jest-environment jsdom */
import React from 'react';
import {
  selectWithProps,
  openDropdown,
  activeFixture,
  fixture,
  TestRenderer,
  Select,
} from './helpers';

describe('Callbacks', () => {
  it('fires onDropdownOpen and onDropdownClose', () => {
    const onDropdownOpen = jest.fn();
    const onDropdownClose = jest.fn();

    const component = selectWithProps(
      <Select
        options={fixture}
        labelField="name"
        valueField="id"
        onDropdownOpen={onDropdownOpen}
        onDropdownClose={onDropdownClose}
      />,
    );

    openDropdown(component);
    expect(onDropdownOpen).toHaveBeenCalledTimes(1);

    TestRenderer.act(() => {
      component.getInstance().methods.dropDown('close');
    });
    expect(onDropdownClose).toHaveBeenCalled();
  });

  it('fires onSelectAll and onClearAll', () => {
    const onSelectAll = jest.fn();
    const onClearAll = jest.fn();

    const component = selectWithProps(
      <Select
        multi
        options={activeFixture}
        labelField="name"
        valueField="id"
        onSelectAll={onSelectAll}
        onClearAll={onClearAll}
      />,
    );

    const inst = component.getInstance();

    TestRenderer.act(() => {
      inst.methods.selectAll();
    });
    expect(onSelectAll).toHaveBeenCalled();

    TestRenderer.act(() => {
      inst.methods.clearAll();
    });
    expect(onClearAll).toHaveBeenCalled();
  });

  it('fires onSelect when item is selected via addItem', () => {
    const onSelect = jest.fn();

    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" onSelect={onSelect} />,
    );

    TestRenderer.act(() => {
      component.getInstance().methods.addItem(fixture[0]);
    });

    expect(onSelect).toHaveBeenCalledWith([fixture[0]]);
  });

  it('fires onDeselect when item is removed via removeItem', () => {
    const onDeselect = jest.fn();

    const component = selectWithProps(
      <Select
        multi
        options={fixture}
        values={[fixture[0], fixture[1]]}
        labelField="name"
        valueField="id"
        onDeselect={onDeselect}
      />,
    );

    TestRenderer.act(() => {
      component.getInstance().methods.removeItem(null, fixture[0]);
    });

    expect(onDeselect).toHaveBeenCalled();
  });

  it('fires onChange when values change via addItem', () => {
    const onChange = jest.fn();

    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" onChange={onChange} />,
    );

    TestRenderer.act(() => {
      component.getInstance().methods.addItem(fixture[0]);
    });

    expect(onChange).toHaveBeenCalledWith([fixture[0]]);
  });

  it('intercepts dropdown close with onDropdownCloseRequest', () => {
    const onDropdownCloseRequest = jest.fn();

    const component = selectWithProps(
      <Select
        options={fixture}
        labelField="name"
        valueField="id"
        onDropdownCloseRequest={onDropdownCloseRequest}
      />,
    );

    const inst = component.getInstance();
    openDropdown(component);
    expect(inst.state.dropdown).toBe(true);

    TestRenderer.act(() => {
      inst.methods.dropDown('close');
    });

    expect(onDropdownCloseRequest).toHaveBeenCalled();
    expect(inst.state.dropdown).toBe(true);
  });
});

describe('Custom renderers', () => {
  it('uses custom contentRenderer', () => {
    const contentRenderer = jest.fn(() => <div>Custom Content</div>);

    selectWithProps(
      <Select
        options={fixture}
        labelField="name"
        valueField="id"
        contentRenderer={contentRenderer}
      />,
    );

    expect(contentRenderer).toHaveBeenCalled();
  });

  it('uses custom dropdownRenderer', () => {
    const dropdownRenderer = jest.fn(() => <div>Custom Dropdown</div>);

    const component = selectWithProps(
      <Select
        options={fixture}
        labelField="name"
        valueField="id"
        dropdownRenderer={dropdownRenderer}
      />,
    );

    openDropdown(component);
    expect(dropdownRenderer).toHaveBeenCalled();
  });

  it('uses custom itemRenderer', () => {
    const itemRenderer = jest.fn(() => <span>Custom Item</span>);

    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" itemRenderer={itemRenderer} />,
    );

    openDropdown(component);

    const items = component.root.findAllByType('span');
    expect(itemRenderer).toHaveBeenCalled();
  });

  it('uses custom inputRenderer', () => {
    const inputRenderer = jest.fn(() => <input readOnly />);

    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" inputRenderer={inputRenderer} />,
    );

    const rendered = component.root.findAllByType('input');
    expect(inputRenderer).toHaveBeenCalled();
  });
});
