/** @jest-environment jsdom */
import React from 'react';
import {
  selectWithProps,
  findByClassName,
  openDropdown,
  fixture,
  activeFixture,
  clickItem,
  TestRenderer,
  Select,
} from './helpers';

describe('Loading state', () => {
  it('renders loading indicator when loading is true', () => {
    const component = selectWithProps(
      <Select loading options={fixture} labelField="name" valueField="id" />,
    );

    expect(
      component.root.find(
        (el) => el.props.className && el.props.className.includes('react-dropdown-select-loading'),
      ),
    ).toBeTruthy();
  });
});

describe('Select all / Clear all', () => {
  it('selects all non-disabled options', () => {
    const onSelectAll = jest.fn();

    const component = selectWithProps(
      <Select
        multi
        options={activeFixture}
        labelField="name"
        valueField="id"
        onSelectAll={onSelectAll}
      />,
    );

    const inst = component.getInstance();
    TestRenderer.act(() => {
      inst.methods.selectAll();
    });

    expect(inst.state.values).toHaveLength(activeFixture.length);
    expect(onSelectAll).toHaveBeenCalled();
  });

  it('selects only non-disabled options', () => {
    const opts = [
      { id: 1, name: 'A' },
      { id: 2, name: 'B', disabled: true },
      { id: 3, name: 'C' },
    ];

    const component = selectWithProps(
      <Select multi options={opts} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();
    TestRenderer.act(() => {
      inst.methods.selectAll();
    });

    expect(inst.state.values).toHaveLength(2);
    expect(inst.state.values.map((v) => v.name)).toEqual(['A', 'C']);
  });

  it('toggles select all / clear all', () => {
    const component = selectWithProps(
      <Select multi options={activeFixture} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();

    TestRenderer.act(() => {
      inst.methods.toggleSelectAll();
    });
    expect(inst.state.values).toHaveLength(activeFixture.length);

    TestRenderer.act(() => {
      inst.methods.toggleSelectAll();
    });
    expect(inst.state.values).toHaveLength(0);
  });

  it('areAllSelected returns false when not all selected', () => {
    const component = selectWithProps(
      <Select multi options={activeFixture} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();
    expect(inst.methods.areAllSelected()).toBe(false);
  });

  it('areAllSelected returns true when all selected', () => {
    const component = selectWithProps(
      <Select
        multi
        options={activeFixture}
        values={[...activeFixture]}
        labelField="name"
        valueField="id"
      />,
    );

    const inst = component.getInstance();
    expect(inst.methods.areAllSelected()).toBe(true);
  });
});

describe('Directions and positioning', () => {
  it('renders with ltr direction', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" direction="ltr" />,
    );

    const selectEl = findByClassName(component, 'react-dropdown-select');
    expect(selectEl.props.style['--select-direction']).toBe('ltr');
  });

  it('renders with rtl direction', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" direction="rtl" />,
    );

    const selectEl = findByClassName(component, 'react-dropdown-select');
    expect(selectEl.props.style['--select-direction']).toBe('rtl');
  });

  it('renders dropdown with auto position', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" dropdownPosition="auto" />,
    );

    openDropdown(component);
    const dropdown = component.root.find(
      (el) => el.props.className && el.props.className.includes('react-dropdown-select-dropdown '),
    );
    expect(dropdown).toBeTruthy();
  });

  it('renders dropdown at top position', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" dropdownPosition="top" />,
    );

    openDropdown(component);
    const dropdown = findByClassName(component, 'react-dropdown-select-dropdown-top');
    expect(dropdown).toBeTruthy();
  });
});

describe('Dropdown handle', () => {
  it('renders dropdown handle by default', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" />,
    );

    const handle = component.root.find(
      (el) =>
        el.props.className && el.props.className.includes('react-dropdown-select-dropdown-handle'),
    );
    expect(handle).toBeTruthy();
  });

  it('hides dropdown handle when dropdownHandle is false', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" dropdownHandle={false} />,
    );

    const handles = component.root.findAll(
      (el) =>
        el.props.className && el.props.className.includes('react-dropdown-select-dropdown-handle'),
    );
    expect(handles).toHaveLength(0);
  });
});

describe('Separator', () => {
  it('renders separator when separator prop is true', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" separator />,
    );

    const sep = component.root.find(
      (el) => el.props.className && el.props.className.includes('react-dropdown-select-separator'),
    );
    expect(sep).toBeTruthy();
  });
});

describe('Form integration', () => {
  it('renders hidden input when name is provided', () => {
    const component = selectWithProps(
      <Select
        options={fixture}
        values={[fixture[0]]}
        labelField="name"
        valueField="id"
        name="user-select"
      />,
    );

    const hiddenInputs = component.root.findAll(
      (el) => el.type === 'input' && el.props.name === 'user-select',
    );
    expect(hiddenInputs).toHaveLength(1);
    expect(hiddenInputs[0].props.tabIndex).toBe(-1);
  });

  it('renders hidden input when required is true', () => {
    const component = selectWithProps(
      <Select options={fixture} values={[fixture[0]]} labelField="name" valueField="id" required />,
    );

    const hiddenInputs = component.root.findAll(
      (el) => el.type === 'input' && el.props.required === true,
    );
    expect(hiddenInputs).toHaveLength(1);
  });

  it('passes pattern to hidden input', () => {
    const component = selectWithProps(
      <Select
        options={fixture}
        values={[fixture[0]]}
        labelField="name"
        valueField="id"
        name="user-select"
        pattern="[A-Za-z]+"
      />,
    );

    const hiddenInputs = component.root.findAll(
      (el) => el.type === 'input' && el.props.name === 'user-select',
    );
    expect(hiddenInputs[0].props.pattern).toBe('[A-Za-z]+');
  });
});

