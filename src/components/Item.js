import React, { useEffect, useRef } from 'react';
import styled from '@emotion/styled';
import { hexToRGBA, getByPath } from '../util';
import * as PropTypes from 'prop-types';
import { LIB_NAME } from '../constants';

const Item = ({ props, state, methods, item, itemIndex }) => {
  const itemRef = useRef(null);

  useEffect(() => {
    if (itemRef.current && !props.multi && props.keepSelectedInList && methods.isSelected(item)) {
      itemRef.current.scrollIntoView({ block: 'nearest', inline: 'start' });
    }
  }, []); // ComponentDidMount equivalent

  useEffect(() => {
    if (state.cursor === itemIndex && itemRef.current) {
      try {
        itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
        // eslint-disable-next-line no-unused-vars
      } catch (error) {
        // Ignore scrollIntoView errors in test environment
      }
    }
  }, [state.cursor, itemIndex]); // ComponentDidUpdate equivalent

  const handleKeyDown = (event) => {
    if (item.disabled) return;

    if (event.key === 'Tab') {
      event.preventDefault();
      methods.handleKeyDown(event);
    } else if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      methods.addItem(item);
    }
  };

  if (props.itemRenderer) {
    return props.itemRenderer({ item, itemIndex, props, state, methods });
  }

  const isSelected = methods.isSelected(item);
  if (!props.keepSelectedInList && isSelected) {
    return <ItemComponent style={{ display: 'none' }} />;
  }

  return (
    <ItemComponent
      role="option"
      ref={itemRef}
      aria-selected={isSelected}
      aria-disabled={item.disabled}
      aria-label={getByPath(item, props.labelField)}
      disabled={item.disabled}
      key={`${getByPath(item, props.valueField)}${getByPath(item, props.labelField)}`}
      tabIndex="-1"
      className={`${LIB_NAME}-item ${isSelected ? `${LIB_NAME}-item-selected` : ''} ${
        state.cursor === itemIndex ? `${LIB_NAME}-item-active` : ''
      } ${item.disabled ? `${LIB_NAME}-item-disabled` : ''}`}
      onClick={item.disabled ? undefined : () => methods.addItem(item)}
      onKeyDown={handleKeyDown}
      color={props.color}>
      {getByPath(item, props.labelField)} {item.disabled && <ins>{props.disabledLabel}</ins>}
    </ItemComponent>
  );
};

Item.propTypes = {
  props: PropTypes.any,
  state: PropTypes.any,
  methods: PropTypes.any,
  item: PropTypes.any,
  itemIndex: PropTypes.any
};

const ItemComponent = styled.span`
  padding: 5px 10px;
  cursor: pointer;
  border-bottom: 1px solid #fff;
  display: block;

  &.${LIB_NAME}-item-active {
    border-bottom: 1px solid #fff;
    ${({ disabled, color }) => !disabled && color && `background: ${hexToRGBA(color, 0.1)};`}
  }

  :hover,
  :focus {
    background: ${({ color }) => color && hexToRGBA(color, 0.1)};
    outline: none;
  }

  &.${LIB_NAME}-item-selected {
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
