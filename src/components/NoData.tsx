import React from 'react';
import styled from '@emotion/styled';
import { LIB_NAME } from '../constants';

import type { SelectProps, SelectState, SelectMethods } from '../../types';

interface NoDataProps<T extends object | string = NonNullable<unknown>> {
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
}

function NoData<T extends object | string = NonNullable<unknown>>({
  props,
  state,
  methods,
}: NoDataProps<T>): React.ReactNode {
  if (props.noDataRenderer) {
    return props.noDataRenderer({ props, state, methods });
  }

  return React.createElement(
    NoDataComponent,
    { className: `${LIB_NAME}-no-data`, color: props.color },
    props.noDataLabel,
  );
}

const NoDataComponent = styled.div`
  padding: 10px;
  text-align: center;
  color: ${({ color }) => color};
`;

export default NoData;
