import React from 'react';
import styled from '@emotion/styled';
import { valueExistInSelected } from '../util';

const handlePlaceHolder = (props, state) => {
  const noValues = state.values && state.values.length === 0;
  const hasValues = state.values && state.values.length > 0;

  if (hasValues && props.addPlaceholder && props.searchable) {
    return props.addPlaceholder;
  }

  if (noValues) {
    return props.placeholder;
  }

  if (hasValues && !props.searchable) {
    return '';
  }

  return '';
};

const Input = ({ props, state, methods }) => {
  const handleKeyPress = (event) =>
    props.create &&
    event.key === 'Enter' &&
    !valueExistInSelected(state.search, state.values) &&
    state.search &&
    state.cursor === null &&
    methods.createNew(state.search);

  return props.inputRenderer ? (
    props.inputRenderer({ props, state, methods })
  ) : (
    <InputComponent
      tabIndex="-1"
      className="react-dropdown-select-input"
      size={methods.getInputSize()}
      value={state.search}
      readOnly={!props.searchable}
      onClick={() => methods.dropDown('open')}
      onKeyPress={handleKeyPress}
      onChange={methods.setSearch}
      placeholder={handlePlaceHolder(props, state)}
    />
  );
};

const InputComponent = styled.input`
  flex: 1;
  display: flex;
  line-height: inherit;
  width: auto;
  border: none;
  margin-left: 5px;
  background: transparent;
  font-size: smaller;
  ${({ readOnly }) => readOnly && 'cursor: pointer;'}
  :focus {
    outline: none;
  }
`;

export default Input;
