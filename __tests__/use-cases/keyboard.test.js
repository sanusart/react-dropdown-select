/** @jest-environment jsdom */
import React from 'react';
import {
  selectWithProps,
  findByClassName,
  openDropdown,
  fixture,
  TestRenderer,
  Select,
} from './helpers';

describe('Keyboard navigation', () => {
  it('opens dropdown via methods.dropDown', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();
    TestRenderer.act(() => {
      inst.methods.dropDown('open');
    });
    expect(inst.state.dropdown).toBe(true);
  });

  it('sets cursor and selects item via handleKeyDownFn', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();
    const args = {
      event: { key: 'ArrowDown', preventDefault: () => {} },
      state: { ...inst.state, dropdown: true, searchResults: fixture },
      props: inst.props,
      methods: inst.methods,
      setState: inst.setState.bind(inst),
    };

    TestRenderer.act(() => {
      inst.handleKeyDownFn(args);
    });
    expect(inst.state.cursor).toBe(0);

    args.event = { key: 'Enter', preventDefault: () => {} };
    args.state = { ...inst.state, dropdown: true, searchResults: fixture, cursor: 0 };

    TestRenderer.act(() => {
      inst.handleKeyDownFn(args);
    });

    expect(inst.state.values).toHaveLength(1);
    expect(inst.state.values[0].name).toBe(fixture[0].name);
  });

  it('closes dropdown with Escape via handleKeyDownFn', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();
    openDropdown(component);
    expect(inst.state.dropdown).toBe(true);

    TestRenderer.act(() => {
      inst.handleKeyDownFn({
        event: { key: 'Escape', preventDefault: () => {} },
        state: inst.state,
        props: inst.props,
        methods: inst.methods,
        setState: inst.setState.bind(inst),
      });
    });

    expect(inst.state.dropdown).toBe(false);
  });

  it('moves cursor with ArrowDown and ArrowUp via handleKeyDownFn', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();
    const args = {
      event: { key: 'ArrowDown', preventDefault: () => {} },
      state: { ...inst.state, dropdown: true, cursor: null, searchResults: fixture },
      props: inst.props,
      methods: inst.methods,
      setState: inst.setState.bind(inst),
    };

    TestRenderer.act(() => {
      inst.handleKeyDownFn(args);
    });
    expect(inst.state.cursor).toBe(0);

    args.state = { ...inst.state, dropdown: true, cursor: 0, searchResults: fixture };
    TestRenderer.act(() => {
      inst.handleKeyDownFn(args);
    });
    expect(inst.state.cursor).toBe(1);

    args.state = { ...inst.state, dropdown: true, cursor: 1, searchResults: fixture };
    TestRenderer.act(() => {
      inst.handleKeyDownFn(args);
    });
    expect(inst.state.cursor).toBe(2);

    args.state = { ...inst.state, dropdown: true, cursor: fixture.length, searchResults: fixture };
    TestRenderer.act(() => {
      inst.handleKeyDownFn(args);
    });
    expect(inst.state.cursor).toBe(0);
  });

  it('opens dropdown with ArrowDown when closed', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();
    expect(inst.state.dropdown).toBe(false);

    TestRenderer.act(() => {
      inst.handleKeyDownFn({
        event: { key: 'ArrowDown', preventDefault: () => {} },
        state: inst.state,
        props: inst.props,
        methods: inst.methods,
        setState: inst.setState.bind(inst),
      });
    });

    expect(inst.state.dropdown).toBe(true);
  });

  it('calls handleKeyDownFn when provided', () => {
    const handleKeyDownFn = jest.fn();

    const component = selectWithProps(
      <Select
        options={fixture}
        labelField="name"
        valueField="id"
        handleKeyDownFn={handleKeyDownFn}
      />,
    );

    const selectDiv = findByClassName(component, 'react-dropdown-select');
    TestRenderer.act(() => {
      selectDiv.props.onKeyDown({ key: 'ArrowDown', preventDefault: () => {} });
    });

    expect(handleKeyDownFn).toHaveBeenCalled();
  });

  it('does not select disabled item with Enter', () => {
    const opts = [
      { id: 1, name: 'Active' },
      { id: 2, name: 'Blocked', disabled: true },
    ];

    const component = selectWithProps(<Select options={opts} labelField="name" valueField="id" />);

    const inst = component.getInstance();
    const args = {
      event: { key: 'ArrowDown', preventDefault: () => {} },
      state: { ...inst.state, dropdown: true, cursor: null, searchResults: opts },
      props: inst.props,
      methods: inst.methods,
      setState: inst.setState.bind(inst),
    };

    TestRenderer.act(() => {
      inst.handleKeyDownFn(args);
    });
    expect(inst.state.cursor).toBe(0);

    args.state = { ...inst.state, dropdown: true, cursor: 0, searchResults: opts };
    TestRenderer.act(() => {
      inst.handleKeyDownFn(args);
    });
    expect(inst.state.cursor).toBe(1);

    args.event = { key: 'Enter', preventDefault: () => {} };
    args.state = { ...inst.state, dropdown: true, cursor: 1, searchResults: opts };

    TestRenderer.act(() => {
      inst.handleKeyDownFn(args);
    });

    expect(inst.state.values).toHaveLength(0);
  });
});

