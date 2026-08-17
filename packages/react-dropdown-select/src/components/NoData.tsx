import React from 'react';
import { LIB_NAME } from '../constants';
import { ComponentRendererArgs } from '../select-types';

interface NoDataProps<T> extends ComponentRendererArgs<T> {
  className?: string;
}

const NoData = <T extends Record<string, any>>({
  props,
  state,
  methods,
  className,
}: NoDataProps<T>) =>
  props.noDataRenderer ? (
    props.noDataRenderer({ props, state, methods })
  ) : (
    <div className={`${className || `${LIB_NAME}-no-data`}`}>{props.noDataLabel}</div>
  );

export default NoData;
