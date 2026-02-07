import React, { Component, ChangeEvent } from 'react';
import styled from '@emotion/styled';
import { valueExistInSelected } from '../util';
import { LIB_NAME } from '../constants';
import { SelectProps, SelectState, SelectMethods } from 'react-dropdown-select';

interface InputProps<T> {
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
}

const handlePlaceHolder = <T extends object>(props: SelectProps<T>, state: SelectState<T>) => {
  const { addPlaceholder, searchable, placeholder } = props;
  const noValues = state.values && state.values.length === 0;
  const hasValues = state.values && state.values.length > 0;

  if (hasValues && addPlaceholder && searchable) {
    return addPlaceholder;
  }

  if (noValues) {
    return placeholder;
  }

  if (hasValues && !searchable) {
    return '';
  }

  return '';
};

class Input<T extends object> extends Component<InputProps<T>> {
  private input = React.createRef<HTMLInputElement>();

  componentDidUpdate(prevProps: InputProps<T>) {
    if (
      this.props.state.dropdown ||
      (prevProps.state.dropdown !== this.props.state.dropdown && this.props.state.dropdown) ||
      this.props.props.autoFocus
    ) {
      this.input.current?.focus();
    }

    if (prevProps.state.dropdown !== this.props.state.dropdown && !this.props.state.dropdown) {
      this.input.current?.blur();
    }
  }

  onBlur = (event: ChangeEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (!this.props.state.dropdown) {
      return this.input.current?.blur();
    }

    return this.input.current?.focus();
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { props, state, methods } = this.props;

    return (
      props.create &&
      event.key === 'Enter' &&
      !valueExistInSelected(state.search, [...state.values, ...props.options], this.props.props) &&
      state.search &&
      state.cursor === null &&
      methods.createNew(state.search)
    );
  };

  render() {
    const { props, state, methods } = this.props;

    if (props.inputRenderer) {
      return props.inputRenderer({ props, state, methods, inputRef: this.input as any });
    }

    return (
      <InputComponent
        ref={this.input}
        tabIndex="-1"
        onFocus={(event: any) => event.stopPropagation()}
        className={`${LIB_NAME}-input`}
        size={methods.getInputSize()}
        value={state.search}
        readOnly={!props.searchable}
        onClick={() => methods.dropDown('open')}
        onKeyPress={(event: any) => this.handleKeyPress(event)}
        onChange={methods.setSearch}
        onBlur={this.onBlur}
        placeholder={handlePlaceHolder(props, state)}
        disabled={props.disabled}
      />
    );
  }
}

const InputComponent = styled.input<{ readOnly?: boolean }>`
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
