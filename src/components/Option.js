import React from 'react';
import cxs from 'cxs/component';
import { getByPath } from '../util';
import { LIB_NAME } from '../constants';

const Option = ({ item, props, state, methods }) =>
  item && props.optionRenderer ? (
    props.optionRenderer({ item, props, state, methods })
  ) : (
    <OptionComponent
      role="listitem"
      disabled={props.disabled}
      direction={props.direction}
      className={`${LIB_NAME}-option`}
      color={props.color}>
      <span className={`${LIB_NAME}-option-label`}>{getByPath(item, props.labelField)}</span>
      <span
        className={`${LIB_NAME}-option-remove`}
        onClick={(event) => methods.removeItem(event, item, props.closeOnSelect)}>
        &times;
      </span>
    </OptionComponent>
  );

const OptionComponent = cxs('span')((props) => ({
  padding: '0 5px',
  borderRadius: '2px',
  lineHeight: '21px',
  margin: '3px 0 3px 5px',
  color: '#fff',
  display: 'flex',
  background: props.color,
  flexDirection: props.direction === 'rtl' ? 'row-reverse' : 'row',

  ':hover, :hover > span': {
    opacity: '0.9'
  },

  [`> .${LIB_NAME}-option-remove`]: {
    cursor: 'pointer',
    width: '22px',
    height: '22px',
    display: 'inline-block',
    textAlign: 'center',
    margin: '0 -5px 0 0px',
    borderRadius: '0 3px 3px 0',
    ':hover': {
      color: 'tomato'
    }
  }
}));

export default Option;
