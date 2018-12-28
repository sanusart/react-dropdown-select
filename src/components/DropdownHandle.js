import React from 'react';
import styled from '@emotion/styled';

const dropdownHandle = ({ parentProps, parentState, parentMethods }) => parentProps.dropdownHandleRenderer ? (
  parentProps.dropdownHandleRenderer(parentProps, parentState, parentMethods)
) : (
  <DropdownHandleComponent
    tabIndex="3"
    onClick={() => parentMethods.dropDown()}
    onKeyPress={() => parentMethods.dropDown()}
    className="react-dropdown-select-dropdown-handle">
    {parentState.dropdown ? (
      <React.Fragment>&rsaquo;</React.Fragment>
    ) : (
      <React.Fragment>&lsaquo;</React.Fragment>
    )}
  </DropdownHandleComponent>
);

dropdownHandle.propTypes = {};

const DropdownHandleComponent = styled.div`
  width: 20px;
  text-align: center;
  line-height: 25px;
  transform: rotate(-90deg);
  cursor: pointer;
  font-size: 26px;
  outline: none;
`;

export default dropdownHandle;
