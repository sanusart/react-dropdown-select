import React from 'react';

import { LIB_NAME } from '../constants';
import NoData from '../components/NoData';
import Item from '../components/Item';

import { valueExistInSelected, hexToRGBA, isomorphicWindow } from '../util';
import { SelectProps, SelectState, SelectMethods } from '../select-types';

interface DropdownProps<T> {
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
}

const dropdownPosition = <T extends Record<string, any>>(
  props: SelectProps<T>,
  methods: SelectMethods<T>
): string => {
  const DropdownBoundingClientRect = methods.getSelectRef()!.getBoundingClientRect();
  const dropdownHeight =
    DropdownBoundingClientRect.bottom +
    parseInt(props.dropdownHeight || '300px', 10) +
    parseInt(String(props.dropdownGap || 5), 10);

  if (props.dropdownPosition !== 'auto') {
    return props.dropdownPosition || 'bottom';
  }

  if (
    dropdownHeight > isomorphicWindow().innerHeight &&
    dropdownHeight > DropdownBoundingClientRect.top
  ) {
    return 'top';
  }

  return 'bottom';
};

const Dropdown = <T extends Record<string, any>>({ props, state, methods }: DropdownProps<T>) => {
  const pos = dropdownPosition(props, methods);
  const selectBounds = state.selectBounds as DOMRect;
  const dropdownGap = props.dropdownGap || 5;
  const dropdownHeight = props.dropdownHeight || '300px';
  const offset = `${selectBounds.height + 2 + dropdownGap}px`;

  const dropdownStyle: React.CSSProperties = {
    '--dropdown-height': dropdownHeight,
    '--dropdown-offset': offset,
    '--select-color': props.color,
    '--select-color-hover': props.color ? hexToRGBA(props.color, 0.1) : undefined,
    width: selectBounds.width
  } as React.CSSProperties;

  if (props.portal) {
    const isBottom = pos === 'bottom';
    Object.assign(dropdownStyle, {
      position: 'fixed',
      ...(isBottom
        ? { top: selectBounds.bottom + dropdownGap }
        : { bottom: isomorphicWindow().innerHeight - selectBounds.top + dropdownGap }),
      left: selectBounds.left - 1
    });
  } else {
    Object.assign(dropdownStyle, { left: -1 });
  }

  return (
    <div
      tabIndex={-1}
      aria-expanded="true"
      role="list"
      className={`${LIB_NAME}-dropdown ${pos === 'top' ? `${LIB_NAME}-dropdown-top` : `${LIB_NAME}-dropdown-bottom`} ${
        props.portal ? `${LIB_NAME}-dropdown-portal` : ''
      }`}
      style={dropdownStyle}>
      {props.dropdownRenderer ? (
        props.dropdownRenderer({ props, state, methods })
      ) : (
        <React.Fragment>
          {props.create &&
            state.search &&
            !valueExistInSelected(state.search, [...state.values, ...props.options!], props) && (
              <div
                role="button"
                className={`${LIB_NAME}-dropdown-add-new`}
                onClick={() => methods.createNew(state.search)}>
                {(props.createNewLabel || 'add {search}').replace('{search}', `"${state.search}"`)}
              </div>
            )}
          {state.searchResults.length === 0 ? (
            <NoData className={`${LIB_NAME}-no-data`} state={state} props={props} methods={methods} />
          ) : (
            state.searchResults.map((item: T, itemIndex: number) => (
              <Item
                key={(item as any)[props.valueField!].toString()}
                item={item}
                itemIndex={itemIndex}
                state={state}
                props={props}
                methods={methods}
              />
            ))
          )}

          {props.selectAll && props.options && props.multi && (
            <div
              role="button"
              className={`${LIB_NAME}-dropdown-select-all`}
              onClick={() => (methods.areAllSelected() ? methods.clearAll() : methods.selectAll())}>
              {methods.areAllSelected() ? props.clearAllLabel : props.selectAllLabel}
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

export default Dropdown;
