import React from 'react';
import styled from '@emotion/styled';

import { LIB_NAME } from '../constants';
import NoData from '../components/NoData';
import Item from '../components/Item';

import { valueExistInSelected, hexToRGBA, isomorphicWindow } from '../util';
import { SelectRenderer, SelectProps, SelectState, SelectMethods } from 'react-dropdown-select';

interface DropdownProps<T> {
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
}

const dropdownPosition = <T extends object>(props: SelectProps<T>, methods: SelectMethods<T>) => {
  const DropdownBoundingClientRect = methods.getSelectRef().getBoundingClientRect();
  const dropdownHeight =
    DropdownBoundingClientRect.bottom +
    parseInt(props.dropdownHeight || '300', 10) +
    (props.dropdownGap || 5);

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

const Dropdown = <T extends object>({ props, state, methods }: DropdownProps<T>) => (
  <DropDown
    tabIndex="-1"
    aria-expanded="true"
    role="list"
    dropdownPosition={dropdownPosition(props, methods)}
    selectBounds={state.selectBounds}
    portal={props.portal}
    dropdownGap={props.dropdownGap || 5}
    dropdownHeight={props.dropdownHeight || '300'}
    className={`${LIB_NAME}-dropdown ${LIB_NAME}-dropdown-position-${dropdownPosition(
      props,
      methods
    )}`}
  >
    {props.dropdownRenderer ? (
      props.dropdownRenderer({ props, state, methods } as SelectRenderer<T>)
    ) : (
      <React.Fragment>
        {props.create &&
          state.search &&
          !valueExistInSelected(state.search, [...state.values, ...props.options], props) && (
            <AddNew
              role="button"
              className={`${LIB_NAME}-dropdown-add-new`}
              color={props.color}
              onClick={() => methods.createNew(state.search)}
            >
              {props.createNewLabel?.replace('{search}', `"${state.search}"`) || 'add'}
            </AddNew>
          )}
        {state.searchResults.length === 0 ? (
          <NoData state={state} props={props} methods={methods} />
        ) : (
          state.searchResults.map((item, itemIndex) => (
            <Item
              key={(item && (item as any)[props.valueField || 'value'] || itemIndex)?.toString() || itemIndex}
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
            onClick={() => (methods.areAllSelected() ? methods.clearAll() : methods.selectAll())}
          >
            {methods.areAllSelected() ? props.clearAllLabel : props.selectAllLabel}
          </SelectAll>
        )}
      </React.Fragment>
    )}
  </DropDown>
);

interface DropDownProps {
  selectBounds: DOMRect;
  dropdownGap: number;
  dropdownHeight: string;
  dropdownPosition: 'auto' | 'top' | 'bottom';
  portal?: HTMLElement;
}

const DropDown = styled.div<DropDownProps>`
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
