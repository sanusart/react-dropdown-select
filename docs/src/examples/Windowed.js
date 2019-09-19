import React from 'react';
import styled from '@emotion/styled';
import { List, AutoSizer } from 'react-virtualized';
import { Heading } from './components/Heading';
import Select from '../../../src';

const itemData = Array.from(Array(20000).keys()).map((value) => ({
  value: `value ${value}`,
  label: `Item # ${value}`
}));

const customDropdownRenderer = ({ methods, state, props }) => {
  const regexp = new RegExp(state.search, 'i');
  const items =  props.searchable
    ? itemData.filter((item) => regexp.test(item[props.searchBy] || item[props.labelField]))
    : itemData;

  return (
    <AutoSizer style={{ height: '200px' }}>
      {({width, height}) => (
        <StyledList
          height={height}
          rowCount={items.length}
          rowHeight={40}
          width={width - 2}
          rowRenderer={({ index, style, key }) => (
            <Item key={key}
                  style={style}
                  onClick={() => methods.addItem(items[index])}>
              {items[index].label}
            </Item>
          )}
        />
  )}
    </AutoSizer>
  );
};

const Windowed = ({ title }) => (
  <React.Fragment>
    <Heading
      title={title}
      source="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/Windowed.js"
    />

    <p>
      Using <a href="https://sanusart.github.io/react-dropdown-select/prop/dropdown-renderer">dropdownRenderer</a> and <a href="https://github.com/bvaughn/react-virtualized">
      bvaughn/react-virtualized
    </a>
    </p>

    <Select
      dropdownRenderer={ customDropdownRenderer }
      values={[{
        value: 'value 42',
        label: 'Item # 42'
      }]}
      multi
      onChange={(value) =>
        console.log(`%c > onChange ${title} `, 'background: #555; color: tomato', value)
      }
    />
  </React.Fragment>
);

Windowed.propTypes = {};

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const StyledList = styled(List)`
  overflow: auto;
  height: 200px;
  max-height: 200px;
`;

const Item = styled.div`
  display: flex;
  padding: 0 10px;
  align-items: center;
  cursor: pointer;
  width: 480px;
  height: 40px;
  
  &:hover {
    background: #f2f2f2;
  }
  
  ${({ disabled }) => disabled && 'text-decoration: line-through;'}
`;

export default Windowed;
