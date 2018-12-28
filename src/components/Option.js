import React from 'react';
import styled from '@emotion/styled';

const Option = ({ parentProps, parentState, parentMethods, parentItem }) =>
  parentItem && parentProps.optionRenderer ? (
    parentProps.optionRenderer(parentItem, parentProps, parentState, parentMethods)
  ) : (
    <OptionComponent disabled={parentProps.disabled} className="react-dropdown-select-option">
      <span className="react-dropdown-select-option-label">{parentItem.label}</span>
      <span
        className="react-dropdown-select-option-remove"
        onClick={(event) => parentMethods.removeItem(event, parentItem, true)}>
        &times;
      </span>
    </OptionComponent>
  );

Option.propTypes = {};

const OptionComponent = styled.span`
  padding: 0 5px;
  border-radius: 2px;
  line-height: 21px;
  margin: 3px 0 3px 5px;
  background: deepskyblue;
  color: #fff;
  white-space: nowrap;
  display: inline-block;

  .react-dropdown-select-option-remove {
    cursor: pointer;
    width: 22px;
    height: 22px;
    display: inline-block;
    text-align: center;
    margin: 0 -5px 0 0px;
    border-radius: 0 3px 3px 0;

    :hover {
      color: tomato;
    }
  }

  :hover,
  :hover > span {
    background: #00a7e6;
  }
`;

export default React.memo(Option);
