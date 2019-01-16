import React from 'react';
import styled from '@emotion/styled';

const handlePlaceHolder = (parentProps, parentState) => {
  const noValues = parentState.values && parentState.values.length === 0;
  const hasValues = parentState.values && parentState.values.length > 0;

  if (hasValues && parentProps.addPlaceholder && parentProps.searchable) {
    return parentProps.addPlaceholder;
  }

  if (noValues) {
    return parentProps.placeholder;
  }

  if (hasValues && !parentProps.searchable) {
    return '';
  }

  return '';
};

const Input = ({ parentProps, parentState, parentMethods }) => {
  return parentProps.inputRenderer ? (
    parentProps.inputRenderer(parentProps, parentState, parentMethods)
  ) : (
    <InputComponent
      tabIndex="-1"
      className="react-dropdown-select-input"
      size={parentMethods.getInputSize()}
      value={parentState.search}
      readOnly={!parentProps.searchable}
      onClick={() => parentMethods.dropDown('open')}
      onChange={parentMethods.setSearch}
      placeholder={handlePlaceHolder(parentProps, parentState)}
    />
  );
};

Input.propTypes = {};

const InputComponent = styled.input`
  flex: 1;
  display: flex;
  line-height: inherit;
  width: auto;
  border: none;
  margin-left: 5px;
  background: transparent;
  font-size: smaller;
  ${({ readOnly}) => readOnly && 'cursor: pointer;'}
  :focus {
    outline: none;
  }
`;

export default Input;
