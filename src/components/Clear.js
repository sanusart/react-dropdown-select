import React from 'react';
import styled from '@emotion/styled';

const Clear = ({ parentProps, parentState, parentMethods }) =>
  parentProps.clearRenderer ? (
    parentProps.clearRenderer(parentProps, parentState, parentMethods)
  ) : (
    <ClearComponent
      tabIndex="-1"
      onClick={() => parentMethods.clearAll()}
      onKeyPress={() => parentMethods.clearAll()}>
      &times;
    </ClearComponent>
  );

Clear.propTypes = {};

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
