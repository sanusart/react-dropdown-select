import React from 'react';
import { LIB_NAME } from '../constants';
import { ComponentRendererArgs } from '../select-types';

interface NoDataProps<T> extends ComponentRendererArgs<T> {
  className?: string;
}

const NoData = <T extends Record<string, any>>({ props, state, methods, className }: NoDataProps<T>) =>
  props.noDataRenderer ? (
    props.noDataRenderer({ props, state, methods })
  ) : (
    <div
      className={`${className || `${LIB_NAME}-no-data`}`}
      style={{ '--select-color': props.color } as React.CSSProperties}>
      {props.noDataLabel}
    </div>
  );

export default NoData;
