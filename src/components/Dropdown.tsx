import React from 'react';
import styled from '@emotion/styled';

import { LIB_NAME } from '../constants';
import NoData from '../components/NoData';
import Item from '../components/Item';

import { valueExistInSelected, hexToRGBA, getWindowInnerHeight } from '../util';

import { SelectProps, SelectMethods, SelectPropsStateMethodsType } from '../../types';
import type { ReactNode } from 'react';

function dropdownPosition<T extends object | string = NonNullable<unknown>>(
  props: SelectProps<T>,
  methods: SelectMethods<T>,
): string {
  const DropdownBoundingClientRect = methods.getSelectRef().getBoundingClientRect();
  const dropdownHeight =
    DropdownBoundingClientRect.bottom +
    parseInt((props.dropdownHeight ?? '0') as string, 10) +
    Number(props.dropdownGap ?? 0);

  if (props.dropdownPosition !== 'auto') {
    return props.dropdownPosition as string;
  }

  if (dropdownHeight > getWindowInnerHeight() && dropdownHeight > DropdownBoundingClientRect.top) {
    return 'top';
  }

  return 'bottom';
}

function Dropdown<T extends object | string = NonNullable<unknown>>({
  props,
  state,
  methods,
}: SelectPropsStateMethodsType<T>): React.ReactNode {
  const position = dropdownPosition(props, methods);

  if (props.dropdownRenderer) {
    return props.dropdownRenderer({ props, state, methods });
  }

  const children: ReactNode[] = [];

  if (
    props.create &&
    state.search &&
    !valueExistInSelected(state.search, [...state.values, ...(props.options || [])], props)
  ) {
    children.push(
      React.createElement(
        AddNew,
        {
          role: 'button',
          className: `${LIB_NAME}-dropdown-add-new`,
          color: props.color,
          onClick: () => methods.createNew(state.search),
        },
        props.createNewLabel.replace('{search}', `"${state.search}"`),
      ),
    );
  }

  const searchResults: T[] = (state as unknown as { searchResults?: T[] }).searchResults || [];

  if (searchResults.length === 0) {
    children.push(
      React.createElement(NoData, {
        state,
        props,
        methods,
      }),
    );
  } else {
    children.push(
      ...searchResults.map((item: T, itemIndex: number) =>
        React.createElement(Item, {
          key: (item && (item as unknown as Record<string, unknown>)[props.valueField!]
            ? ((item as unknown as Record<string, unknown>)[props.valueField!] as unknown)
            : itemIndex
          ).toString(),
          item,
          itemIndex,
          state,
          props,
          methods,
        }),
      ),
    );
  }

  if (props.selectAll && props.options && props.multi) {
    children.push(
      React.createElement(
        SelectAll,
        {
          role: 'button',
          className: `${LIB_NAME}-dropdown-select-all`,
          color: props.color,
          onClick: () => (methods.areAllSelected() ? methods.clearAll() : methods.selectAll()),
        },
        methods.areAllSelected() ? props.clearAllLabel : props.selectAllLabel,
      ),
    );
  }

  return React.createElement(
    DropDown,
    {
      tabIndex: '-1',
      'aria-expanded': 'true',
      role: 'list',
      dropdownPosition: position,
      selectBounds: state.selectBounds,
      portal: props.portal,
      dropdownGap: props.dropdownGap,
      dropdownHeight: props.dropdownHeight,
      className: `${LIB_NAME}-dropdown ${LIB_NAME}-dropdown-position-${position}`,
    },
    ...children,
  );
}

const DropDown = styled.div`
  position: absolute;
  ${({ selectBounds, dropdownGap, dropdownPosition }) =>
    dropdownPosition === 'top'
      ? `bottom: ${selectBounds.height + 2 + dropdownGap}px`
      : `top: ${selectBounds.height + 2 + dropdownGap}px`} ;

  ${({ selectBounds, dropdownGap, dropdownPosition, portal }) =>
    portal
      ? `
      position: fixed;
      ${
        dropdownPosition === 'bottom'
          ? `top: ${selectBounds.bottom + dropdownGap}px;`
          : `bottom: ${getWindowInnerHeight() - selectBounds.top + dropdownGap}px;`
      }
      left: ${selectBounds.left - 1}px;`
      : 'left: -1px;'};
  border: 1px solid #ccc;
  width: ${({ selectBounds }) => selectBounds.width}px;
  padding: 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 10px 0 ${() => hexToRGBA('#000000', 0.2)};
  max-height: ${({ dropdownHeight }) => dropdownHeight};
  overflow: auto;
  z-index: 9;

  :focus {
    outline: none;
  }
}
`;

const AddNew = styled.div`
  color: ${({ color }) => color};
  padding: 5px 10px;

  :hover {
    background: ${({ color }) => color && hexToRGBA(color, 0.1)};
    outline: none;
    cursor: pointer;
  }
`;

const SelectAll = styled.div`
  color: ${({ color }) => color};
  padding: 5px 10px;
  position: sticky;
  bottom: 0;
  margin: 0;
  opacity: 1;
  background: #fff;
  box-shadow: 0 0 10px 0 ${() => hexToRGBA('#000000', 0.2)};

  :hover {
    outline: none;
    cursor: pointer;
  }
`;

export default Dropdown;
