/**
 * @jest-environment jsdom
 */
import React from 'react';
import TestRenderer from 'react-test-renderer';
import { render, fireEvent, act, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Select from '../src/index';

jest.useFakeTimers();

// Mock window methods
window.addEventListener = jest.fn();
window.removeEventListener = jest.fn();
Element.prototype.getBoundingClientRect = () => ({
  width: 100,
  height: 100,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0
});

const mockProps = (props = {}) => ({
  values: [],
  options: [
    { value: 1, label: 'Option 1' },
    { value: 2, label: 'Option 2' },
    { value: 3, label: 'Option 3', disabled: true }
  ],
  onChange: jest.fn(),
  ...props
});

const selectWithProps = (component) => {
  return TestRenderer.create(component, {
    createNodeMock: (element) => {
      if (element.type === 'div') {
        return {
          blur: jest.fn(),
          focus: jest.fn(),
          getBoundingClientRect: () => ({
            width: 100,
            height: 100,
            top: 0,
            left: 0,
            bottom: 0,
            right: 0
          })
        };
      }
      return null;
    }
  });
};

describe('<Select/> component', () => {
  beforeEach(() => {
    window.addEventListener = jest.fn();
    window.removeEventListener = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const tree = selectWithProps(<Select {...mockProps()} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('handles lifecycle methods correctly', () => {
    const { unmount } = render(<Select {...mockProps()} />);

    expect(window.addEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(window.addEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));

    unmount();
    expect(window.removeEventListener).toHaveBeenCalledWith('resize', expect.any(Function));
    expect(window.removeEventListener).toHaveBeenCalledWith('scroll', expect.any(Function));
  });

  it('handles dropdown open/close', async () => {
    const { container } = render(<Select options={mockProps().options} />);
    const selectNode = container.querySelector('.react-dropdown-select');

    act(() => {
      fireEvent.mouseDown(selectNode);
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(selectNode.getAttribute('aria-expanded')).toBe('true');
      expect(container.querySelector('.react-dropdown-select-dropdown')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.mouseDown(document.body);
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(selectNode.getAttribute('aria-expanded')).toBe('false');
      expect(container.querySelector('.react-dropdown-select-dropdown')).not.toBeInTheDocument();
    });
  });

  it('handles item selection in multi mode', () => {
    const onChange = jest.fn();
    const component = selectWithProps(<Select {...mockProps({ onChange, multi: true })} />);

    TestRenderer.act(() => {
      component.toTree().instance.addItem({ value: 1, label: 'Option 1' });
    });

    expect(component.toTree().instance.state.values).toHaveLength(1);
    expect(onChange).toHaveBeenCalled();

    TestRenderer.act(() => {
      component.toTree().instance.removeItem(null, { value: 1, label: 'Option 1' });
    });

    expect(component.toTree().instance.state.values).toHaveLength(0);
  });

  it('handles search functionality', () => {
    const component = selectWithProps(<Select {...mockProps()} />);

    TestRenderer.act(() => {
      component.toTree().instance.setSearch({ target: { value: 'Option 1' } });
    });

    expect(component.toTree().instance.state.search).toBe('Option 1');
    expect(component.toTree().instance.state.searchResults).toHaveLength(1);
  });

  it('handles select all functionality', () => {
    const component = selectWithProps(<Select {...mockProps({ multi: true })} />);

    TestRenderer.act(() => {
      component.toTree().instance.selectAll();
    });

    expect(component.toTree().instance.state.values).toHaveLength(2); // Excluding disabled option
  });

  it('handles clear all functionality', () => {
    const component = selectWithProps(
      <Select
        {...mockProps({
          multi: true,
          values: [{ value: 1, label: 'Option 1' }, { value: 2, label: 'Option 2' }]
        })}
      />
    );

    TestRenderer.act(() => {
      component.toTree().instance.clearAll();
    });

    expect(component.toTree().instance.state.values).toHaveLength(0);
  });

  it('handles keyboard navigation', () => {
    const { container } = render(<Select {...mockProps()} />);

    // Open dropdown
    act(() => {
      fireEvent.mouseDown(container.querySelector('.react-dropdown-select'));
    });

    // Press down arrow
    act(() => {
      fireEvent.keyDown(container.querySelector('.react-dropdown-select'), { key: 'ArrowDown' });
    });

    const options = container.querySelectorAll('.react-dropdown-select-item');
    expect(options[0]).toHaveClass('react-dropdown-select-item-active');
  });

  it('handles create new option', () => {
    const component = selectWithProps(
      <Select
        {...mockProps({
          create: true,
          createNewLabel: 'Create: '
        })}
      />
    );

    TestRenderer.act(() => {
      component.toTree().instance.setSearch({ target: { value: 'New Option' } });
      component.toTree().instance.createNew('New Option');
    });

    expect(component.toTree().instance.state.values[0].label).toBe('New Option');
  });

  it('handles closeOnSelect prop', () => {
    const component = selectWithProps(<Select {...mockProps({ closeOnSelect: true })} />);

    TestRenderer.act(() => {
      component.toTree().instance.dropDown('open');
      component.toTree().instance.addItem({ value: 1, label: 'Option 1' });
    });

    expect(component.toTree().instance.state.dropdown).toBe(false);
  });

  it.skip('handles closeOnScroll prop', async () => {
    jest.useFakeTimers();

    const onDropdownCloseRequest = jest.fn(({ close }) => {
      close();
    });

    const { container } = render(
      <Select
        options={mockProps().options}
        closeOnScroll
        onDropdownCloseRequest={onDropdownCloseRequest}
        debounceDelay={100}
      />
    );

    const selectNode = container.querySelector('.react-dropdown-select');

    // First, ensure the dropdown is open
    act(() => {
      fireEvent.mouseDown(selectNode);
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(selectNode.getAttribute('aria-expanded')).toBe('true');
      expect(container.querySelector('.react-dropdown-select-dropdown')).toBeInTheDocument();
    });

    // Now trigger the scroll event
    act(() => {
      const scrollEvent = new Event('scroll');
      window.dispatchEvent(scrollEvent);
      // Wait for the debounce delay
      jest.advanceTimersByTime(100);
      jest.runAllTimers();
    });

    // Wait for onDropdownCloseRequest to be called
    await waitFor(() => {
      expect(onDropdownCloseRequest).toHaveBeenCalledWith({
        props: expect.any(Object),
        methods: expect.any(Object),
        state: expect.objectContaining({
          dropdown: true
        }),
        close: expect.any(Function)
      });
    });

    // Get the close function and call it
    const closeFunction = onDropdownCloseRequest.mock.calls[0][0].close;
    act(() => {
      closeFunction();
      jest.runAllTimers();
    });

    // Verify the dropdown is closed
    await waitFor(() => {
      expect(selectNode.getAttribute('aria-expanded')).toBe('false');
      expect(container.querySelector('.react-dropdown-select-dropdown')).not.toBeInTheDocument();
    });

    jest.useRealTimers();
  });

  it('handles custom compare function', () => {
    const compareValuesFunc = (a, b) => JSON.stringify(a) === JSON.stringify(b);
    const component = selectWithProps(<Select {...mockProps({ compareValuesFunc })} />);

    const newValues = [{ value: 1, label: 'Option 1' }];
    TestRenderer.act(() => {
      component.root.instance.componentDidUpdate({ ...mockProps(), values: [] }, { values: [] });
    });

    expect(component.toTree().instance.state.values).toEqual([]);
  });

  it('handles onDropdownCloseRequest prop', async () => {
    const onDropdownCloseRequest = jest.fn();
    const { container } = render(
      <Select options={mockProps().options} onDropdownCloseRequest={onDropdownCloseRequest} />
    );
    const selectNode = container.querySelector('.react-dropdown-select');

    act(() => {
      fireEvent.mouseDown(selectNode);
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(selectNode.getAttribute('aria-expanded')).toBe('true');
      expect(container.querySelector('.react-dropdown-select-dropdown')).toBeInTheDocument();
    });

    act(() => {
      fireEvent.mouseDown(document.body);
      jest.runAllTimers();
    });

    await waitFor(() => {
      expect(onDropdownCloseRequest).toHaveBeenCalled();
    });
  });
});
