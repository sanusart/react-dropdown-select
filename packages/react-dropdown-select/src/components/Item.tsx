import React, { Component, RefObject } from 'react';
import { getByPath } from '../util';
import { LIB_NAME } from '../constants';
import { SelectProps, SelectState, SelectMethods } from '../select-types';

interface ItemProps<T> {
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
  item: T;
  itemIndex: number;
}

class Item<T extends Record<string, any>> extends Component<ItemProps<T>> {
  item: RefObject<HTMLSpanElement> = React.createRef();

  componentDidMount() {
    const { props, methods } = this.props;

    if (
      this.item.current &&
      !props.multi &&
      props.keepSelectedInList &&
      methods.isSelected(this.props.item)
    )
      this.item.current.scrollIntoView({ block: 'nearest', inline: 'start' });
  }

  componentDidUpdate() {
    if (this.props.state.cursor === this.props.itemIndex) {
      this.item.current &&
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

    const isDisabled = (item as any).disabled;
    const isSelected = methods.isSelected(item);
    const isActive = state.cursor === itemIndex;

    const itemClassName = [
      isActive && `${LIB_NAME}-item-active`,
      isSelected &&
        (isDisabled ? `${LIB_NAME}-item-selected-disabled` : `${LIB_NAME}-item-selected`),
      isDisabled && `${LIB_NAME}-item-disabled`,
      `${LIB_NAME}-item`,
    ]
      .filter(Boolean)
      .join(' ');

    return (
      <span
        role="option"
        ref={this.item}
        aria-selected={isSelected}
        aria-disabled={isDisabled}
        aria-label={getByPath(item, props.labelField)}
        key={`${getByPath(item, props.valueField)}${getByPath(item, props.labelField)}`}
        tabIndex={-1}
        className={itemClassName}
        data-disabled={isDisabled || undefined}
        onClick={isDisabled ? undefined : () => methods.addItem(item)}
        onKeyDown={
          isDisabled
            ? undefined
            : (e) => {
                if (e.key === 'Enter' || e.key === ' ') methods.addItem(item);
              }
        }>
        {getByPath(item, props.labelField)} {isDisabled && <ins>{props.disabledLabel}</ins>}
      </span>
    );
  }
}

export default Item;
