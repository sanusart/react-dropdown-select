import React from 'react';
import styled from '@emotion/styled';

import { LIB_NAME } from '../constants';
import NoData from '../components/NoData';
import Item from '../components/Item';

import { valueExistInSelected, hexToRGBA, isomorphicWindow } from '../util';

import type { SelectRenderer } from '../../types';

interface StyledProps {
  selectBounds: DOMRect;
  dropdownGap: number;
  dropdownPosition: 'top' | 'bottom';
  portal?: HTMLElement;
  dropdownHeight: string;
  color?: string;
}

const dropdownPosition = <T,>(
  props: SelectRenderer<T>['props'],
  methods: SelectRenderer<T>['methods']
): 'top' | 'bottom' => {
  const DropdownBoundingClientRect = methods.getSelectRef().getBoundingClientRect();
  const dropdownHeight =
    DropdownBoundingClientRect.bottom +
    parseInt(props.dropdownHeight || '0', 10) +
    parseInt(props.dropdownGap?.toString() || '0', 10);

  if (props.dropdownPosition !== 'auto') {
    return props.dropdownPosition;
  }

  if (
    dropdownHeight > isomorphicWindow().innerHeight &&
    dropdownHeight > DropdownBoundingClientRect.top
  ) {
    return 'top';
  }

  return 'bottom';
};

function Dropdown<T>({ props, state, methods }: SelectRenderer<T>) {
  const position = dropdownPosition(props, methods);

  return (
    <DropDown
      tabIndex={-1}
      aria-expanded="true"
      role="list"
      dropdownPosition={position}
      selectBounds={state.selectBounds}
      portal={props.portal}
      dropdownGap={props.dropdownGap || 0}
      dropdownHeight={props.dropdownHeight || '300px'}
      className={`${LIB_NAME}-dropdown ${LIB_NAME}-dropdown-position-${position}`}>
      {props.dropdownRenderer ? (
        props.dropdownRenderer({ props, state, methods })
      ) : (
        <>
          {props.create &&
            state.search &&
            !valueExistInSelected(state.search, [...state.values, ...props.options], props) && (
              <AddNew
                role="button"
                className={`${LIB_NAME}-dropdown-add-new`}
                color={props.color}
                onClick={() => methods.createNew(state.search)}>
                {props.createNewLabel?.replace('{search}', `"${state.search}"`)}
              </AddNew>
            )}
          {state.searchResults.length === 0 ? (
            <NoData
              className={`${LIB_NAME}-no-data`}
              state={state}
              props={props}
              methods={methods}
            />
          ) : (
            state.searchResults.map((item, itemIndex) => (
              <Item
                key={item[props.valueField!]?.toString()}
                item={item}
                itemIndex={itemIndex}
                state={state}
                props={props}
                methods={methods}
              />
            ))
          )}
          {props.selectAll && props.options && props.multi && (
            <SelectAll
              role="button"
              className={`${LIB_NAME}-dropdown-select-all`}
              color={props.color}
              onClick={() =>
                methods.areAllSelected() ? methods.clearAll() : methods.selectAll()
              }>
              {methods.areAllSelected()
                ? props.clearAllLabel
                : props.selectAllLabel}
            </SelectAll>
          )}
        </>
      )}
    </DropDown>
  );
}

const DropDown = styled.div<StyledProps>`
  position: absolute;
  ${({ selectBounds, dropdownGap, dropdownPosition }) =>
  dropdownPosition === 'top'
    ? `bottom: ${selectBounds.height + 2 + dropdownGap}px`
    : `top: ${selectBounds.height + 2 + dropdownGap}px`};

  ${({ selectBounds, dropdownGap, dropdownPosition, portal }) =>
  portal
    ? `
      position: fixed;
      ${
      dropdownPosition === 'bottom'
        ? `top: ${selectBounds.bottom + dropdownGap}px;`
        : `bottom: ${isomorphicWindow().innerHeight - selectBounds.top + dropdownGap}px;`
    }
      left: ${selectBounds.left - 1}px;`
    : 'left: -1px;'};
  border: 1px solid #ccc;
  width: ${props => props.selectBounds.width}px;
  padding: 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 10px 0 ${() => hexToRGBA('#000000', 0.2)};
  max-height: ${props => props.dropdownHeight};
  overflow: auto;
  z-index: 9;

  :focus {
    outline: none;
  }
`;

const AddNew = styled.div<{ color?: string }>`
  color: ${({ color }) => color};
  padding: 5px 10px;

  :hover {
    background: ${({ color }) => color && hexToRGBA(color, 0.1)};
    outline: none;
    cursor: pointer;
  }
`;

const SelectAll = styled.div<{ color?: string }>`
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
