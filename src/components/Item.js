import React from 'react';
import styled from '@emotion/styled';
import { hexToRGBA } from '../util';

const Item = ({ props, state, methods, item, itemIndex }) => {
  if (props.itemRenderer) {
    return props.itemRenderer({ item, itemIndex, props, state, methods });
  }

  if (!props.keepSelectedInList && methods.isSelected(item)) {
    return null;
  }

  return (
    <ItemComponent
      role="option"
      aria-selected={methods.isSelected(item)}
      aria-disabled={item.disabled}
      disabled={item.disabled}
      aria-label={item[props.labelField]}
      key={`${item[props.valueField]}${item[props.labelField]}`}
      tabIndex="-1"
      className={`react-dropdown-select-item ${
        methods.isSelected(item) ? 'react-dropdown-select-item-selected' : ''
      } ${state.cursor === itemIndex ? 'react-dropdown-select-item-active' : ''} ${
        item.disabled ? 'react-dropdown-select-item-disabled' : ''
      }`}
      onClick={item.disabled ? undefined : () => methods.addItem(item)}
      onKeyPress={item.disabled ? undefined : () => methods.addItem(item)}
      color={props.color}>
      {item[props.labelField]} {item.disabled && <ins>{props.disabledLabel}</ins>}
    </ItemComponent>
  );
};

const ItemComponent = styled.span`
  padding: 5px 10px;
  cursor: pointer;
  border-bottom: 1px solid #fff;

  &.react-dropdown-select-item-active {
    border-bottom: 1px solid #fff;
    ${({ disabled, color }) => !disabled && color && `background: ${hexToRGBA(color, 0.1)};`}
  }

  :hover,
  :focus {
    background: ${({ color }) => color && hexToRGBA(color, 0.1)};
    outline: none;
  }

  &.react-dropdown-select-item-selected {
    ${({ disabled, color }) =>
      disabled
        ? `
    background: #f2f2f2;
    color: #ccc;
    `
        : `
    background: ${color};
    color: #fff;
    border-bottom: 1px solid #fff;
    `}
  }

  ${({ disabled }) =>
    disabled
      ? `
    background: #f2f2f2;
    color: #ccc;
    
    ins {
      text-decoration: none;
      border:1px solid #ccc;
      border-radius: 2px;
      padding: 0px 3px;
      font-size: x-small;
      text-transform: uppercase;
    }
    `
      : ''}
`;

export default Item;
