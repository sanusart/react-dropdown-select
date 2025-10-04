import React from 'react';
import styled from '@emotion/styled';
import { valueExistInSelected } from '../util';
import { LIB_NAME } from '../constants';

import type { SelectProps, SelectState, SelectPropsStateMethodsType } from '../../types';

function handlePlaceHolder<T extends object | string = NonNullable<unknown>>(
  props: SelectProps<T>,
  state: SelectState<T>,
): string {
  const { addPlaceholder, searchable, placeholder } = props;
  const noValues = state.values && state.values.length === 0;
  const hasValues = state.values && state.values.length > 0;

  if (hasValues && addPlaceholder && searchable) {
    return addPlaceholder as string;
  }

  if (noValues) {
    return placeholder as string;
  }

  if (hasValues && !searchable) {
    return '';
  }

  return '';
}

class Input<T extends object | string = NonNullable<unknown>> extends React.Component<
  SelectPropsStateMethodsType<T>
> {
  inputRef: React.RefObject<HTMLInputElement> = React.createRef();

  componentDidUpdate(prevProps: SelectPropsStateMethodsType<T>) {
    if (
      this.props.state.dropdown ||
      (prevProps.state.dropdown !== this.props.state.dropdown && this.props.state.dropdown) ||
      this.props.props.autoFocus
    ) {
      this.inputRef.current && this.inputRef.current.focus();
    }

    if (prevProps.state.dropdown !== this.props.state.dropdown && !this.props.state.dropdown) {
      this.inputRef.current && this.inputRef.current.blur();
    }
  }

  onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (!this.props.state.dropdown) {
      return this.inputRef.current && this.inputRef.current.blur();
    }

    return this.inputRef.current && this.inputRef.current.focus();
  };

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { props, state, methods } = this.props;

    return (
      props.create &&
      event.key === 'Enter' &&
      !valueExistInSelected(
        state.search,
        [...(state.values as T[]), ...(props.options as T[])],
        props,
      ) &&
      state.search &&
      state.cursor === null &&
      methods.createNew(state.search as string)
    );
  };

  render(): React.ReactNode {
    const { props, state, methods } = this.props;

    if (props.inputRenderer) {
      return props.inputRenderer({ props, state, methods, inputRef: this.inputRef });
    }

    return (
      <InputComponent
        ref={this.inputRef}
        tabIndex={-1}
        onFocus={(event: React.FocusEvent<HTMLInputElement>) => event.stopPropagation()}
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

// Provide a minimal styled prop interface to avoid `any` in template interpolations
interface InputComponentProps {
  size: number;
  readOnly?: boolean;
}

const InputComponent = styled.input<InputComponentProps>`
  line-height: inherit;
  border: none;
  margin-left: 5px;
  background: transparent;
  padding: 0;
  width: calc(${({ size }: InputComponentProps) => `${size}ch`} + 5px);
  font-size: smaller;
  ${({ readOnly }: InputComponentProps) => readOnly && 'cursor: pointer;'}
  :focus {
    outline: none;
  }
`;

export default Input;
