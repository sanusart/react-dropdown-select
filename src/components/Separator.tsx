import React from 'react';
import styled from '@emotion/styled';
import { LIB_NAME } from '../constants';

import type { SelectProps, SelectState, SelectMethods } from '../../types';

interface SeparatorProps<T extends object | string = NonNullable<unknown>> {
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
}

function Separator<T extends object | string = NonNullable<unknown>>({
  props,
  state,
  methods,
}: SeparatorProps<T>): React.ReactNode {
  if (props.separatorRenderer) {
    return props.separatorRenderer({ props, state, methods });
  }

  return React.createElement(SeparatorComponent, { className: `${LIB_NAME}-separator` });
}

const SeparatorComponent = styled.div`
  border-left: 1px solid #ccc;
  width: 1px;
  height: 25px;
  display: block;
`;

export default Separator;
