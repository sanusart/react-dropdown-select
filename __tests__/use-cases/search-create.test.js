/** @jest-environment jsdom */
import React from 'react';
import {
  selectWithProps,
  findByClassName,
  openDropdown,
  clickItem,
  fixture,
  TestRenderer,
  Select,
} from './helpers';

describe('Search and filter', () => {
  it('filters options when typing in search input', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" searchBy="name" searchable />,
    );

    const inst = component.getInstance();
    const input = findByClassName(component, 'react-dropdown-select-input');
    TestRenderer.act(() => {
      input.props.onChange({ target: { value: 'anne' } });
    });

    expect(inst.state.search).toBe('anne');
    expect(inst.state.searchResults).toHaveLength(1);
    expect(inst.state.searchResults[0].name).toBe('Leanne Graham');
  });

  it('shows all options when search is cleared', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" searchBy="name" />,
    );

    const inst = component.getInstance();
    const input = findByClassName(component, 'react-dropdown-select-input');

    TestRenderer.act(() => {
      input.props.onChange({ target: { value: 'anne' } });
    });
    expect(inst.state.searchResults).toHaveLength(1);

    TestRenderer.act(() => {
      input.props.onChange({ target: { value: '' } });
    });
    expect(inst.state.searchResults).toHaveLength(fixture.length);
  });

  it('uses custom searchFn', () => {
    const searchFn = ({ props, state }) =>
      props.options.filter(({ name }) => name.toLowerCase().includes(state.search.toLowerCase()));

    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" searchFn={searchFn} />,
    );

    const inst = component.getInstance();
    const input = findByClassName(component, 'react-dropdown-select-input');

    TestRenderer.act(() => {
      input.props.onChange({ target: { value: 'graham' } });
    });

    expect(inst.state.searchResults).toHaveLength(1);
    expect(inst.state.searchResults[0].name).toBe('Leanne Graham');
  });

  it('sets cursor to null on search', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" searchBy="name" />,
    );

    const inst = component.getInstance();
    openDropdown(component);

    TestRenderer.act(() => {
      inst.setState({ cursor: 2 });
    });

    const input = findByClassName(component, 'react-dropdown-select-input');
    TestRenderer.act(() => {
      input.props.onChange({ target: { value: 'anne' } });
    });

    expect(inst.state.cursor).toBeNull();
  });

  it('filters with searchBy using valueField as fallback', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="name" searchBy="unknown" />,
    );

    const inst = component.getInstance();
    const input = findByClassName(component, 'react-dropdown-select-input');

    TestRenderer.act(() => {
      input.props.onChange({ target: { value: 'Leanne' } });
    });

    expect(inst.state.searchResults).toHaveLength(1);
    expect(inst.state.searchResults[0].name).toBe('Leanne Graham');
  });

  it('renders input as readOnly when searchable is false', () => {
    const component = selectWithProps(
      <Select options={fixture} labelField="name" valueField="id" searchable={false} />,
    );

    const input = findByClassName(component, 'react-dropdown-select-input');
    expect(input.props.readOnly).toBe(true);
  });
});

describe('Create new option', () => {
  it('creates a new option when create is enabled and search text is new', () => {
    const onCreateNew = jest.fn();
    const onChange = jest.fn();

    const component = selectWithProps(
      <Select
        create
        options={fixture}
        labelField="name"
        valueField="id"
        onCreateNew={onCreateNew}
        onChange={onChange}
      />,
    );

    const inst = component.getInstance();
    openDropdown(component);

    TestRenderer.act(() => {
      inst.methods.createNew('Brand New User');
    });

    expect(inst.state.values).toHaveLength(1);
    expect(inst.state.values[0].name).toBe('Brand New User');
    expect(inst.state.values[0].id).toBe('Brand New User');
    expect(onCreateNew).toHaveBeenCalledWith({
      name: 'Brand New User',
      id: 'Brand New User',
    });
    expect(onChange).toHaveBeenCalled();
  });

  it('creates option via Enter key on input when create is enabled', () => {
    const onChange = jest.fn();
    const onCreateNew = jest.fn();

    const component = selectWithProps(
      <Select
        create
        options={fixture}
        labelField="name"
        valueField="id"
        onChange={onChange}
        onCreateNew={onCreateNew}
      />,
    );

    const inst = component.getInstance();
    const input = findByClassName(component, 'react-dropdown-select-input');

    TestRenderer.act(() => {
      input.props.onChange({ target: { value: 'Custom Item' } });
    });

    TestRenderer.act(() => {
      input.props.onKeyDown({ key: 'Enter', preventDefault: () => {} });
    });

    expect(inst.state.values).toHaveLength(1);
    expect(inst.state.values[0].name).toBe('Custom Item');
    expect(onCreateNew).toHaveBeenCalled();
  });

  it('shows create new label with search text in dropdown', () => {
    const component = selectWithProps(
      <Select
        create
        options={fixture}
        labelField="name"
        valueField="id"
        createNewLabel="Create {search}"
      />,
    );

    const inst = component.getInstance();
    openDropdown(component);

    TestRenderer.act(() => {
      inst.setState({ search: 'NewUser', searchResults: [] });
    });

    const addNewEl = component.root.find(
      (el) =>
        el.props.className && el.props.className.includes('react-dropdown-select-dropdown-add-new'),
    );
    expect(addNewEl).toBeTruthy();
    expect(addNewEl.props.children).toBe('Create "NewUser"');
  });

  it('creates a new option when clicking add-new element', () => {
    const onCreateNew = jest.fn();
    const component = selectWithProps(
      <Select
        create
        options={fixture}
        labelField="name"
        valueField="id"
        onCreateNew={onCreateNew}
      />,
    );

    const inst = component.getInstance();
    openDropdown(component);

    TestRenderer.act(() => {
      inst.setState({ search: 'NewUser', searchResults: [] });
    });

    const addNewEl = component.root.find(
      (el) =>
        el.props.className && el.props.className.includes('react-dropdown-select-dropdown-add-new'),
    );

    TestRenderer.act(() => {
      addNewEl.props.onClick();
    });
    expect(onCreateNew).toHaveBeenCalledWith(expect.objectContaining({ name: 'NewUser' }));
  });
});
