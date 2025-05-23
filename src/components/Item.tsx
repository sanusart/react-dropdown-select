import React, { Component, createRef } from 'react';
import styled from '@emotion/styled';
import { hexToRGBA, getByPath } from '../util';
import { LIB_NAME } from '../constants';

interface ItemProps<T = any> {
  props: {
    multi: boolean;
    keepSelectedInList: boolean;
    itemRenderer?: (args: {
      item: T;
      itemIndex: number;
      props: any;
      state: any;
      methods: any;
    }) => React.ReactNode;
    labelField: string;
    valueField: string;
    disabledLabel?: string;
    color?: string;
  };
  state: {
    cursor: number;
  };
  methods: {
    isSelected: (item: T) => boolean;
    addItem: (item: T) => void;
  };
  item: T & { disabled?: boolean };
  itemIndex: number;
}

class Item<T = any> extends Component<ItemProps<T>> {
  item: React.RefObject<HTMLSpanElement | null> = createRef();

  componentDidMount() {
    const { props, methods, item } = this.props;

    if (this.item.current && !props.multi && props.keepSelectedInList && methods.isSelected(item)) {
      this.item.current.scrollIntoView({ block: 'nearest', inline: 'start' });
    }
  }

  componentDidUpdate() {
    const { state, itemIndex } = this.props;
    if (this.item.current && state.cursor === itemIndex) {
      this.item.current.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    }
  }

  render() {
    const { props, state, methods, item, itemIndex } = this.props;

    if (props.itemRenderer) {
      return props.itemRenderer({ item, itemIndex, props, state, methods });
    }

    if (!props.keepSelectedInList && methods.isSelected(item)) {
      return null;
    }

    const isSelected = methods.isSelected(item);

    return (
      <ItemComponent
        role="option"
        ref={this.item}
        aria-selected={isSelected}
        aria-disabled={item.disabled}
        aria-label={getByPath(item, props.labelField)}
        disabled={item.disabled}
        tabIndex={-1}
        className={`${LIB_NAME}-item ${isSelected ? `${LIB_NAME}-item-selected` : ''} ${
          state.cursor === itemIndex ? `${LIB_NAME}-item-active` : ''
        } ${item.disabled ? `${LIB_NAME}-item-disabled` : ''}`}
        onClick={item.disabled ? undefined : () => methods.addItem(item)}
        onKeyPress={item.disabled ? undefined : () => methods.addItem(item)}
        color={props.color}>
        {getByPath(item, props.labelField)} {item.disabled && <ins>{props.disabledLabel}</ins>}
      </ItemComponent>
    );
  }
}

const ItemComponent = styled.span<{ color?: string; disabled?: boolean }>`
  padding: 5px 10px;
  cursor: pointer;
  border-bottom: 1px solid #fff;

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
