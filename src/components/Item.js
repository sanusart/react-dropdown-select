import React from 'react';
import styled from '@emotion/styled';

const Item = ({ parentProps, parentState, parentMethods, item, itemIndex }) =>
  parentProps.itemRenderer ? (
    parentProps.itemRenderer(item, itemIndex, parentProps, parentState, parentMethods)
  ) : (
    <ItemComponent
      role="option"
      aria-selected={parentMethods.isSelected(item)}
      aria-label={item.label}
      key={`${item.value}${item.label}`}
      tabIndex="-1"
      className={`react-dropdown-select-item ${
        parentMethods.isSelected(item) ? 'react-dropdown-select-item-selected' : ''
      }`}
      onClick={() => parentMethods.addItem(item)}
      onKeyPress={() => parentMethods.addItem(item)}>
      {item.label}
    </ItemComponent>
  );

Item.propTypes = {};

const ItemComponent = styled.span`
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #fff;

  :hover,
  :focus {
    background: #f2f2f2;
    outline: none;
  }

  &.react-dropdown-select-item-selected {
    background: deepskyblue;
    color: #fff;
    border-bottom: 1px solid #fff;
  }

  input {
    &[type='checkbox'] {
      vertical-align: baseline;
      margin: 0 10px 0 0;
    }
  }
`;

export default Item;
