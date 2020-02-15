import React from 'react';
import cxs from 'cxs/component';

import { LIB_NAME } from '../constants';
import NoData from '../components/NoData';
import Item from '../components/Item';

import { valueExistInSelected, hexToRGBA, isomorphicWindow } from '../util';

const dropdownPosition = (props, methods) => {
  const DropdownBoundingClientRect = methods.getSelectRef().getBoundingClientRect();
  const dropdownHeight =
    DropdownBoundingClientRect.bottom +
    parseInt(props.dropdownHeight, 10) +
    parseInt(props.dropdownGap, 10);

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

const Dropdown = ({ props, state, methods }) => (
  <DropDown
    tabIndex="-1"
    aria-expanded="true"
    role="list"
    dropdownPosition={dropdownPosition(props, methods)}
    selectBounds={state.selectBounds}
    portal={props.portal}
    dropdownGap={props.dropdownGap}
    dropdownHeight={props.dropdownHeight}
    className={`${LIB_NAME}-dropdown ${LIB_NAME}-dropdown-position-${dropdownPosition(
      props,
      methods
    )}`}>
    {props.dropdownRenderer ? (
      props.dropdownRenderer({ props, state, methods })
    ) : (
      <React.Fragment>
        {props.create && state.search && !valueExistInSelected(state.search, state.values, props) && (
          <AddNew
            className={`${LIB_NAME}-dropdown-add-new`}
            color={props.color}
            onClick={() => methods.createNew(state.search)}>
            {props.createNewLabel.replace('{search}', `"${state.search}"`)}
          </AddNew>
        )}
        {methods.searchResults().length === 0 ? (
          <NoData className={`${LIB_NAME}-no-data`} state={state} props={props} methods={methods} />
        ) : (
          methods
            .searchResults()
            .map((item, itemIndex) => (
              <Item
                key={item[props.valueField]}
                item={item}
                itemIndex={itemIndex}
                state={state}
                props={props}
                methods={methods}
              />
            ))
        )}
      </React.Fragment>
    )}
  </DropDown>
);

const DropDown = cxs('div')((props) => ({
  position: 'absolute',
  border: '1px solid #ccc',
  padding: '0',
  display: 'flex',
  flexDirection: 'column',
  background: '#fff',
  borderRadius: '2px',
  overflow: 'auto',
  zIndex: '9',
  width: `${props.selectBounds.width || 0}px`,
  boxShadow: `0 0 10px 0 ${hexToRGBA('#000000', 0.2)}`,
  maxHeight: props.dropdownHeight,

  ...(props.dropdownPosition === 'top'
    ? { bottom: `${props.selectBounds.height + 2 + props.dropdownGap || 0}px` }
    : { top: `${props.selectBounds.height + 2 + props.dropdownGap || 0}px` }),

  ...(props.portal
    ? {
        position: 'fixed',
        top: `${props.selectBounds.bottom + props.dropdownGap || 0}px`,
        left: `${props.selectBounds.left - 1 || 0}px`
      }
    : {
        left: '-1px'
      }),

  ':focus': {
    outline: 'none'
  }
}));

const AddNew = cxs('div')((props) => ({
  padding: '5px 10px',
  ':hover': {
    background: hexToRGBA(props.color, 0.1),
    outline: 'none',
    cursor: 'pointer'
  }
}));

export default Dropdown;
