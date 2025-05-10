/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Loading from '../../src/components/Loading';

const mockProps = (customProps = {}) => ({
  props: {
    loadingRenderer: null,
    color: '#0074D9',
    ...customProps.props
  }
});

describe('Loading Component', () => {
  it('renders correctly', () => {
    const { container } = render(<Loading {...mockProps()} />);
    expect(container.querySelector('.react-dropdown-select-loading')).toBeInTheDocument();
  });

  it('uses custom loadingRenderer when provided', () => {
    const customRenderer = jest.fn(() => <div data-testid="custom-loading">Custom Loading</div>);
    const props = mockProps({
      props: {
        loadingRenderer: customRenderer
      }
    });
    render(<Loading {...props} />);
    expect(screen.getByTestId('custom-loading')).toBeInTheDocument();
    expect(customRenderer).toHaveBeenCalled();
  });

  it('passes correct props to custom loadingRenderer', () => {
    const customRenderer = jest.fn(() => <div>Custom Loading</div>);
    const props = mockProps({
      props: {
        loadingRenderer: customRenderer
      }
    });
    render(<Loading {...props} />);
    expect(customRenderer).toHaveBeenCalledWith(
      expect.objectContaining({
        props: expect.any(Object)
      })
    );
  });

  it('renders with custom color', () => {
    const props = mockProps({
      props: {
        color: '#FF0000'
      }
    });
    const { container } = render(<Loading {...props} />);
    const loading = container.querySelector('.react-dropdown-select-loading');
    expect(loading).toBeInTheDocument();
  });

  it('handles empty props gracefully', () => {
    const props = mockProps({
      props: {}
    });
    const { container } = render(<Loading {...props} />);
    expect(container.querySelector('.react-dropdown-select-loading')).toBeInTheDocument();
  });

  it('maintains consistent rendering with multiple updates', () => {
    const { container, rerender } = render(<Loading {...mockProps()} />);
    const initialLoading = container.querySelector('.react-dropdown-select-loading');
    expect(initialLoading).toBeInTheDocument();

    // Rerender with different props
    rerender(
      <Loading
        {...mockProps({
          props: {
            color: '#FF0000'
          }
        })}
      />
    );
    const updatedLoading = container.querySelector('.react-dropdown-select-loading');
    expect(updatedLoading).toBeInTheDocument();
  });

  it('renders with default styles', () => {
    const { container } = render(<Loading {...mockProps()} />);
    const loading = container.querySelector('.react-dropdown-select-loading');
    expect(loading).toBeInTheDocument();
  });

  it('handles different color formats', () => {
    // Test hex color
    const hexProps = mockProps({
      props: {
        color: '#FF0000'
      }
    });
    const { container, rerender } = render(<Loading {...hexProps} />);
    expect(container.querySelector('.react-dropdown-select-loading')).toBeInTheDocument();

    // Test RGB color
    rerender(
      <Loading
        {...mockProps({
          props: {
            color: 'rgb(255, 0, 0)'
          }
        })}
      />
    );
    expect(container.querySelector('.react-dropdown-select-loading')).toBeInTheDocument();

    // Test named color
    rerender(
      <Loading
        {...mockProps({
          props: {
            color: 'red'
          }
        })}
      />
    );
    expect(container.querySelector('.react-dropdown-select-loading')).toBeInTheDocument();
  });

  it('renders with RTL support', () => {
    const { container } = render(
      <div dir="rtl">
        <Loading {...mockProps()} />
      </div>
    );
    const loading = container.querySelector('.react-dropdown-select-loading');
    expect(loading).toBeInTheDocument();
  });
});
