import React from 'react';
import styled from '@emotion/styled';
import { LIB_NAME } from '../constants';

import type { SelectPropsStateMethodsType } from '../../types';

function Clear<T extends object | string = NonNullable<unknown>>({
  props,
  state,
  methods,
}: SelectPropsStateMethodsType<T>): React.ReactNode {
  if (props.clearRenderer) {
    return props.clearRenderer({ props, state, methods });
  }

  return (
    <ClearComponent
      className={`${LIB_NAME}-clear`}
      tabIndex="-1"
      onClick={() => methods.clearAll()}
      onKeyPress={() => methods.clearAll()}
    >
      &times;
    </ClearComponent>
  );
}

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
