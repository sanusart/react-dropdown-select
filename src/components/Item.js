import React from 'react';
import styled from '@emotion/styled';
import { hexToRGBA } from '../index';

const Item = ({ parentProps, parentState, parentMethods, item, itemIndex }) => {
  if (parentProps.itemRenderer) {
    return parentProps.itemRenderer(item, itemIndex, parentProps, parentState, parentMethods);
  }

  if (!parentProps.keepSelectedInList && parentMethods.isSelected(item)) {
    return null;
  }

  return (
    <ItemComponent
      role="option"
      aria-selected={parentMethods.isSelected(item)}
      aria-disabled={item.disabled}
      disabled={item.disabled}
      aria-label={item[parentProps.labelField]}
      key={`${item[parentProps.valueField]}${item[parentProps.labelField]}`}
      tabIndex="-1"
      className={`react-dropdown-select-item ${
        parentMethods.isSelected(item) ? 'react-dropdown-select-item-selected' : ''
      } ${parentState.cursor === itemIndex ? 'react-dropdown-select-item-active' : ''} ${item.disabled ? 'react-dropdown-select-item-disabled' : ''}`}
      onClick={item.disabled ? undefined : () => parentMethods.addItem(item)}
      onKeyPress={item.disabled ? undefined : () => parentMethods.addItem(item)}
      color={parentProps.color}>
      {item[parentProps.labelField]} {item.disabled && <ins>disabled</ins>}
    </ItemComponent>
  );
};

Item.propTypes = {};

const ItemComponent = styled.span`
  padding: 5px 10px;
  cursor: pointer;
  border-bottom: 1px solid #fff;

  &.react-dropdown-select-item-active {
    border-bottom: 1px solid #fff;
    font-weight: bolder;
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
