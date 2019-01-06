import React from 'react';
import styled from '@emotion/styled';

import NoData from './NoData';
import Item from './Item';

const Dropdown = ({ parentProps, parentState, parentMethods }) => (
  <DropDown
    tabIndex="-1"
    aria-expanded="true"
    role="list"
    selectBounds={parentState.selectBounds}
    dropdownGap={parentProps.dropdownGap}
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
  top: ${({ selectBounds, dropdownGap }) => selectBounds.height + 2 + dropdownGap}px;
  left: 0;
  border: 1px solid #ccc;
  width: ${({ selectBounds }) => selectBounds.width}px;
  padding: 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 10px 0 #0000003b;
  max-height: 300px;
  overflow: auto;
  
  :focus {
    outline: none;
  }
}
`;

export default Dropdown;
