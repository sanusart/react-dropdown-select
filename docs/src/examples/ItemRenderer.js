import React from 'react';
import styled from '@emotion/styled';
import Select from '../../../src';

const ItemRenderer = ({ options, title }) => (
  <React.Fragment>
    <Title>
    <h2>{title}</h2>
      <a href="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/ItemRenderer.js">Source</a>
    </Title>
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

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

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
