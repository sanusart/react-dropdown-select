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
      className="react-dropdown-select-dropdown-handle"
      color={parentProps.color}>
      <svg fill="currentColor" preserveAspectRatio="xMidYMid meet" viewBox="0 0 40 40">
        <g>
          <path d="m31 26.4q0 0.3-0.2 0.5l-1.1 1.2q-0.3 0.2-0.6 0.2t-0.5-0.2l-8.7-8.8-8.8 8.8q-0.2 0.2-0.5 0.2t-0.5-0.2l-1.2-1.2q-0.2-0.2-0.2-0.5t0.2-0.5l10.4-10.4q0.3-0.2 0.6-0.2t0.5 0.2l10.4 10.4q0.2 0.2 0.2 0.5z" />
        </g>
      </svg>
    </DropdownHandleComponent>
  );

dropdownHandle.propTypes = {};

const DropdownHandleComponent = styled.div`
  text-align: center;
  ${({ dropdownOpen }) =>
    dropdownOpen
      ? `
      transform: rotate(0deg);
      margin: 0px 0 -3px 5px;
      `
      : `
      margin: 0 0 0 5px;
      transform: rotate(180deg);
      `};
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
  }

  :hover {
    path {
      stroke: ${({ color }) => color};
    }
  }

  :focus {
    outline: none;

    path {
      stroke: ${({ color }) => color};
    }
  }
`;

export default dropdownHandle;
