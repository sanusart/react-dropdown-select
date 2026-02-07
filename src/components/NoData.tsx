import React from 'react';
import styled from '@emotion/styled';
import { LIB_NAME } from '../constants';
import { SelectRenderer, SelectProps, SelectState, SelectMethods } from 'react-dropdown-select';

interface NoDataProps<T> {
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
}

const NoData = <T extends object>({ props, state, methods }: NoDataProps<T>) =>
  props.noDataRenderer ? (
    props.noDataRenderer({ props, state, methods } as SelectRenderer<T>)
  ) : (
    <NoDataComponent className={`${LIB_NAME}-no-data`} color={props.color}>
      {props.noDataLabel}
    </NoDataComponent>
  );

const NoDataComponent = styled.div<{ color?: string }>`
  padding: 10px;
  text-align: center;
  color: ${({ color }) => color};
`;

export default NoData;
