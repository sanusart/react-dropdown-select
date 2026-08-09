/** @jest-environment jsdom */
import React from 'react';
import {
  selectWithProps,
  findByClassName,
  openDropdown,
  clickItem,
  fixture,
  activeFixture,
  TestRenderer,
  Item,
  Select,
} from './helpers';

describe('Single select', () => {
  it('starts with empty values', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" />,
    );
    expect(component.getInstance().state.values).toEqual([]);
    expect(component.getInstance().state.dropdown).toBe(false);
  });

  it('selects an option on click and closes dropdown', () => {
    const onChange = jest.fn();
    const onSelect = jest.fn();

    const component = selectWithProps(
      <Select
        options={fixture}
        labelField="name"
        valueField="id"
        onChange={onChange}
        onSelect={onSelect}
      />,
    );

    const inst = component.getInstance();
    openDropdown(component);
    clickItem(component, 'Leanne Graham');

    expect(inst.state.values).toHaveLength(1);
    expect(inst.state.values[0].name).toBe('Leanne Graham');
    expect(inst.state.dropdown).toBe(false);
    expect(onSelect).toHaveBeenCalledWith([fixture[0]]);
    expect(onChange).toHaveBeenCalledWith([fixture[0]]);
  });

  it('replaces selection when a different option is chosen', () => {
    const onChange = jest.fn();

    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" onChange={onChange} />,
    );

    const inst = component.getInstance();

    openDropdown(component);
    clickItem(component, 'Leanne Graham');
    expect(inst.state.values).toHaveLength(1);

    openDropdown(component);
    clickItem(component, 'Clementine Bauch');
    expect(inst.state.values).toHaveLength(1);
    expect(inst.state.values[0].name).toBe('Clementine Bauch');
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('shows label of selected single value', () => {
    const component = selectWithProps(
      <Select options={fixture} values={[fixture[0]]} labelField="name" valueField="id" />,
    );

    const content = findByClassName(component, 'react-dropdown-select-content');
    const span = content.findByType('span');
    expect(span.children[0]).toBe('Leanne Graham');
  });

  it('closes selection when closeOnSelect is true', () => {
    const component = selectWithProps(
      <Select multi options={fixture} labelField="name" valueField="id" closeOnSelect />,
    );

    const inst = component.getInstance();
    openDropdown(component);
    expect(inst.state.dropdown).toBe(true);

    clickItem(component, 'Leanne Graham');
    expect(inst.state.dropdown).toBe(false);
  });
});

