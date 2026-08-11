import React from 'react';
import { LIB_NAME } from '../constants';
import { ComponentRendererArgs } from '../select-types';

interface DropdownHandleProps<T> extends ComponentRendererArgs<T> {
  onClick?: () => void;
}

const DropdownHandle = <T extends Record<string, any>>({
  props,
  state,
  methods,
  onClick,
}: DropdownHandleProps<T>) => (
  <div
    tabIndex={-1}
    onClick={(event) => {
      if (onClick) onClick();
      methods.dropDown(state.dropdown ? 'close' : 'open', event);
    }}
    onKeyDown={(event) => methods.dropDown('toggle', event)}
    className={`${LIB_NAME}-dropdown-handle ${
      state.dropdown ? `${LIB_NAME}-dropdown-handle-open` : `${LIB_NAME}-dropdown-handle-closed`
    } ${
      props.dropdownHandleRenderer
        ? ''
        : state.dropdown
          ? `${LIB_NAME}-dropdown-handle-rotate`
          : `${LIB_NAME}-dropdown-handle-no-rotate-open`
    }`}
    style={{ '--select-handle-color': props.color } as React.CSSProperties}>
    {props.dropdownHandleRenderer ? (
      props.dropdownHandleRenderer({ props, state, methods })
    ) : (
      <svg fill="currentColor" viewBox="0 0 40 40">
        <path d="M31 26.4q0 .3-.2.5l-1.1 1.2q-.3.2-.6.2t-.5-.2l-8.7-8.8-8.8 8.8q-.2.2-.5.2t-.5-.2l-1.2-1.2q-.2-.2-.2-.5t.2-.5l10.4-10.4q.3-.2.6-.2t.5.2l10.4 10.4q.2.2.2.5z" />
      </svg>
    )}
  </div>
);

export default DropdownHandle;
