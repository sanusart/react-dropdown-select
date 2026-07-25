import React from 'react';
import { LIB_NAME } from '../constants';
import { SelectProps } from '../select-types';

interface LoadingProps<T> {
  props: SelectProps<T>;
}

const Loading = <T extends Record<string, any>>({ props }: LoadingProps<T>) =>
  props.loadingRenderer ? (
    props.loadingRenderer({ props })
  ) : (
    <div
      className={`${LIB_NAME}-loading`}
      style={{ '--select-loading-color': props.color } as React.CSSProperties}
    />
  );

export default Loading;
