import React from 'react';
import styled from '@emotion/styled';
import { hexToRGBA, getByPath } from '../util';
import { LIB_NAME } from '../constants';

import type { SelectProps, SelectState, SelectMethods } from '../../types';

interface ItemProps<T extends object | string = NonNullable<unknown>> {
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
  item: T;
  itemIndex?: number;
}

class Item<T extends object | string = NonNullable<unknown>> extends React.Component<ItemProps<T>> {
  itemRef: React.RefObject<HTMLSpanElement> = React.createRef();

  componentDidMount() {
    const { props, methods } = this.props as ItemProps<T>;

    if (
      this.itemRef.current &&
      !props.multi &&
      props.keepSelectedInList &&
      methods.isSelected(this.props.item)
    ) {
      this.itemRef.current.scrollIntoView({ block: 'nearest', inline: 'start' });
    }
  }

  componentDidUpdate() {
    if (this.props.state.cursor === this.props.itemIndex) {
      this.itemRef.current &&
        this.itemRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'start',
        });
    }
  }

  render(): React.ReactNode {
    const { props, state, methods, item, itemIndex } = this.props as ItemProps<T>;

    if (props.itemRenderer) {
      return props.itemRenderer({ item, itemIndex, props, state, methods });
    }

    if (!props.keepSelectedInList && methods.isSelected(item)) {
      return null;
    }

    // Safely extract common properties from item without using `any`.
    const label = getByPath(item, props.labelField) as unknown as string | undefined;
    const value = getByPath(item, props.valueField) as unknown as string | undefined;
    const disabled = Boolean((item as Record<string, unknown>)['disabled']);

    const className = `${LIB_NAME}-item ${
      methods.isSelected(item) ? `${LIB_NAME}-item-selected` : ''
    } ${state.cursor === itemIndex ? `${LIB_NAME}-item-active` : ''} ${
      disabled ? `${LIB_NAME}-item-disabled` : ''
    }`;

    const children: React.ReactNode[] = [label as unknown as React.ReactNode];
    if (disabled) children.push(React.createElement('ins', null, props.disabledLabel));

    return React.createElement(
      ItemComponent,
      {
        role: 'option',
        ref: this.itemRef,
        'aria-selected': methods.isSelected(item),
        'aria-disabled': disabled,
        'aria-label': label as string | undefined,
        disabled,
        key: String(value ?? label ?? itemIndex ?? ''),
        tabIndex: '-1',
        className,
        onClick: disabled ? undefined : () => methods.addItem(item),
        onKeyPress: disabled ? undefined : () => methods.addItem(item),
        color: props.color,
      },
      ...children,
    );
  }
}

const ItemComponent = styled.span`
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
