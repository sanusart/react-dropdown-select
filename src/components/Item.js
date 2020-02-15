import React, { Component } from 'react';
import cxs from 'cxs/component';
import { hexToRGBA, getByPath } from '../util';
import * as PropTypes from 'prop-types';
import { LIB_NAME } from '../constants';

class Item extends Component {
  item = React.createRef();

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

    return (
      <ItemComponent
        role="option"
        ref={this.item}
        aria-selected={methods.isSelected(item)}
        aria-disabled={item.disabled}
        disabled={item.disabled}
        aria-label={getByPath(item, props.labelField)}
        key={`${getByPath(item, props.valueField)}${getByPath(item, props.labelField)}`}
        tabIndex="-1"
        className={`${LIB_NAME}-item ${
          methods.isSelected(item) ? `${LIB_NAME}-item-selected` : ''
        } ${state.cursor === itemIndex ? `${LIB_NAME}-item-active` : ''} ${
          item.disabled ? `${LIB_NAME}-item-disabled` : ''
        }`}
        onClick={item.disabled ? undefined : () => methods.addItem(item)}
        onKeyPress={item.disabled ? undefined : () => methods.addItem(item)}
        color={props.color}>
        {getByPath(item, props.labelField)} {item.disabled && <ins>{props.disabledLabel}</ins>}
      </ItemComponent>
    );
  }
}

Item.propTypes = {
  props: PropTypes.any,
  state: PropTypes.any,
  methods: PropTypes.any,
  item: PropTypes.any,
  itemIndex: PropTypes.any
};

const ItemComponent = cxs('span')((props) => ({
  padding: '5px 10px',
  cursor: 'pointer',
  borderBottom: '1px solid #fff',

  [`&.${LIB_NAME}-item-active`]: {
    borderBottom: '1px solid #fff',
    ...(!props.disabled && props.color
      ? {
          background: hexToRGBA(props.color, 0.1)
        }
      : {})
  },
  ':hover, :focus': {
    background: hexToRGBA(props.color, 0.1),
    outline: 'none'
  },
  [`&.${LIB_NAME}-item-selected`]: {
    ...(props.disabled ? {
      background: "#f2f2f2", color: "#ccc"
    }: {
      background: props.color,
      color: "#fff",
      borderBottom: "1px solid #fff"
    })},
  ...(props.disabled ? {
    background: "#f2f2f2",
    color: "#ccc",
    '> ins': {
      textDecoration: "none",
      border: "1px solid #ccc",
      borderRadius: "2px",
      padding: "0px 3px",
      fontSize: "x-small",
      textTransform: "uppercase"
    }
  } : {})
}));

export default Item;
