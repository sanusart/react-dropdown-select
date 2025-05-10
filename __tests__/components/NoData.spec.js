/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NoData from '../../src/components/NoData';

const mockProps = (customProps = {}) => ({
  props: {
    noDataRenderer: null,
    noDataLabel: 'No data',
    color: '#0074D9',
    ...customProps.props
  },
  state: {
    ...customProps.state
  },
  methods: {
    ...customProps.methods
  }
});

describe('NoData Component', () => {
  it('renders correctly', () => {
    const { container } = render(<NoData {...mockProps()} />);
    expect(container.querySelector('.react-dropdown-select-no-data')).toBeInTheDocument();
  });

  it('displays default noDataLabel', () => {
    render(<NoData {...mockProps()} />);
    expect(screen.getByText('No data')).toBeInTheDocument();
  });

  it('displays custom noDataLabel', () => {
    const props = mockProps({
      props: {
        noDataLabel: 'Custom no data message'
      }
    });
    render(<NoData {...props} />);
    expect(screen.getByText('Custom no data message')).toBeInTheDocument();
  });

  it('uses custom noDataRenderer when provided', () => {
    const customRenderer = jest.fn(() => <div data-testid="custom-no-data">Custom No Data</div>);
    const props = mockProps({
      props: {
        noDataRenderer: customRenderer
      }
    });
    render(<NoData {...props} />);
    expect(screen.getByTestId('custom-no-data')).toBeInTheDocument();
    expect(customRenderer).toHaveBeenCalled();
  });

  it('passes correct props to custom noDataRenderer', () => {
    const customRenderer = jest.fn(() => <div>Custom No Data</div>);
    const props = mockProps({
      props: {
        noDataRenderer: customRenderer
      }
    });
    render(<NoData {...props} />);
    expect(customRenderer).toHaveBeenCalledWith(
      expect.objectContaining({
        props: expect.any(Object),
        state: expect.any(Object),
        methods: expect.any(Object)
      })
    );
  });

  it('renders with custom color', () => {
    const props = mockProps({
      props: {
        color: '#FF0000'
      }
    });
    const { container } = render(<NoData {...props} />);
    const noData = container.querySelector('.react-dropdown-select-no-data');
    expect(noData).toBeInTheDocument();

    // Get computed styles
    const styles = window.getComputedStyle(noData);
    expect(styles.color).toBe('rgb(255, 0, 0)');
  });

  it('handles empty props gracefully', () => {
    const props = mockProps({
      props: {}
    });
    const { container } = render(<NoData {...props} />);
    expect(container.querySelector('.react-dropdown-select-no-data')).toBeInTheDocument();
  });

  it('maintains consistent rendering with multiple updates', () => {
    const { container, rerender } = render(<NoData {...mockProps()} />);
    const initialNoData = container.querySelector('.react-dropdown-select-no-data');
    expect(initialNoData).toBeInTheDocument();

    // Rerender with different props
    rerender(
      <NoData
        {...mockProps({
          props: {
            noDataLabel: 'Updated message'
          }
        })}
      />
    );
    expect(screen.getByText('Updated message')).toBeInTheDocument();
  });

  it('renders with default styles', () => {
    const { container } = render(<NoData {...mockProps()} />);
    const noData = container.querySelector('.react-dropdown-select-no-data');
    expect(noData).toBeInTheDocument();

    // Get computed styles
    const styles = window.getComputedStyle(noData);
    expect(styles.padding).toBe('10px');
    expect(styles.textAlign).toBe('center');
  });

  it('handles long noDataLabel text', () => {
    const props = mockProps({
      props: {
        noDataLabel:
          'This is a very long no data message that should still be displayed correctly without breaking the layout'
      }
    });
    render(<NoData {...props} />);
    expect(screen.getByText(props.props.noDataLabel)).toBeInTheDocument();
  });
});
