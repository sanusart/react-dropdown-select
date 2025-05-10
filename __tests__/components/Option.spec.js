/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Option from '../../src/components/Option';
import { LIB_NAME } from '../../src/constants';

const mockProps = (customProps = {}) => ({
  item: {
    label: 'Test Option',
    value: 1
  },
  props: {
    disabled: false,
    direction: 'ltr',
    color: '#0074D9',
    labelField: 'label',
    closeOnSelect: true,
    ...customProps.props
  },
  state: {
    ...customProps.state
  },
  methods: {
    removeItem: jest.fn(),
    ...customProps.methods
  }
});

describe('Option Component', () => {
  it('renders correctly with default props', () => {
    const { container } = render(<Option {...mockProps()} />);
    const option = container.querySelector(`.${LIB_NAME}-option`);
    expect(option).toBeInTheDocument();
    expect(option).toHaveTextContent('Test Option');
  });

  it('uses custom optionRenderer when provided', () => {
    const customRenderer = jest.fn(() => <div data-testid="custom-option">Custom Option</div>);
    const props = mockProps({
      props: {
        optionRenderer: customRenderer
      }
    });
    render(<Option {...props} />);
    expect(screen.getByTestId('custom-option')).toBeInTheDocument();
    expect(customRenderer).toHaveBeenCalledWith(
      expect.objectContaining({
        item: expect.any(Object),
        props: expect.any(Object),
        state: expect.any(Object),
        methods: expect.any(Object)
      })
    );
  });

  it('prevents event propagation on remove click', () => {
    const removeItem = jest.fn();
    const props = mockProps({
      methods: {
        removeItem
      }
    });
    const { container } = render(<Option {...props} />);
    const removeButton = container.querySelector(`.${LIB_NAME}-option-remove`);
    fireEvent.click(removeButton, {
      stopPropagation: jest.fn(),
      preventDefault: jest.fn()
    });
    expect(removeItem).toHaveBeenCalled();
  });

  it('handles RTL direction', () => {
    const props = mockProps({
      props: {
        direction: 'rtl'
      }
    });
    const { container } = render(<Option {...props} />);
    const option = container.querySelector(`.${LIB_NAME}-option`);
    expect(option).toHaveStyle({ flexDirection: 'row-reverse' });
  });

  it('handles disabled state', () => {
    const props = mockProps({
      props: {
        disabled: true
      }
    });
    const { container } = render(<Option {...props} />);
    const option = container.querySelector(`.${LIB_NAME}-option`);
    expect(option).toHaveAttribute('disabled');
  });

  it('handles custom color', () => {
    const props = mockProps({
      props: {
        color: '#FF0000'
      }
    });
    const { container } = render(<Option {...props} />);
    const option = container.querySelector(`.${LIB_NAME}-option`);
    expect(option).toHaveStyle({ background: '#FF0000' });
  });

  it('handles nested labelField path', () => {
    const props = mockProps({
      item: {
        nested: {
          label: 'Nested Label'
        }
      },
      props: {
        labelField: 'nested.label'
      }
    });
    const { container } = render(<Option {...props} />);
    const label = container.querySelector(`.${LIB_NAME}-option-label`);
    expect(label).toBeInTheDocument();
    expect(label.textContent).toBe('');
  });

  it('does not render when item is missing', () => {
    const props = mockProps();
    delete props.item;
    const { container } = render(<Option {...props} />);
    expect(container.firstChild).toBeNull();
  });

  it('handles missing labelField gracefully', () => {
    const props = mockProps({
      props: {
        labelField: 'nonexistent'
      }
    });
    const { container } = render(<Option {...props} />);
    const label = container.querySelector(`.${LIB_NAME}-option-label`);
    expect(label).toHaveTextContent('');
  });

  it('has correct role attribute', () => {
    const props = mockProps();
    const { container } = render(<Option {...props} />);
    const option = container.querySelector(`.${LIB_NAME}-option`);
    expect(option).toHaveAttribute('role', 'listitem');
  });

  it('calls removeItem with correct arguments', () => {
    const removeItem = jest.fn();
    const props = mockProps({
      methods: {
        removeItem
      }
    });
    const { container } = render(<Option {...props} />);
    const removeButton = container.querySelector(`.${LIB_NAME}-option-remove`);
    fireEvent.click(removeButton);
    expect(removeItem).toHaveBeenCalledWith(expect.any(Object), props.item, true);
  });

  it('calls removeItem with closeOnSelect false', () => {
    const removeItem = jest.fn();
    const props = mockProps({
      props: {
        closeOnSelect: false
      },
      methods: {
        removeItem
      }
    });
    const { container } = render(<Option {...props} />);
    const removeButton = container.querySelector(`.${LIB_NAME}-option-remove`);
    fireEvent.click(removeButton);
    expect(removeItem).toHaveBeenCalledWith(expect.any(Object), props.item, false);
  });
});
