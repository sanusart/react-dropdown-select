import React from 'react';
import styled from '@emotion/styled';

const dropdownHandle = ({ parentProps, parentState, parentMethods }) =>
  parentProps.dropdownHandleRenderer ? (
    parentProps.dropdownHandleRenderer(parentProps, parentState, parentMethods)
  ) : (
    <DropdownHandleComponent
      tabIndex="-1"
      onClick={() => parentMethods.dropDown()}
      dropdownOpen={parentState.dropdown}
      onKeyPress={() => parentMethods.dropDown()}
      onKeyDown={() => parentMethods.dropDown()}
      className="react-dropdown-select-dropdown-handle">
      <svg viewBox="0 0 10 10" className="react-dropdown-select-dropdown-handle-svg">
        <path
          className="react-dropdown-select-dropdown-handle-svg-path"
          d="M2,5 L5,3 L8,5"
          fill="none"
          strokeWidth="2"
          stroke="#000"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </DropdownHandleComponent>
  );

dropdownHandle.propTypes = {};

const DropdownHandleComponent = styled.div`
  width: 10px;
  text-align: center;
  transform: ${({ dropdownOpen }) => (dropdownOpen ? 'rotate(0deg)' : 'rotate(180deg)')};
  cursor: pointer;
  margin: 0 5px 0 9px;

  :hover {
    path {
      stroke: deepskyblue;
    }
  }

  :focus {
    outline: none;

    path {
      stroke: deepskyblue;
    }
  }
`;

export default dropdownHandle;
