/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Item from '../../src/components/Item';
import { LIB_NAME } from '../../src/constants';

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

const mockProps = (customProps = {}) => ({
  props: {
    multi: false,
    keepSelectedInList: true,
    itemRenderer: null,
    color: '#0074D9',
    labelField: 'label',
    valueField: 'value',
    disabledLabel: 'disabled',
    ...customProps.props
  },
  state: {
    cursor: null,
    ...customProps.state
  },
  methods: {
    isSelected: jest.fn().mockReturnValue(false),
    addItem: jest.fn(),
    handleKeyDown: jest.fn(),
    ...customProps.methods
  },
  item: {
    label: 'Test Item',
    value: 1,
    disabled: false
  },
  itemIndex: 0,
  ...customProps
});

describe('Item Component', () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView.mockClear();
  });

  it('renders correctly with default props', () => {
    const { container } = render(<Item {...mockProps()} />);
    const item = container.querySelector(`.${LIB_NAME}-item`);
    expect(item).toBeInTheDocument();
    expect(item).toHaveTextContent('Test Item');
  });

  it('uses custom itemRenderer when provided', () => {
    const customRenderer = jest.fn(() => <div data-testid="custom-item">Custom Item</div>);
    const props = mockProps({
      props: {
        itemRenderer: customRenderer
      }
    });
    render(<Item {...props} />);
    expect(screen.getByTestId('custom-item')).toBeInTheDocument();
    expect(customRenderer).toHaveBeenCalledWith(
      expect.objectContaining({
        item: expect.any(Object),
        itemIndex: expect.any(Number),
        props: expect.any(Object),
        state: expect.any(Object),
        methods: expect.any(Object)
      })
    );
  });

  it('handles item selection', () => {
    const addItem = jest.fn();
    const props = mockProps({
      methods: {
        addItem,
        isSelected: jest.fn().mockReturnValue(false)
      }
    });
    const { container } = render(<Item {...props} />);
    const item = container.querySelector(`.${LIB_NAME}-item`);
    fireEvent.click(item);
    expect(addItem).toHaveBeenCalledWith(props.item);
  });

  it('handles disabled items', () => {
    const addItem = jest.fn();
    const props = mockProps({
      methods: {
        addItem,
        isSelected: jest.fn().mockReturnValue(false)
      },
      item: {
        label: 'Disabled Item',
        value: 1,
        disabled: true
      }
    });
    const { container } = render(<Item {...props} />);
    const item = container.querySelector(`.${LIB_NAME}-item`);
    expect(item).toHaveClass(`${LIB_NAME}-item-disabled`);
    fireEvent.click(item);
    expect(addItem).not.toHaveBeenCalled();
  });

  it('shows disabled label for disabled items', () => {
    const props = mockProps({
      item: {
        label: 'Disabled Item',
        value: 1,
        disabled: true
      }
    });
    const { container } = render(<Item {...props} />);
    expect(container).toHaveTextContent('disabled');
  });

  it('handles keyboard navigation', () => {
    const addItem = jest.fn();
    const handleKeyDown = jest.fn();
    const props = mockProps({
      methods: {
        addItem,
        handleKeyDown,
        isSelected: jest.fn().mockReturnValue(false)
      }
    });
    const { container } = render(<Item {...props} />);
    const item = container.querySelector(`.${LIB_NAME}-item`);

    // Test Enter key
    fireEvent.keyDown(item, { key: 'Enter' });
    expect(addItem).toHaveBeenCalledWith(props.item);

    // Test Space key
    fireEvent.keyDown(item, { key: ' ' });
    expect(addItem).toHaveBeenCalledWith(props.item);

    // Test Tab key
    fireEvent.keyDown(item, { key: 'Tab' });
    expect(handleKeyDown).toHaveBeenCalled();
  });

  it('scrolls selected item into view on mount', () => {
    const props = mockProps({
      methods: {
        isSelected: jest.fn().mockReturnValue(true)
      }
    });
    render(<Item {...props} />);
    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      block: 'nearest',
      inline: 'start'
    });
  });

  it('scrolls to cursor position when cursor changes', () => {
    const { rerender } = render(<Item {...mockProps()} />);

    // Update with cursor matching itemIndex
    rerender(
      <Item
        {...mockProps({
          state: { cursor: 0 }
        })}
      />
    );

    expect(Element.prototype.scrollIntoView).toHaveBeenCalledWith({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
  });

  it('hides selected items when keepSelectedInList is false', () => {
    const props = mockProps({
      props: {
        keepSelectedInList: false
      },
      methods: {
        isSelected: jest.fn().mockReturnValue(true)
      }
    });
    const { container } = render(<Item {...props} />);
    const item = container.querySelector('span');
    expect(item).toHaveStyle({ display: 'none' });
  });

  it('handles nested labelField path', () => {
    const props = mockProps({
      props: {
        labelField: 'nested.label'
      },
      item: {
        nested: {
          label: 'Nested Label'
        },
        value: 1
      }
    });
    const { container } = render(<Item {...props} />);
    expect(container).toHaveTextContent('Nested Label');
  });

  it('has correct ARIA attributes', () => {
    const props = mockProps();
    const { container } = render(<Item {...props} />);
    const item = container.querySelector(`.${LIB_NAME}-item`);
    expect(item).toHaveAttribute('role', 'option');
    expect(item).toHaveAttribute('aria-selected', 'false');
    expect(item).toHaveAttribute('aria-disabled', 'false');
    expect(item).toHaveAttribute('aria-label', 'Test Item');
  });

  it('applies active class when cursor matches itemIndex', () => {
    const props = mockProps({
      state: {
        cursor: 0
      }
    });
    const { container } = render(<Item {...props} />);
    const item = container.querySelector(`.${LIB_NAME}-item`);
    expect(item).toHaveClass(`${LIB_NAME}-item-active`);
  });

  it('applies selected class when item is selected', () => {
    const props = mockProps({
      methods: {
        isSelected: jest.fn().mockReturnValue(true)
      }
    });
    const { container } = render(<Item {...props} />);
    const item = container.querySelector(`.${LIB_NAME}-item`);
    expect(item).toHaveClass(`${LIB_NAME}-item-selected`);
  });

  it('handles keyboard events for disabled items', () => {
    const addItem = jest.fn();
    const handleKeyDown = jest.fn();
    const props = mockProps({
      methods: {
        addItem,
        handleKeyDown,
        isSelected: jest.fn().mockReturnValue(false)
      },
      item: {
        label: 'Disabled Item',
        value: 1,
        disabled: true
      }
    });
    const { container } = render(<Item {...props} />);
    const item = container.querySelector(`.${LIB_NAME}-item`);

    // Test Enter key
    fireEvent.keyDown(item, { key: 'Enter' });
    expect(addItem).not.toHaveBeenCalled();

    // Test Space key
    fireEvent.keyDown(item, { key: ' ' });
    expect(addItem).not.toHaveBeenCalled();

    // Test Tab key
    fireEvent.keyDown(item, { key: 'Tab' });
    expect(handleKeyDown).not.toHaveBeenCalled();
  });
});
