import React from 'react';
import { LIB_NAME } from '../constants';
import { ComponentRendererArgs } from '../select-types';

const Separator = <T extends Record<string, any>>({ props, state, methods }: ComponentRendererArgs<T>) =>
  props.separatorRenderer ? (
    props.separatorRenderer({ props, state, methods })
  ) : (
    <div className={`${LIB_NAME}-separator`} />
  );

export default Separator;