describe('Backspace delete', () => {
  it('removes last selected value on Backspace when input is empty', () => {
    const component = selectWithProps(
      <Select
        multi
        options={fixture}
        values={[fixture[0], fixture[1]]}
        labelField="name"
        valueField="id"
        placeholder=""
        backspaceDelete
      />,
    );

    const inst = component.getInstance();
    expect(inst.state.values).toHaveLength(2);

    TestRenderer.act(() => {
      inst.handleKeyDownFn({
        event: { key: 'Backspace', preventDefault: () => {} },
        state: inst.state,
        props: inst.props,
        methods: inst.methods,
        setState: inst.setState.bind(inst),
      });
    });

    expect(inst.state.values).toHaveLength(1);
    expect(inst.state.values[0].name).toBe('Leanne Graham');
  });

  it('does not remove on Backspace when backspaceDelete is false', () => {
    const component = selectWithProps(
      <Select
        multi
        options={fixture}
        values={[fixture[0], fixture[1]]}
        labelField="name"
        valueField="id"
        backspaceDelete={false}
      />,
    );

    const inst = component.getInstance();
    expect(inst.state.values).toHaveLength(2);

    TestRenderer.act(() => {
      inst.handleKeyDownFn({
        event: { key: 'Backspace', preventDefault: () => {} },
        state: inst.state,
        props: inst.props,
        methods: inst.methods,
        setState: inst.setState.bind(inst),
      });
    });

    expect(inst.state.values).toHaveLength(2);
  });
});

describe('ArrowUp navigation', () => {
  it('wraps cursor from 0 to searchResults.length on ArrowUp', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();
    const args = {
      event: { key: 'ArrowUp', preventDefault: () => {} },
      state: { ...inst.state, dropdown: true, searchResults: fixture, cursor: 0 },
      props: inst.props,
      methods: inst.methods,
      setState: inst.setState.bind(inst),
    };

    TestRenderer.act(() => {
      inst.handleKeyDownFn(args);
    });
    expect(inst.state.cursor).toBe(fixture.length);
  });

  it('decrements cursor on ArrowUp when cursor > 0', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();
    TestRenderer.act(() => {
      inst.setState({ cursor: 2 });
    });

    const args = {
      event: { key: 'ArrowUp', preventDefault: () => {} },
      state: { ...inst.state, dropdown: true, searchResults: fixture, cursor: 2 },
      props: inst.props,
      methods: inst.methods,
      setState: inst.setState.bind(inst),
    };

    TestRenderer.act(() => {
      inst.handleKeyDownFn(args);
    });
    expect(inst.state.cursor).toBe(1);
  });
});

describe('Tab navigation', () => {
  it('sets cursor to 0 on Tab when dropdown is open', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();
    const args = {
      event: { key: 'Tab', preventDefault: () => {} },
      state: { ...inst.state, dropdown: true, searchResults: fixture, cursor: null },
      props: inst.props,
      methods: inst.methods,
      setState: inst.setState.bind(inst),
    };

    TestRenderer.act(() => {
      inst.handleKeyDownFn(args);
    });
    expect(inst.state.cursor).toBe(0);
  });

  it('decrements cursor on Shift+Tab when dropdown is open and cursor > 0', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();
    TestRenderer.act(() => {
      inst.setState({ cursor: 2 });
    });

    const args = {
      event: { key: 'Tab', shiftKey: true, preventDefault: () => {} },
      state: { ...inst.state, dropdown: true, searchResults: fixture, cursor: 2 },
      props: inst.props,
      methods: inst.methods,
      setState: inst.setState.bind(inst),
    };

    TestRenderer.act(() => {
      inst.handleKeyDownFn(args);
    });
    expect(inst.state.cursor).toBe(1);
  });

  it('wraps cursor on Shift+Tab when cursor is 0 and dropdown is open', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();
    const args = {
      event: { key: 'Tab', shiftKey: true, preventDefault: () => {} },
      state: { ...inst.state, dropdown: true, searchResults: fixture, cursor: 0 },
      props: inst.props,
      methods: inst.methods,
      setState: inst.setState.bind(inst),
    };

    TestRenderer.act(() => {
      inst.handleKeyDownFn(args);
    });
    expect(inst.state.cursor).toBe(fixture.length);
  });
});

describe('Enter on existing value', () => {
  it('returns null when Enter is pressed on a search value that already exists in selected values', () => {
    const component = selectWithProps(
      <Select create options={fixture} values={[fixture[0]]} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();
    TestRenderer.act(() => {
      inst.setState({ search: fixture[0].name, cursor: null, searchResults: [fixture[0]] });
    });

    const args = {
      event: { key: 'Enter', preventDefault: () => {} },
      state: { ...inst.state, dropdown: true, searchResults: [fixture[0]], cursor: 0 },
      props: inst.props,
      methods: inst.methods,
      setState: inst.setState.bind(inst),
    };

    const result = inst.handleKeyDownFn(args);
    expect(result).toBeNull();
  });
});
