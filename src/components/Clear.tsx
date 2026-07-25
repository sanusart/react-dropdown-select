import React from 'react';
import { LIB_NAME } from '../constants';
import { ComponentRendererArgs } from '../select-types';

const Clear = <T extends Record<string, any>>({
  props,
  state,
  methods
}: ComponentRendererArgs<T>) =>
  props.clearRenderer ? (
    props.clearRenderer({ props, state, methods })
  ) : (
    <div
      className={`${LIB_NAME}-clear`}
      tabIndex={-1}
      onClick={() => methods.clearAll()}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') methods.clearAll(); }}>
      &times;
    </div>
  );

export default Clear;
