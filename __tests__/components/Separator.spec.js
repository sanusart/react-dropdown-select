/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Separator from '../../src/components/Separator';

const mockProps = (customProps = {}) => ({
  props: {
    separatorRenderer: null,
    ...customProps.props
  },
  state: {
    ...customProps.state
  },
  methods: {
    ...customProps.methods
  }
});

describe('Separator Component', () => {
  it('renders correctly', () => {
    const { container } = render(<Separator {...mockProps()} />);
    expect(container.querySelector('.react-dropdown-select-separator')).toBeInTheDocument();
  });

  it('uses custom separatorRenderer when provided', () => {
    const customRenderer = jest.fn(() => (
      <div data-testid="custom-separator">Custom Separator</div>
    ));
    const props = mockProps({
      props: {
        separatorRenderer: customRenderer
      }
    });
    render(<Separator {...props} />);
    expect(screen.getByTestId('custom-separator')).toBeInTheDocument();
    expect(customRenderer).toHaveBeenCalled();
  });

  it('passes correct props to custom separatorRenderer', () => {
    const customRenderer = jest.fn(() => <div>Custom Separator</div>);
    const props = mockProps({
      props: {
        separatorRenderer: customRenderer
      }
    });
    render(<Separator {...props} />);
    expect(customRenderer).toHaveBeenCalledWith(
      expect.objectContaining({
        props: expect.any(Object),
        state: expect.any(Object),
        methods: expect.any(Object)
      })
    );
  });

  it('renders with default styles', () => {
    const { container } = render(<Separator {...mockProps()} />);
    const separator = container.querySelector('.react-dropdown-select-separator');
    expect(separator).toBeInTheDocument();

    // Get computed styles
    const styles = window.getComputedStyle(separator);
    expect(styles.display).toBe('block');
  });

  it('renders without custom renderer when not provided', () => {
    const props = mockProps({
      props: {
        separatorRenderer: null
      }
    });
    const { container } = render(<Separator {...props} />);
    expect(container.querySelector('.react-dropdown-select-separator')).toBeInTheDocument();
  });

  it('handles empty props gracefully', () => {
    const props = mockProps({
      props: {}
    });
    const { container } = render(<Separator {...props} />);
    expect(container.querySelector('.react-dropdown-select-separator')).toBeInTheDocument();
  });

  it('maintains consistent rendering with multiple updates', () => {
    const { container, rerender } = render(<Separator {...mockProps()} />);
    const initialSeparator = container.querySelector('.react-dropdown-select-separator');
    expect(initialSeparator).toBeInTheDocument();

    // Rerender with same props
    rerender(<Separator {...mockProps()} />);
    const updatedSeparator = container.querySelector('.react-dropdown-select-separator');
    expect(updatedSeparator).toBeInTheDocument();
  });
});
