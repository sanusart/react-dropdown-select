import React from 'react';
import styled from '@emotion/styled';
import { LIB_NAME } from '../constants';
import { SelectRenderer, SelectProps, SelectState, SelectMethods } from 'react-dropdown-select';

interface SeparatorProps<T> {
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
}

const Separator = <T extends object>({ props, state, methods }: SeparatorProps<T>) =>
  props.separatorRenderer ? (
    props.separatorRenderer({ props, state, methods } as SelectRenderer<T>)
  ) : (
    <SeparatorComponent className={`${LIB_NAME}-separator`} />
  );

const SeparatorComponent = styled.div`
  border-left: 1px solid #ccc;
  width: 1px;
  height: 25px;
  display: block;
`;

export default Separator;
