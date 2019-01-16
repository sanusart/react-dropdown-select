import React from 'react';
import styled from '@emotion/styled';
import Select from '../../../src';

const ItemRenderer = ({ options, title }) => (
  <React.Fragment>
    <h2>{title}</h2>
    <Select
      multi
      options={options}
      values={[]}
      itemRenderer={(item, itemIndex, props, state, methods) => (
        <StyledItem>
          {item.disabled ? <div aria-disabled>{item.label}</div> : (
            <div onClick={() => methods.addItem(item)}>
              <input type="checkbox" checked={methods.isSelected(item)} /> {item.label}
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
