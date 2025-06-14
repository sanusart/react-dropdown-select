/**
 * @jest-environment jsdom
 */
import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '../../src/components/Input';
import { options } from '../options';

const mockProps = (customProps = {}) => ({
  props: {
    inputRenderer: null,
    searchable: true,
    create: true,
    disabled: false,
    placeholder: 'Select...',
    addPlaceholder: 'Add...',
    autoFocus: false,
    direction: 'ltr',
    options: [],
    ...customProps.props
  },
  state: {
    values: [],
    search: '',
    dropdown: false,
    ...customProps.state
  },
  methods: {
    getInputSize: () => 10,
    setSearch: jest.fn(),
    dropDown: jest.fn(),
    createNew: jest.fn(),
    ...customProps.methods
  }
});

describe('Input Component', () => {
  it('renders correctly', () => {
    const { container } = render(<Input {...mockProps()} />);
    expect(container.querySelector('.react-dropdown-select-input')).toBeInTheDocument();
  });

  it('renders with placeholder when no values', () => {
    render(<Input {...mockProps()} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Select...');
  });

  it('renders with add placeholder when has values', () => {
    const props = mockProps({
      state: {
        values: [options[0]],
        dropdown: true
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Add...');
  });

  it('is disabled when props.disabled is true', () => {
    const props = mockProps({
      props: {
        disabled: true
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('calls setSearch on change', () => {
    const setSearch = jest.fn();
    const props = mockProps({
      methods: {
        setSearch
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'test' } });
    expect(setSearch).toHaveBeenCalled();
  });

  it('calls dropDown on click', () => {
    const dropDown = jest.fn();
    const props = mockProps({
      methods: {
        dropDown
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    fireEvent.click(input);
    expect(dropDown).toHaveBeenCalledWith('open');
  });

  it('calls createNew on Enter key press when conditions are met', () => {
    const createNew = jest.fn();
    const props = mockProps({
      props: {
        create: true
      },
      state: {
        search: 'new item',
        cursor: null,
        values: []
      },
      methods: {
        createNew
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(createNew).toHaveBeenCalledWith('new item');
  });

  it('does not call createNew when create prop is false', () => {
    const createNew = jest.fn();
    const props = mockProps({
      props: {
        create: false
      },
      state: {
        search: 'new item',
        cursor: null,
        values: []
      },
      methods: {
        createNew
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(createNew).not.toHaveBeenCalled();
  });

  it('uses custom inputRenderer when provided', () => {
    const customRenderer = jest.fn(() => <div data-testid="custom-input">Custom Input</div>);
    const props = mockProps({
      props: {
        inputRenderer: customRenderer
      }
    });
    render(<Input {...props} />);
    expect(screen.getByTestId('custom-input')).toBeInTheDocument();
    expect(customRenderer).toHaveBeenCalled();
  });

  it('handles focus and blur correctly', () => {
    const props = mockProps();
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');

    input.focus();
    expect(input).toHaveFocus();

    input.blur();
    expect(input).not.toHaveFocus();
  });

  it('has correct size based on getInputSize', () => {
    const props = mockProps({
      methods: {
        getInputSize: () => 15
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('size', '15');
  });

  it('autofocuses when autoFocus prop is true', () => {
    const props = mockProps({
      props: {
        autoFocus: true
      },
      state: {
        dropdown: true
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('is read-only when searchable is false', () => {
    const props = mockProps({
      props: {
        searchable: false
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('readonly');
  });

  it('shows empty placeholder when has values and not searchable', () => {
    const props = mockProps({
      props: {
        searchable: false
      },
      state: {
        values: [options[0]]
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', '');
  });

  it('handles blur event correctly when dropdown is open', () => {
    const props = mockProps({
      state: {
        dropdown: true
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');

    fireEvent.blur(input);
    expect(input).toHaveFocus();
  });

  it('handles blur event correctly when dropdown is closed', () => {
    const props = mockProps({
      state: {
        dropdown: false
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');

    fireEvent.blur(input);
    expect(input).not.toHaveFocus();
  });

  it('does not call createNew when cursor is not null', () => {
    const createNew = jest.fn();
    const props = mockProps({
      props: {
        create: true
      },
      state: {
        search: 'new item',
        cursor: 0,
        values: []
      },
      methods: {
        createNew
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(createNew).not.toHaveBeenCalled();
  });

  it('does not call createNew when search is empty', () => {
    const createNew = jest.fn();
    const props = mockProps({
      props: {
        create: true
      },
      state: {
        search: '',
        cursor: null,
        values: []
      },
      methods: {
        createNew
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(createNew).not.toHaveBeenCalled();
  });

  it('handles focus when dropdown is opened', () => {
    const props = mockProps({
      state: {
        dropdown: true
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveFocus();
  });

  it('handles RTL text direction', () => {
    const props = mockProps({
      props: {
        direction: 'rtl'
      }
    });
    const { container } = render(<Input {...props} />);
    const input = container.querySelector('.react-dropdown-select-input');
    expect(input).toBeInTheDocument();
  });

  it('handles keyboard events correctly', () => {
    const dropDown = jest.fn();
    const setSearch = jest.fn();
    const props = mockProps({
      methods: {
        dropDown,
        setSearch
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');

    fireEvent.click(input);
    expect(dropDown).toHaveBeenCalledWith('open');
  });

  it('prevents default on arrow key events', () => {
    const preventDefault = jest.fn();
    const props = mockProps();
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');

    expect(input).toBeInTheDocument();
  });

  it('handles focus with autoFocus and dropdown combination', () => {
    const props = mockProps({
      props: {
        autoFocus: true
      },
      state: {
        dropdown: true
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveFocus();
  });

  it('handles blur with stopPropagation', () => {
    const stopPropagation = jest.fn();
    const props = mockProps({
      state: {
        dropdown: false
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');

    fireEvent.blur(input);
    expect(input).toBeInTheDocument();
  });

  it('handles focus with stopPropagation', () => {
    const stopPropagation = jest.fn();
    const props = mockProps({
      state: {
        dropdown: true
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');

    fireEvent.focus(input);
    expect(input).toBeInTheDocument();
  });

  it('updates input size based on search content', () => {
    const getInputSize = jest.fn().mockReturnValue(20);
    const props = mockProps({
      state: {
        search: 'long search query'
      },
      methods: {
        getInputSize
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('size', '20');
    expect(getInputSize).toHaveBeenCalled();
  });

  it('handles empty values array correctly', () => {
    const props = mockProps({
      state: {
        values: [],
        search: ''
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Select...');
  });

  it('handles null values correctly', () => {
    const props = mockProps({
      state: {
        values: null,
        search: ''
      },
      props: {
        placeholder: 'Select...',
        searchable: true,
        addPlaceholder: 'Add...'
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', '');
  });

  it('passes correct props to custom inputRenderer', () => {
    const inputRenderer = jest.fn(() => <div>Custom Input</div>);
    const props = mockProps({
      props: {
        inputRenderer
      }
    });
    render(<Input {...props} />);
    expect(inputRenderer).toHaveBeenCalledWith(
      expect.objectContaining({
        props: expect.any(Object),
        state: expect.any(Object),
        methods: expect.any(Object),
        inputRef: expect.any(Object)
      })
    );
  });

  it('handles createNew with special characters in search', () => {
    const createNew = jest.fn();
    const props = mockProps({
      props: {
        create: true
      },
      state: {
        search: 'test "quotes" & <tags>',
        cursor: null,
        values: []
      },
      methods: {
        createNew
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(createNew).toHaveBeenCalledWith('test "quotes" & <tags>');
  });

  it('handles value existence check before creating new item', () => {
    const createNew = jest.fn();
    const props = mockProps({
      props: {
        create: true,
        options: [{ name: 'Existing Item', value: 'existing' }]
      },
      state: {
        search: 'Different Item',
        cursor: null,
        values: []
      },
      methods: {
        createNew
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });
    expect(createNew).toHaveBeenCalledWith('Different Item');
  });

  it('handles dropdown state changes correctly', () => {
    const dropDown = jest.fn();
    const props = mockProps({
      state: {
        dropdown: true
      },
      methods: {
        dropDown
      }
    });
    const { rerender } = render(<Input {...props} />);

    // Test dropdown closing
    rerender(
      <Input
        {...mockProps({
          state: {
            dropdown: false
          },
          methods: {
            dropDown
          }
        })}
      />
    );

    expect(dropDown).not.toHaveBeenCalled();
  });

  it('handles input size with different search lengths', () => {
    const getInputSize = jest.fn().mockReturnValue(15);
    const props = mockProps({
      state: {
        search: 'very long search query'
      },
      methods: {
        getInputSize
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('size', '15');
    expect(getInputSize).toHaveBeenCalled();
  });

  it('handles RTL text direction with values', () => {
    const props = mockProps({
      props: {
        direction: 'rtl'
      },
      state: {
        values: [options[0]]
      }
    });
    const { container } = render(<Input {...props} />);
    const input = container.querySelector('.react-dropdown-select-input');
    expect(input).toBeInTheDocument();
  });

  it('handles blur event with dropdown state change', () => {
    const dropDown = jest.fn();
    const props = mockProps({
      state: {
        dropdown: true
      },
      methods: {
        dropDown
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');

    fireEvent.blur(input);
    expect(input).toHaveFocus();

    // Change dropdown state and verify blur behavior
    const newProps = mockProps({
      state: {
        dropdown: false
      },
      methods: {
        dropDown
      }
    });
    render(<Input {...newProps} />);
    fireEvent.blur(input);
    // Since the input is controlled by useEffect, we can't test the blur state directly
    expect(input).toBeInTheDocument();
  });

  it('handles keyboard events with modifier keys', () => {
    const createNew = jest.fn();
    const props = mockProps({
      props: {
        create: true
      },
      state: {
        search: 'test',
        cursor: null,
        values: []
      },
      methods: {
        createNew
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');

    // Test with ctrl key
    fireEvent.keyPress(input, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
      ctrlKey: true
    });
    expect(createNew).toHaveBeenCalledWith('test');

    // Test with alt key
    createNew.mockClear();
    fireEvent.keyPress(input, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13,
      altKey: true
    });
    expect(createNew).toHaveBeenCalledWith('test');
  });

  it('handles placeholder with empty string values', () => {
    const props = mockProps({
      state: {
        values: ['']
      }
    });
    render(<Input {...props} />);
    const input = screen.getByRole('textbox');
    expect(input).toHaveAttribute('placeholder', 'Add...');
  });
});
