import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { valueExistInSelected } from '../util';
import * as PropTypes from 'prop-types';
import { LIB_NAME } from '../constants';

const handlePlaceHolder = (props, state) => {
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

const Input = ({ props, state, methods }) => {
  const input = useRef();

  useEffect(() => {
    if ((state.dropdown || props.autoFocus) && input.current) {
      input.current.focus();
    }
  }, [state.dropdown, props.autoFocus]);

  useEffect(() => {
    if (!state.dropdown && input.current) {
      input.current.blur();
    }
  }, [state.dropdown]);

  const onBlur = (event) => {
    event.stopPropagation();
    if (!state.dropdown && input.current) {
      return input.current.blur();
    }

    if (input.current) {
      return input.current.focus();
    }
  };

  const handleKeyPress = (event) => {
    return (
      props.create &&
      event.key === 'Enter' &&
      !valueExistInSelected(state.search, [...state.values, ...props.options], props) &&
      state.search &&
      state.cursor === null &&
      methods.createNew(state.search)
    );
  };

  if (props.inputRenderer) {
    return props.inputRenderer({ props, state, methods, inputRef: input });
  }

  return (
    <InputComponent
      ref={input}
      tabIndex="-1"
      onFocus={(event) => event.stopPropagation()}
      className={`${LIB_NAME}-input`}
      size={methods.getInputSize()}
      value={state.search}
      readOnly={!props.searchable}
      onClick={() => methods.dropDown('open')}
      onKeyPress={handleKeyPress}
      onChange={methods.setSearch}
      onBlur={onBlur}
      placeholder={handlePlaceHolder(props, state)}
      disabled={props.disabled}
    />
  );
};

Input.propTypes = {
  props: PropTypes.object,
  state: PropTypes.object,
  methods: PropTypes.object
};

const InputComponent = styled.input`
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
