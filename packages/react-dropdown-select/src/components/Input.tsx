import React, { Component, RefObject } from 'react';
import { valueExistInSelected } from '../util';
import { LIB_NAME } from '../constants';
import { SelectProps, SelectState, SelectMethods } from '../select-types';

interface InputProps<T> {
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
}

const handlePlaceHolder = <T extends Record<string, any>>(
  props: SelectProps<T>,
  state: SelectState<T>,
): string => {
  const { addPlaceholder, searchable, placeholder } = props;
  const noValues = state.values && state.values.length === 0;
  const hasValues = state.values && state.values.length > 0;

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

class Input<T extends Record<string, any>> extends Component<InputProps<T>> {
  input: RefObject<HTMLInputElement | null> = React.createRef();

  componentDidUpdate(prevProps: InputProps<T>) {
    if (
      this.props.state.dropdown ||
      (prevProps.state.dropdown !== this.props.state.dropdown && this.props.state.dropdown) ||
      this.props.props.autoFocus
    ) {
      this.input.current!.focus();
    }

    if (prevProps.state.dropdown !== this.props.state.dropdown && !this.props.state.dropdown) {
      this.input.current!.blur();
    }
  }

  onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    event.stopPropagation();
    if (!this.props.state.dropdown) {
      return this.input.current!.blur();
    }

    return this.input.current!.focus();
  };

  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { props, state, methods } = this.props;

    return (props.create &&
      event.key === 'Enter' &&
      !valueExistInSelected(state.search, [...state.values, ...props.options!], props) &&
      state.search &&
      state.cursor === null &&
      methods.createNew(state.search)) as any;
  };

  render() {
    const { props, state, methods } = this.props;

    if (props.inputRenderer) {
      return props.inputRenderer({ props, state, methods, inputRef: this.input });
    }

    const readOnly = !props.searchable;

    return (
      <input
        ref={this.input}
        tabIndex={-1}
        onFocus={(event) => event.stopPropagation()}
        className={`${LIB_NAME}-input ${readOnly ? `${LIB_NAME}-input-readonly` : ''}`}
        style={{ '--input-size': methods.getInputSize() } as React.CSSProperties}
        value={state.search}
        readOnly={readOnly}
        onClick={() => methods.dropDown('open')}
        onKeyDown={this.handleKeyDown}
        onChange={methods.setSearch}
        onBlur={this.onBlur}
        placeholder={handlePlaceHolder(props, state)}
        disabled={props.disabled}
      />
    );
  }
}

export default Input;
