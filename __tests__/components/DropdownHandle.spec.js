/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DropdownHandle from '../../src/components/DropdownHandle';

const mockProps = (customProps = {}) => ({
  props: {
    dropdownHandleRenderer: null,
    color: '#0074D9',
    ...customProps.props
  },
  state: {
    dropdown: false,
    ...customProps.state
  },
  methods: {
    dropDown: jest.fn(),
    ...customProps.methods
  }
});

describe('DropdownHandle Component', () => {
  it('renders correctly', () => {
    const { container } = render(<DropdownHandle {...mockProps()} />);
    expect(container.querySelector('.react-dropdown-select-dropdown-handle')).toBeInTheDocument();
  });

  it('calls dropDown method with "open" on click when closed', () => {
    const dropDown = jest.fn();
    const props = mockProps({
      state: {
        dropdown: false
      },
      methods: {
        dropDown
      }
    });
    const { container } = render(<DropdownHandle {...props} />);
    const handle = container.querySelector('.react-dropdown-select-dropdown-handle');
    fireEvent.click(handle);
    expect(dropDown).toHaveBeenCalledWith('open', expect.any(Object));
  });

  it('calls dropDown method with "close" on click when open', () => {
    const dropDown = jest.fn();
    const props = mockProps({
      state: {
        dropdown: true
      },
      methods: {
        dropDown
      }
    });
    const { container } = render(<DropdownHandle {...props} />);
    const handle = container.querySelector('.react-dropdown-select-dropdown-handle');
    fireEvent.click(handle);
    expect(dropDown).toHaveBeenCalledWith('close', expect.any(Object));
  });

  it('calls dropDown method with "toggle" on keyPress', () => {
    const dropDown = jest.fn();
    const props = mockProps({
      methods: {
        dropDown
      }
    });
    const { container } = render(<DropdownHandle {...props} />);
    const handle = container.querySelector('.react-dropdown-select-dropdown-handle');
    fireEvent.keyPress(handle, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(dropDown).toHaveBeenCalledWith('toggle', expect.any(Object));
  });

  it('calls dropDown method with "toggle" on keyDown', () => {
    const dropDown = jest.fn();
    const props = mockProps({
      methods: {
        dropDown
      }
    });
    const { container } = render(<DropdownHandle {...props} />);
    const handle = container.querySelector('.react-dropdown-select-dropdown-handle');
    fireEvent.keyDown(handle, { key: 'Enter' });
    expect(dropDown).toHaveBeenCalledWith('toggle', expect.any(Object));
  });

  it('uses custom dropdownHandleRenderer when provided', () => {
    const customRenderer = jest.fn(() => <div data-testid="custom-handle">Custom Handle</div>);
    const props = mockProps({
      props: {
        dropdownHandleRenderer: customRenderer
      }
    });
    render(<DropdownHandle {...props} />);
    expect(screen.getByTestId('custom-handle')).toBeInTheDocument();
    expect(customRenderer).toHaveBeenCalled();
  });

  it('passes correct props to custom dropdownHandleRenderer', () => {
    const customRenderer = jest.fn(() => <div>Custom Handle</div>);
    const props = mockProps({
      props: {
        dropdownHandleRenderer: customRenderer
      }
    });
    render(<DropdownHandle {...props} />);
    expect(customRenderer).toHaveBeenCalledWith(
      expect.objectContaining({
        props: expect.any(Object),
        state: expect.any(Object),
        methods: expect.any(Object)
      })
    );
  });

  it('renders default SVG icon when no renderer provided', () => {
    const { container } = render(<DropdownHandle {...mockProps()} />);
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute('viewBox', '0 0 40 40');
  });

  it('has correct tab index for accessibility', () => {
    const { container } = render(<DropdownHandle {...mockProps()} />);
    const handle = container.querySelector('.react-dropdown-select-dropdown-handle');
    expect(handle).toHaveAttribute('tabIndex', '-1');
  });

  it('applies rotation styles based on dropdown state', () => {
    // Test closed state
    const { container, rerender } = render(<DropdownHandle {...mockProps()} />);
    const closedHandle = container.querySelector('.react-dropdown-select-dropdown-handle');
    expect(closedHandle).toHaveStyle({ transform: 'rotate(180deg)' });

    // Test open state
    rerender(<DropdownHandle {...mockProps({ state: { dropdown: true } })} />);
    const openHandle = container.querySelector('.react-dropdown-select-dropdown-handle');
    expect(openHandle).toHaveStyle({ transform: 'rotate(0deg)' });
  });

  it('handles empty props gracefully', () => {
    const props = mockProps({
      props: {}
    });
    const { container } = render(<DropdownHandle {...props} />);
    expect(container.querySelector('.react-dropdown-select-dropdown-handle')).toBeInTheDocument();
  });

  it('handles multiple key events correctly', () => {
    const dropDown = jest.fn();
    const props = mockProps({
      methods: {
        dropDown
      }
    });
    const { container } = render(<DropdownHandle {...props} />);
    const handle = container.querySelector('.react-dropdown-select-dropdown-handle');

    fireEvent.keyDown(handle, { key: 'Enter' });
    fireEvent.keyDown(handle, { key: 'Space' });
    expect(dropDown).toHaveBeenCalledTimes(2);
  });

  it('handles custom color prop', () => {
    const props = mockProps({
      props: {
        color: '#FF0000'
      }
    });
    const { container } = render(<DropdownHandle {...props} />);
    const handle = container.querySelector('.react-dropdown-select-dropdown-handle');
    expect(handle).toHaveAttribute('color', '#FF0000');
  });
});
