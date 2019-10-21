import React from 'react';
import styled from '@emotion/styled';
import Select from '../../../src';
import { Heading } from './components/Heading';

const ItemRenderer = ({ options, title }) => (
  <React.Fragment>
    <Heading
      title={title}
      source="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/ItemRenderer.js"
    />

    <Select
      multi
      options={options}
      values={[]}
      itemRenderer={({ item, methods }) => (
        <StyledItem>
          {item.disabled ? (
            <div aria-disabled>{item.label}</div>
          ) : (
            <div onClick={() => methods.addItem(item)}>
              <input onChange={() => methods.addItem(item)} type="checkbox" checked={methods.isSelected(item)} /> {item.label}
            </div>
          )}
        </StyledItem>
      )}
      onChange={(value) =>
        console.log(`%c > onChange ${title} `, 'background: #555; color: tomato', value)
      }
    />
  </React.Fragment>
);

ItemRenderer.propTypes = {};

const StyledItem = styled.div`
  padding: 10px;
  color: #555;
  border-radius: 3px;
  margin: 3px;
  cursor: pointer;
  > div {
    display: flex;
    align-items: center;
  }

  input {
    margin-right: 10px;
  }

  :hover {
    background: #f2f2f2;
  }
`;

export default ItemRenderer;