describe('Multi select', () => {
  it('selects multiple options', () => {
    const onChange = jest.fn();
    const onSelect = jest.fn();

    const component = selectWithProps(
      <Select
        multi
        options={fixture}
        labelField="name"
        valueField="id"
        onChange={onChange}
        onSelect={onSelect}
      />,
    );

    const inst = component.getInstance();
    openDropdown(component);
    clickItem(component, 'Leanne Graham');
    expect(inst.state.values).toHaveLength(1);

    clickItem(component, 'Clementine Bauch');
    expect(inst.state.values).toHaveLength(2);
    expect(inst.state.values.map((v) => v.name)).toEqual(['Leanne Graham', 'Clementine Bauch']);
    expect(onSelect).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it('deselects an option already selected in multi mode', () => {
    const onDeselect = jest.fn();

    const component = selectWithProps(
      <Select multi options={fixture} labelField="name" valueField="id" onDeselect={onDeselect} />,
    );

    const inst = component.getInstance();
    openDropdown(component);
    clickItem(component, 'Leanne Graham');
    clickItem(component, 'Clementine Bauch');
    expect(inst.state.values).toHaveLength(2);

    clickItem(component, 'Leanne Graham');
    expect(inst.state.values).toHaveLength(1);
    expect(inst.state.values[0].name).toBe('Clementine Bauch');
    expect(onDeselect).toHaveBeenCalledWith([fixture[2]]);
  });

  it('renders Option chip for each selected value', () => {
    const component = selectWithProps(
      <Select
        multi
        options={fixture}
        values={[fixture[0], fixture[1]]}
        labelField="name"
        valueField="id"
      />,
    );

    const optionEls = component.root.findAll(
      (el) => el.props.className === 'react-dropdown-select-option',
    );
    expect(optionEls).toHaveLength(2);
  });

  it('removes a value via Option remove button', () => {
    const onChange = jest.fn();
    const onDeselect = jest.fn();

    const component = selectWithProps(
      <Select
        multi
        options={fixture}
        values={[fixture[0], fixture[1]]}
        labelField="name"
        valueField="id"
        onChange={onChange}
        onDeselect={onDeselect}
      />,
    );

    const inst = component.getInstance();
    const removeButtons = component.root.findAll(
      (el) =>
        el.props.className && el.props.className.includes('react-dropdown-select-option-remove'),
    );
    TestRenderer.act(() => {
      removeButtons[0].props.onClick({ stopPropagation: () => {}, preventDefault: () => {} });
    });

    expect(inst.state.values).toHaveLength(1);
    expect(inst.state.values[0].name).toBe('Ervin Howell');
    expect(onDeselect).toHaveBeenCalled();
    expect(onChange).toHaveBeenCalled();
  });

  it('calls selectAll when clicking select all button', () => {
    const onSelectAll = jest.fn();
    const component = selectWithProps(
      <Select
        multi
        selectAll
        options={activeFixture}
        labelField="name"
        valueField="id"
        onSelectAll={onSelectAll}
      />,
    );

    openDropdown(component);
    const selectAllEl = component.root.find(
      (el) =>
        el.props.className &&
        el.props.className.includes('react-dropdown-select-dropdown-select-all'),
    );

    TestRenderer.act(() => {
      selectAllEl.props.onClick();
    });
    expect(onSelectAll).toHaveBeenCalled();
  });

  it('calls clearAll when clicking select all button when all selected', () => {
    const onClearAll = jest.fn();
    const component = selectWithProps(
      <Select
        multi
        selectAll
        options={activeFixture}
        values={[...activeFixture]}
        labelField="name"
        valueField="id"
        onClearAll={onClearAll}
      />,
    );

    openDropdown(component);
    const selectAllEl = component.root.find(
      (el) =>
        el.props.className &&
        el.props.className.includes('react-dropdown-select-dropdown-select-all'),
    );

    TestRenderer.act(() => {
      selectAllEl.props.onClick();
    });
    expect(onClearAll).toHaveBeenCalled();
  });

  it('renders select all button when selectAll prop is true', () => {
    const component = selectWithProps(
      <Select multi selectAll options={activeFixture} labelField="name" valueField="id" />,
    );

    openDropdown(component);
    const selectAllEl = component.root.find(
      (el) =>
        el.props.className &&
        el.props.className.includes('react-dropdown-select-dropdown-select-all'),
    );
    expect(selectAllEl).toBeTruthy();
    expect(selectAllEl.props.children).toBe('Select all');
  });

  it('renders clear all button in select all area when all selected', () => {
    const component = selectWithProps(
      <Select
        multi
        selectAll
        options={activeFixture}
        values={[...activeFixture]}
        labelField="name"
        valueField="id"
      />,
    );

    openDropdown(component);
    const selectAllEl = component.root.find(
      (el) =>
        el.props.className &&
        el.props.className.includes('react-dropdown-select-dropdown-select-all'),
    );
    expect(selectAllEl).toBeTruthy();
    expect(selectAllEl.props.children).toBe('Clear all');
  });
});

describe('Controlled values', () => {
  it('updates when values prop changes', () => {
    const component = selectWithProps(
      <Select options={fixture} values={[fixture[0]]} labelField="name" valueField="id" />,
    );

    expect(component.getInstance().state.values).toHaveLength(1);

    TestRenderer.act(() => {
      component.update(
        <Select
          options={fixture}
          values={[fixture[0], fixture[1]]}
          labelField="name"
          valueField="id"
        />,
      );
    });

    expect(component.getInstance().state.values).toHaveLength(2);
  });

  it('accepts initial values from props', () => {
    const component = selectWithProps(
      <Select
        options={fixture}
        values={[fixture[0], fixture[1]]}
        labelField="name"
        valueField="id"
      />,
    );

    expect(component.getInstance().state.values).toHaveLength(2);
  });

  it('uses custom compareValuesFunc', () => {
    const compareValuesFunc = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    const component = selectWithProps(
      <Select
        options={fixture}
        values={[fixture[0]]}
        labelField="name"
        valueField="id"
        compareValuesFunc={compareValuesFunc}
      />,
    );

    TestRenderer.act(() => {
      component.update(
        <Select
          options={fixture}
          values={[fixture[0], fixture[1]]}
          labelField="name"
          valueField="id"
          compareValuesFunc={compareValuesFunc}
        />,
      );
    });

    expect(component.getInstance().state.values).toHaveLength(2);
  });
});

describe('Clear all', () => {
  it('clears all selected values via methods.clearAll()', () => {
    const onChange = jest.fn();
    const onClearAll = jest.fn();

    const component = selectWithProps(
      <Select
        multi
        clearable
        options={fixture}
        values={[fixture[0], fixture[1]]}
        labelField="name"
        valueField="id"
        onChange={onChange}
        onClearAll={onClearAll}
      />,
    );

    const inst = component.getInstance();
    TestRenderer.act(() => {
      inst.methods.clearAll();
    });

    expect(inst.state.values).toEqual([]);
    expect(onClearAll).toHaveBeenCalled();
  });

  it('clears all via Clear button click', () => {
    const onChange = jest.fn();

    const component = selectWithProps(
      <Select
        multi
        clearable
        options={fixture}
        values={[fixture[0], fixture[1]]}
        labelField="name"
        valueField="id"
        onChange={onChange}
      />,
    );

    const clear = findByClassName(component, 'react-dropdown-select-clear');
    TestRenderer.act(() => {
      clear.props.onClick({ stopPropagation: () => {} });
    });

    expect(component.getInstance().state.values).toEqual([]);
    expect(onChange).toHaveBeenCalledWith([]);
  });
});

describe('keepSelectedInList', () => {
  it('renders null for selected items when keepSelectedInList is false', () => {
    const component = selectWithProps(
      <Select
        multi
        options={fixture}
        labelField="name"
        valueField="id"
        keepSelectedInList={false}
      />,
    );

    const inst = component.getInstance();
    openDropdown(component);
    clickItem(component, 'Leanne Graham');

    const items = component.root.findAllByType(Item);
    const grahamItem = items.find((el) => el.props.item.name === 'Leanne Graham');
    expect(grahamItem).toBeDefined();

    const renderedSpan = grahamItem.findAllByType('span');
    expect(renderedSpan).toHaveLength(0);
  });
});

describe('defaultMenuIsOpen', () => {
  it('opens dropdown on mount when true', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" defaultMenuIsOpen />,
    );

    expect(component.getInstance().state.dropdown).toBe(true);
  });
});

