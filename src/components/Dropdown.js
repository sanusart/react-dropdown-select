import React from 'react';
import styled from '@emotion/styled';

import NoData from '../components/NoData';
import Item from '../components/Item';

import { valueExistInSelected, hexToRGBA } from '../util';

const Dropdown = ({ props, state, methods }) => (
  <DropDown
    tabIndex="-1"
    aria-expanded="true"
    role="list"
    openOnTop={props.openOnTop}
    selectBounds={state.selectBounds}
    portal={props.portal}
    dropdownGap={props.dropdownGap}
    dropdownHeight={props.dropdownHeight}
    className="react-dropdown-select-dropdown">
    {props.dropdownRenderer ? (
      props.dropdownRenderer(props, state, methods)
    ) : (
      <React.Fragment>
        {props.create && state.search && !valueExistInSelected(state.search, state.values) && (
          <AddNew color={props.color} onClick={() => methods.createNew(state.search)}>
            {props.createNewLabel.replace('{search}', `"${state.search}"`)}
          </AddNew>
        )}
        {methods.searchResults().length === 0 ? (
          <NoData
            className="react-dropdown-select-no-data"
            state={state}
            props={props}
            methods={methods}
          />
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

const DropDown = styled.div`
  position: absolute;
  ${({ selectBounds, dropdownGap, openOnTop }) =>
    openOnTop
      ? `bottom: ${selectBounds.height + 2 + dropdownGap}px`
      : `top: ${selectBounds.height + 2 + dropdownGap}px`};
  
  ${({ selectBounds, dropdownGap, portal }) =>
    portal
      ? `
      position: fixed;
      top: ${selectBounds.bottom + dropdownGap}px;
      left: ${selectBounds.left - 1}px;`
      : 'left: -1px;'};
  border: 1px solid #ccc;
  width: ${({ selectBounds }) => selectBounds.width}px;
  padding: 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 10px 0 ${() => hexToRGBA('#000000', 0.2)};
  max-height: ${({ dropdownHeight }) => dropdownHeight};
  overflow: auto;
  z-index: 9;
  
  :focus {
    outline: none;
  }
}
`;

const AddNew = styled.div`
  color: ${({ color }) => color};
  padding: 5px 10px;

  :hover {
    background: ${({ color }) => color && hexToRGBA(color, 0.1)};
    outline: none;
    cursor: pointer;
  }
`;

export default Dropdown;
