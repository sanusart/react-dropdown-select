import React from 'react';
import styled from '@emotion/styled';
import { LIB_NAME } from '../constants';
import { SelectRenderer, SelectProps } from 'react-dropdown-select';

interface ClearProps<T> {
  props: SelectProps<T>;
  state: any;
  methods: any;
}

const Clear = <T extends object>({ props, state, methods }: ClearProps<T>) =>
  props.clearRenderer ? (
    props.clearRenderer({ props, state, methods } as SelectRenderer<T>)
  ) : (
    <ClearComponent
      className={`${LIB_NAME}-clear`}
      tabIndex="-1"
      onClick={() => methods.clearAll()}
      onKeyPress={() => methods.clearAll()}
    >
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
