import React from 'react';
import styled from '@emotion/styled';
import { Heading } from './components/Heading';
import Select from '../../../src';

const Styled = ({ options, title }) => (
  <React.Fragment>
    <Heading
      title={title}
      source="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/Styled.js"
    />

    <StyledSelect
      multi
      options={options}
      values={[options[0]]}
      color="#333"
      dropdownGap={0}
      onChange={(value) =>
        console.log(`%c > onChange ${title} `, 'background: #555; color: tomato', value)
      }
    />
  </React.Fragment>
);

const StyledSelect = styled(Select)`
  background: #333;
  border: #333 !important;
  color: #fff;

  .react-dropdown-select-clear,
  .react-dropdown-select-dropdown-handle {
    color: #fff;
  }

  .react-dropdown-select-option {
    border: 1px solid #fff;
  }

  .react-dropdown-select-item {
    color: #333;
  }

  .react-dropdown-select-input {
    color: #fff;
  }

  .react-dropdown-select-dropdown {
    position: absolute;
    left: 0;
    border: none;
    width: 500px;
    padding: 0;
    display: flex;
    flex-direction: column;
    border-radius: 2px;
    max-height: 300px;
    overflow: auto;
    z-index: 9;
    background: #333;
    box-shadow: none;
    color: #fff !important;
  }

  .react-dropdown-select-item {
    color: #f2f2f2;
    border-bottom: 1px solid #333;
       
    :hover {
       color: #ffffff80;
    }
  }

  .react-dropdown-select-item.react-dropdown-select-item-selected,
  .react-dropdown-select-item.react-dropdown-select-item-active {
    //background: #111;
    border-bottom: 1px solid #333;
    color: #fff;
    font-weight: bold;
  }

  .react-dropdown-select-item.react-dropdown-select-item-disabled {
    background: #777;
    color: #ccc;
  }
`;

export default Styled;
