/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Clear from '../../src/components/Clear';

const mockProps = (customProps = {}) => ({
  props: {
    clearRenderer: null,
    ...customProps.props
  },
  state: {
    values: [],
    ...customProps.state
  },
  methods: {
    clearAll: jest.fn(),
    ...customProps.methods
  }
});

describe('Clear Component', () => {
  it('renders correctly', () => {
    const { container } = render(<Clear {...mockProps()} />);
    expect(container.querySelector('.react-dropdown-select-clear')).toBeInTheDocument();
  });

  it('calls clearAll method on click', () => {
    const clearAll = jest.fn();
    const props = mockProps({
      methods: {
        clearAll
      }
    });
    const { container } = render(<Clear {...props} />);
    const clearButton = container.querySelector('.react-dropdown-select-clear');
    fireEvent.click(clearButton);
    expect(clearAll).toHaveBeenCalled();
  });

  it('calls clearAll method on keypress', () => {
    const clearAll = jest.fn();
    const props = mockProps({
      methods: {
        clearAll
      }
    });
    const { container } = render(<Clear {...props} />);
    const clearButton = container.querySelector('.react-dropdown-select-clear');
    fireEvent.keyPress(clearButton, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(clearAll).toHaveBeenCalled();
  });

  it('uses custom clearRenderer when provided', () => {
    const customRenderer = jest.fn(() => <div data-testid="custom-clear">Custom Clear</div>);
    const props = mockProps({
      props: {
        clearRenderer: customRenderer
      }
    });
    render(<Clear {...props} />);
    expect(screen.getByTestId('custom-clear')).toBeInTheDocument();
    expect(customRenderer).toHaveBeenCalled();
  });

  it('passes correct props to custom clearRenderer', () => {
    const customRenderer = jest.fn(() => <div>Custom Clear</div>);
    const props = mockProps({
      props: {
        clearRenderer: customRenderer
      }
    });
    render(<Clear {...props} />);
    expect(customRenderer).toHaveBeenCalledWith(
      expect.objectContaining({
        props: expect.any(Object),
        state: expect.any(Object),
        methods: expect.any(Object)
      })
    );
  });

  it('has correct tab index for accessibility', () => {
    const { container } = render(<Clear {...mockProps()} />);
    const clearButton = container.querySelector('.react-dropdown-select-clear');
    expect(clearButton).toHaveAttribute('tabIndex', '-1');
  });

  it('handles multiple click events correctly', () => {
    const clearAll = jest.fn();
    const props = mockProps({
      methods: {
        clearAll
      }
    });
    const { container } = render(<Clear {...props} />);
    const clearButton = container.querySelector('.react-dropdown-select-clear');

    fireEvent.click(clearButton);
    fireEvent.click(clearButton);
    fireEvent.click(clearButton);

    expect(clearAll).toHaveBeenCalledTimes(3);
  });

  it('handles multiple keypress events correctly', () => {
    const clearAll = jest.fn();
    const props = mockProps({
      methods: {
        clearAll
      }
    });
    const { container } = render(<Clear {...props} />);
    const clearButton = container.querySelector('.react-dropdown-select-clear');

    fireEvent.keyPress(clearButton, { key: 'Enter', code: 'Enter', charCode: 13 });
    fireEvent.keyPress(clearButton, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(clearAll).toHaveBeenCalledTimes(2);
  });

  it('renders with correct content', () => {
    const { container } = render(<Clear {...mockProps()} />);
    const clearButton = container.querySelector('.react-dropdown-select-clear');
    expect(clearButton).toHaveTextContent('×');
  });
});
