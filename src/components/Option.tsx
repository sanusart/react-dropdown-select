import React from 'react';
import { getByPath } from '../util';
import { LIB_NAME } from '../constants';
import { ItemRendererArgs } from '../select-types';

const Option = <T extends Record<string, any>>({ item, props, state, methods }: ItemRendererArgs<T>) =>
  item && props.optionRenderer ? (
    props.optionRenderer({ item, props, state, methods })
  ) : (
    <span
      role="listitem"
      aria-disabled={props.disabled}
      className={`${LIB_NAME}-option`}
      style={{
        '--select-option-color': props.color,
        '--select-option-direction': props.direction === 'rtl' ? 'row-reverse' : 'row'
      } as React.CSSProperties}>
      <span className={`${LIB_NAME}-option-label`}>{getByPath(item, props.labelField)}</span>
      <span
        className={`${LIB_NAME}-option-remove`}
        onClick={(event) => methods.removeItem(event, item, props.closeOnSelect)}>
        &times;
      </span>
    </span>
  );

export default Option;
