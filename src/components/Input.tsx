import React, { Component, createRef, RefObject, ChangeEvent, KeyboardEvent, FocusEvent } from 'react';
import styled from '@emotion/styled';
import { valueExistInSelected } from '../util';
import { LIB_NAME } from '../constants';

interface InputProps<T = any> {
  props: {
    addPlaceholder?: string;
    searchable?: boolean;
    placeholder?: string;
    inputRenderer?: (args: {
      props: {
        addPlaceholder?: string;
        searchable?: boolean;
        placeholder?: string;
        inputRenderer?: (args: {
          props: any;
          state: any;
          methods: any;
          inputRef: React.RefObject<HTMLInputElement>
        }) => React.ReactNode;
        create?: boolean;
        options: T[];
        disabled?: boolean;
        autoFocus?: boolean
      };
      state: { values: T[]; search: string; cursor: number | null; dropdown: boolean };
      methods: {
        createNew: (search: string) => void;
        getInputSize: () => number;
        dropDown: (action: ('open' | 'close')) => void;
        setSearch: (event: React.ChangeEvent<HTMLInputElement>) => void
      };
      inputRef: React.RefObject<HTMLInputElement | null>
    }) => React.ReactNode;
    create?: boolean;
    options: T[];
    disabled?: boolean;
    autoFocus?: boolean;
  };
  state: {
    values: T[];
    search: string;
    cursor: number | null;
    dropdown: boolean;
  };
  methods: {
    createNew: (search: string) => void;
    getInputSize: () => number;
    dropDown: (action: 'open' | 'close') => void;
    setSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  };
}

const handlePlaceHolder = (props: InputProps['props'], state: InputProps['state']): string => {
  const { addPlaceholder, searchable, placeholder } = props;
  const noValues = !state.values || state.values.length === 0;
  const hasValues = !!state.values && state.values.length > 0;

  if (hasValues && addPlaceholder && searchable) {
    return addPlaceholder;
  }

  if (noValues) {
    return placeholder || '';
  }

  if (hasValues && !searchable) {
    return '';
  }

  return '';
};

class Input<T = any> extends Component<InputProps<T>> {
  input: React.RefObject<HTMLInputElement | null> = createRef();

  componentDidUpdate(prevProps: InputProps<T>) {
    const { state, props } = this.props;

    if (
      state.dropdown ||
      (prevProps.state.dropdown !== state.dropdown && state.dropdown) ||
      props.autoFocus
    ) {
      this.input.current?.focus();
    }

    if (prevProps.state.dropdown !== state.dropdown && !state.dropdown) {
      this.input.current?.blur();
    }
  }

  onBlur = (event: FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (!this.props.state.dropdown) {
      this.input.current?.blur();
    } else {
      this.input.current?.focus();
    }
  };

  handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    const { props, state, methods } = this.props;

    if (
      props.create &&
      event.key === 'Enter' &&
      !valueExistInSelected(state.search, [...state.values, ...props.options], this.props) &&
      state.search &&
      state.cursor === null
    ) {
      methods.createNew(state.search);
    }
  };

  render() {
    const { props, state, methods } = this.props;

    if (props.inputRenderer) {
      return props.inputRenderer({ props, state, methods, inputRef: this.input });
    }

    return (
      <InputComponent
        ref={this.input}
        tabIndex={-1}
        onFocus={(event: { stopPropagation: () => any; }) => event.stopPropagation()}
        className={`${LIB_NAME}-input`}
        size={methods.getInputSize()}
        value={state.search}
        readOnly={!props.searchable}
        onClick={() => methods.dropDown('open')}
        onKeyPress={this.handleKeyPress}
        onChange={methods.setSearch}
        onBlur={this.onBlur}
        placeholder={handlePlaceHolder(props, state)}
        disabled={props.disabled}
      />
    );
  }
}

const InputComponent = styled.input<{ size: number; readOnly?: boolean }>`
  line-height: inherit;
  border: none;
  margin-left: 5px;
  background: transparent;
  padding: 0;
  width: calc(${({ size }) => `${size}ch`} + 5px);
  font-size: smaller;
  ${({ readOnly }) => readOnly && 'cursor: pointer;'}
  :focus {
    outline: none;
  }
`;

export default Input;