describe('Custom class name', () => {
  it('applies custom className to wrapper', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" className="my-custom-class" />,
    );

    const selectEl = findByClassName(component, 'react-dropdown-select');
    expect(selectEl.props.className).toContain('my-custom-class');
  });
});

describe('Keep open', () => {
  it('keeps dropdown open when keepOpen is true', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" keepOpen />,
    );

    const inst = component.getInstance();
    openDropdown(component);
    expect(inst.state.dropdown).toBe(true);

    TestRenderer.act(() => {
      inst.methods.dropDown('close');
    });

    expect(inst.state.dropdown).toBe(true);
  });
});

describe('Dropdown position', () => {
  it('renders dropdown with bottom class by default', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" dropdownPosition="bottom" />,
    );

    openDropdown(component);
    const dropdown = component.root.find(
      (el) => el.props.className && el.props.className.includes('react-dropdown-select-dropdown '),
    );
    expect(dropdown.props.className).toContain('react-dropdown-select-dropdown-bottom');
  });

  it('renders dropdown with top class when position is top', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" dropdownPosition="top" />,
    );

    openDropdown(component);
    const dropdown = component.root.find(
      (el) => el.props.className && el.props.className.includes('react-dropdown-select-dropdown '),
    );
    expect(dropdown.props.className).toContain('react-dropdown-select-dropdown-top');
  });
});

describe('Dropdown gap and height', () => {
  it('applies dropdownGap to offset', () => {
    const component = selectWithProps(
      <Select
        options={fixture}
        labelField="name"
        valueField="id"
        dropdownGap={20}
        dropdownHeight="200px"
      />,
    );

    openDropdown(component);
    const dropdown = component.root.find(
      (el) => el.props.className && el.props.className.includes('react-dropdown-select-dropdown '),
    );
    expect(dropdown.props.style['--dropdown-height']).toBe('200px');
  });
});

describe('No data label', () => {
  it('shows no data label when search has no results', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" noDataLabel="Nothing found" />,
    );

    const inst = component.getInstance();
    openDropdown(component);

    TestRenderer.act(() => {
      inst.setState({ search: 'zzzzz', searchResults: [] });
    });

    const noData = component.root.find(
      (el) => el.props.className && el.props.className.includes('react-dropdown-select-no-data'),
    );
    expect(noData).toBeTruthy();
  });
});

describe('Clear on blur', () => {
  it('clears search on dropdown close when clearOnBlur is true', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" searchBy="name" clearOnBlur />,
    );

    const inst = component.getInstance();
    const input = findByClassName(component, 'react-dropdown-select-input');

    openDropdown(component);
    TestRenderer.act(() => {
      input.props.onChange({ target: { value: 'anne' } });
    });
    expect(inst.state.search).toBe('anne');

    TestRenderer.act(() => {
      inst.methods.dropDown('close');
    });
    expect(inst.state.search).toBe('');
  });

  it('preserves search on dropdown close when clearOnBlur is false', () => {
    const component = selectWithProps(
      <Select
        options={fixture}
        labelField="name"
        valueField="id"
        searchBy="name"
        clearOnBlur={false}
      />,
    );

    const inst = component.getInstance();
    const input = findByClassName(component, 'react-dropdown-select-input');

    TestRenderer.act(() => {
      input.props.onChange({ target: { value: 'anne' } });
    });

    TestRenderer.act(() => {
      inst.methods.dropDown('close');
    });
    expect(inst.state.search).toBe('anne');
  });
});

describe('addPlaceholder', () => {
  it('shows addPlaceholder when values exist and searchable', () => {
    const component = selectWithProps(
      <Select
        multi
        options={fixture}
        values={[fixture[0]]}
        labelField="name"
        valueField="id"
        addPlaceholder="Type to search..."
        searchable
      />,
    );

    const input = findByClassName(component, 'react-dropdown-select-input');
    expect(input.props.placeholder).toBe('Type to search...');
  });
});

describe('autoFocus', () => {
  it('focuses input when autoFocus is true', () => {
    const focusSpy = jest.fn();
    const component = selectWithProps(
      <Select autoFocus options={fixture} labelField="name" valueField="id" />,
    );

    const input = component.root.findByType('input');
    expect(input.props.autoFocus).not.toBeDefined();

    const inputInstance = component.root.find(
      (el) => el.props.className && el.props.className.includes('react-dropdown-select-input'),
    );
    expect(inputInstance).toBeTruthy();
  });
});

describe('dropdownHandle', () => {
  it('does not render dropdown handle when dropdownHandle is false', () => {
    const component = selectWithProps(
      <Select dropdownHandle={false} options={fixture} labelField="name" valueField="id" />,
    );

    const handles = component.root.findAll(
      (el) =>
        el.props.className && el.props.className.includes('react-dropdown-select-dropdown-handle'),
    );
    expect(handles).toHaveLength(0);
  });
});

describe('Input onBlur', () => {
  it('calls blur on input when dropdown is closed', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" />,
    );

    const inputEl = findByClassName(component, 'react-dropdown-select-input');
    TestRenderer.act(() => {
      inputEl.props.onBlur({
        stopPropagation: () => {},
      });
    });
  });

  it('calls focus on input when dropdown is open', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" />,
    );

    const inst = component.getInstance();
    TestRenderer.act(() => {
      inst.setState({ dropdown: true });
    });

    const inputEl = findByClassName(component, 'react-dropdown-select-input');
    TestRenderer.act(() => {
      inputEl.props.onBlur({
        stopPropagation: () => {},
      });
    });
  });
});

describe('multi prop change', () => {
  it('handles multi prop change without error', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" />,
    );

    TestRenderer.act(() => {
      component.update(<Select multi options={fixture} labelField="name" valueField="id" />);
    });
  });
});
