import React from 'react';
import styled from '@emotion/styled';

const Clear = ({ props, state, methods }) =>
  props.clearRenderer ? (
    props.clearRenderer(props, state, methods)
  ) : (
    <ClearComponent
      className="react-dropdown-select-clear"
      tabIndex="-1"
      onClick={() => methods.clearAll()}
      onKeyPress={() => methods.clearAll()}>
      &times;
    </ClearComponent>
  );

const ClearComponent = styled.div`
  line-height: 25px;
  margin: 0 10px;
  cursor: pointer;

  :focus {
    outline: none;
  }

  :hover {
    color: tomato;
  }
`;

export default Clear;
