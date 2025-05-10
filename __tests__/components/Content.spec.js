/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Content from '../../src/components/Content';

const mockProps = (customProps = {}) => ({
  props: {
    contentRenderer: null,
    multi: false,
    labelField: 'name',
    valueField: 'value',
    closeOnClickInput: false,
    direction: 'ltr',
    ...customProps.props
  },
  state: {
    values: [],
    search: '',
    dropdown: false,
    ...customProps.state
  },
  methods: {
    dropDown: jest.fn(),
    removeItem: jest.fn(),
    getInputSize: jest.fn().mockReturnValue(1),
    ...customProps.methods
  }
});

describe('Content Component', () => {
  it('renders correctly', () => {
    const { container } = render(<Content {...mockProps()} />);
    expect(container.querySelector('.react-dropdown-select-content')).toBeInTheDocument();
  });

  it('renders with multi-select class when multi is true', () => {
    const props = mockProps({
      props: {
        multi: true
      }
    });
    const { container } = render(<Content {...props} />);
    expect(container.querySelector('.react-dropdown-select-type-multi')).toBeInTheDocument();
  });

  it('renders with single-select class when multi is false', () => {
    const props = mockProps({
      props: {
        multi: false
      }
    });
    const { container } = render(<Content {...props} />);
    expect(container.querySelector('.react-dropdown-select-type-single')).toBeInTheDocument();
  });

  it('displays selected values in multi-select mode', () => {
    const props = mockProps({
      props: {
        multi: true,
        labelField: 'name'
      },
      state: {
        values: [{ name: 'Option 1', value: '1' }, { name: 'Option 2', value: '2' }]
      }
    });
    render(<Content {...props} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
  });

  it('displays single value in single-select mode', () => {
    const props = mockProps({
      props: {
        multi: false,
        labelField: 'name'
      },
      state: {
        values: [{ name: 'Option 1', value: '1' }]
      }
    });
    render(<Content {...props} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('handles click events with closeOnClickInput true', () => {
    const dropDown = jest.fn();
    const props = mockProps({
      props: {
        closeOnClickInput: true
      },
      state: {
        dropdown: true,
        search: ''
      },
      methods: {
        dropDown
      }
    });
    const { container } = render(<Content {...props} />);
    const content = container.querySelector('.react-dropdown-select-content');
    fireEvent.click(content);
    expect(dropDown).toHaveBeenCalledWith('close');
  });

  it('handles click events with closeOnClickInput false', () => {
    const dropDown = jest.fn();
    const props = mockProps({
      props: {
        closeOnClickInput: false
      },
      state: {
        dropdown: false
      },
      methods: {
        dropDown
      }
    });
    const { container } = render(<Content {...props} />);
    const content = container.querySelector('.react-dropdown-select-content');
    fireEvent.click(content);
    expect(dropDown).toHaveBeenCalledWith('open');
  });

  it('handles click events with search present', () => {
    const dropDown = jest.fn();
    const props = mockProps({
      props: {
        closeOnClickInput: true
      },
      state: {
        dropdown: true,
        search: 'test'
      },
      methods: {
        dropDown
      }
    });
    const { container } = render(<Content {...props} />);
    const content = container.querySelector('.react-dropdown-select-content');
    fireEvent.click(content);
    expect(dropDown).toHaveBeenCalledWith('open');
  });

  it('renders correctly with empty values array', () => {
    const props = mockProps({
      props: {
        multi: true
      },
      state: {
        values: []
      }
    });
    const { container } = render(<Content {...props} />);
    expect(container.querySelector('.react-dropdown-select-type-multi')).toBeInTheDocument();
  });

  it('handles nested object paths in labelField', () => {
    const props = mockProps({
      props: {
        labelField: 'nested.name',
        multi: false
      },
      state: {
        values: [{ nested: { name: 'Nested Option' }, value: '1' }]
      }
    });
    render(<Content {...props} />);
    expect(screen.getByText('Nested Option')).toBeInTheDocument();
  });

  it('handles click event propagation', () => {
    const dropDown = jest.fn();
    const props = mockProps({
      methods: {
        dropDown
      }
    });
    const { container } = render(<Content {...props} />);
    const content = container.querySelector('.react-dropdown-select-content');

    const event = new MouseEvent('click', {
      bubbles: true,
      cancelable: true
    });

    Object.defineProperty(event, 'stopPropagation', {
      value: jest.fn()
    });

    content.dispatchEvent(event);
    expect(event.stopPropagation).toHaveBeenCalled();
  });

  it('renders with RTL direction', () => {
    const props = mockProps({
      props: {
        direction: 'rtl',
        multi: true
      },
      state: {
        values: [{ name: 'Option 1', value: '1' }]
      }
    });
    render(<Content {...props} />);
    expect(screen.getByText('Option 1')).toBeInTheDocument();
  });

  it('handles null values gracefully', () => {
    const props = mockProps({
      state: {
        values: null
      }
    });
    const { container } = render(<Content {...props} />);
    expect(container.querySelector('.react-dropdown-select-content')).toBeInTheDocument();
  });

  it('handles missing object paths gracefully', () => {
    const props = mockProps({
      props: {
        labelField: 'nested.path.that.does.not.exist',
        valueField: 'value'
      },
      state: {
        values: [{ value: 1 }]
      }
    });
    const { container } = render(<Content {...props} />);
    expect(container.querySelector('.react-dropdown-select-content')).toBeInTheDocument();
    expect(container.querySelector('input').value).toBe('');
  });
});
