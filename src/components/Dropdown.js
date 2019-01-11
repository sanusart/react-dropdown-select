import React from 'react';
import styled from '@emotion/styled';

import NoData from './NoData';
import Item from './Item';

import { hexToRGBA } from '../index';

const Dropdown = ({ parentProps, parentState, parentMethods }) => (
  <DropDown
    tabIndex="-1"
    aria-expanded="true"
    role="list"
    openOnTop={parentProps.openOnTop}
    selectBounds={parentState.selectBounds}
    portal={parentProps.portal}
    dropdownGap={parentProps.dropdownGap}
    dropdownHeight={parentProps.dropdownHeight}
    className="react-dropdown-select-dropdown">
    {parentProps.dropdownRenderer ? (
      parentProps.dropdownRenderer(parentProps, parentState, parentMethods)
    ) : (
      <React.Fragment>
        {parentMethods.searchResults().length === 0 ? (
          <NoData
            className="react-dropdown-select-no-data"
            parentState={parentState}
            parentProps={parentProps}
            parentMethods={parentMethods}
          />
        ) : (
          parentMethods
            .searchResults()
            .map((item, itemIndex) => (
              <Item
                key={item[parentProps.valueField]}
                item={item}
                itemIndex={itemIndex}
                parentState={parentState}
                parentProps={parentProps}
                parentMethods={parentMethods}
              />
            ))
        )}
      </React.Fragment>
    )}
  </DropDown>
);

Dropdown.propTypes = {};

const DropDown = styled.div`
  position: absolute;
  ${({ selectBounds, dropdownGap, openOnTop}) => openOnTop 
    ? `bottom: ${selectBounds.height + 2 + dropdownGap}px` 
    : `top: ${selectBounds.height + 2 + dropdownGap}px`};
  
  ${({ selectBounds, dropdownGap, portal}) => portal 
    ? `
      position: fixed;
      top: ${selectBounds.bottom + dropdownGap}px;
      left: ${selectBounds.left - 1}px;` 
    : `left: -1px;`};
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
  
  :focus {
    outline: none;
  }
}
`;

export default Dropdown;