describe('Custom label and value fields', () => {
  it('uses custom valueField and labelField', () => {
    const customOptions = [
      { code: 'us', title: 'United States' },
      { code: 'ca', title: 'Canada' },
    ];

    const component = selectWithProps(
      <Select options={customOptions} valueField="code" labelField="title" />,
    );

    const inst = component.getInstance();
    openDropdown(component);

    const itemSpans = component.root.findAllByType(Item).map((item) => item.findByType('span'));
    expect(itemSpans[0].props['aria-label']).toBe('United States');
    expect(itemSpans[1].props['aria-label']).toBe('Canada');

    TestRenderer.act(() => {
      itemSpans[0].props.onClick();
    });

    expect(inst.state.values).toHaveLength(1);
    expect(inst.state.values[0].code).toBe('us');
  });
});

describe('sortBy', () => {
  it('sorts options by custom field', () => {
    const unsorted = [
      { name: 'Charlie', id: 3 },
      { name: 'Alice', id: 1 },
      { name: 'Bob', id: 2 },
    ];

    const component = selectWithProps(
      <Select options={unsorted} labelField="name" valueField="id" sortBy="name" />,
    );

    const input = findByClassName(component, 'react-dropdown-select-input');
    TestRenderer.act(() => {
      input.props.onChange({ target: { value: '' } });
    });

    openDropdown(component);
    const items = component.root.findAllByType(Item);
    expect(items[0].props.item.name).toBe('Alice');
    expect(items[1].props.item.name).toBe('Bob');
    expect(items[2].props.item.name).toBe('Charlie');
  });
});

describe('Methods', () => {
  it('activeCursorItem sets activeCursorItem in state', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();
    TestRenderer.act(() => {
      inst.activeCursorItem(fixture[1]);
    });
    expect(inst.state.activeCursorItem).toBe(fixture[1]);
  });
});

describe('Options change', () => {
  it('updates searchResults when options prop changes', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();
    expect(inst.state.searchResults).toHaveLength(fixture.length);

    TestRenderer.act(() => {
      component.update(<Select options={fixture.slice(0, 1)} labelField="name" valueField="id" />);
    });

    expect(inst.state.searchResults).toHaveLength(1);
  });
});

describe('removeItem', () => {
  it('calls preventDefault and stopPropagation when event and close are true', () => {
    const component = selectWithProps(
      <Select
        multi
        options={fixture}
        values={[fixture[0], fixture[1]]}
        labelField="name"
        valueField="id"
      />,
    );

    const inst = component.getInstance();
    const preventDefault = jest.fn();
    const stopPropagation = jest.fn();

    TestRenderer.act(() => {
      inst.removeItem({ preventDefault, stopPropagation }, fixture[1], true);
    });

    expect(preventDefault).toHaveBeenCalled();
    expect(stopPropagation).toHaveBeenCalled();
    expect(inst.state.values).toHaveLength(1);
  });
});

describe('dropDown toggle action', () => {
  it('toggles dropdown state', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();
    expect(inst.state.dropdown).toBe(false);

    TestRenderer.act(() => {
      inst.methods.dropDown('toggle');
    });
    expect(inst.state.dropdown).toBe(true);

    TestRenderer.act(() => {
      inst.methods.dropDown('toggle');
    });
    expect(inst.state.dropdown).toBe(false);
  });
});
