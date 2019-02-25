import React from 'react';
import styled from '@emotion/styled';

const DropdownHandle = ({ props, state, methods }) =>
  props.dropdownHandleRenderer ? (
    props.dropdownHandleRenderer({ props, state, methods })
  ) : (
    <DropdownHandleComponent
      tabIndex="-1"
      onClick={(event) => methods.dropDown('toggle', event)}
      dropdownOpen={state.dropdown}
      onKeyPress={(event) => methods.dropDown('toggle', event)}
      onKeyDown={(event) => methods.dropDown('toggle', event)}
      className="react-dropdown-select-dropdown-handle"
      color={props.color}>
      <svg fill="currentColor" viewBox="0 0 40 40"><path d="M31 26.4q0 .3-.2.5l-1.1 1.2q-.3.2-.6.2t-.5-.2l-8.7-8.8-8.8 8.8q-.2.2-.5.2t-.5-.2l-1.2-1.2q-.2-.2-.2-.5t.2-.5l10.4-10.4q.3-.2.6-.2t.5.2l10.4 10.4q.2.2.2.5z"/></svg>
    </DropdownHandleComponent>
  );

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

export default DropdownHandle;
