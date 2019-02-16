import React from 'react';
import styled from '@emotion/styled';

const Option = ({ item, props, state, methods }) =>
  item && props.optionRenderer ? (
    props.optionRenderer({ item, props, state, methods })
  ) : (
    <OptionComponent
      role="listitem"
      disabled={props.disabled}
      className="react-dropdown-select-option"
      color={props.color}>
      <span className="react-dropdown-select-option-label">{item[props.labelField]}</span>
      <span
        className="react-dropdown-select-option-remove"
        onClick={(event) => methods.removeItem(event, item, props.closeOnSelect)}>
        &times;
      </span>
    </OptionComponent>
  );

const OptionComponent = styled.span`
  padding: 0 5px;
  border-radius: 2px;
  line-height: 21px;
  margin: 3px 0 3px 5px;
  background: ${({ color }) => color};
  color: #fff;
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
    opacity: 0.9;
  }
`;

export default Option;
