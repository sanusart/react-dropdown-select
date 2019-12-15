import React from 'react';
import Select from '../../../src';
import styled from '@emotion/styled';
import { Heading } from './components/Heading';

export class CustomContentAndDropdown extends React.Component {
  options = () =>
    options.map((user) => ({
      label: user.username,
      value: user.email
    }));

  customContentRenderer = ({ props, state }) => (
    <div style={{ cursor: 'pointer' }}>
      {state.values.length} of {props.options.length} selected
    </div>
  );

  customDropdownRenderer = ({ props, state, methods }) => {
    const regexp = new RegExp(state.search, 'i');

    return (
      <div>
        <SearchAndToggle color={props.color}>
          <Buttons>
            <div>Search and select:</div>
            {methods.areAllSelected() ? (
              <Button className="clear" onClick={methods.clearAll}>
                Clear all
              </Button>
            ) : (
              <React.Fragment>
                <Button onClick={() => methods.selectAll(
                  [
                    props.options[0],
                    props.options[1],
                    props.options[3]
                  ]
                )}>Select 1st, 2nd and 4th</Button>
                <Button onClick={methods.selectAll}>Select all</Button>
              </React.Fragment>
            )}
          </Buttons>
          <input
            type="text"
            value={state.search}
            onChange={methods.setSearch}
            placeholder="Type anything"
          />
        </SearchAndToggle>
        <Items>
          {props.options
            .filter((item) => regexp.test(item[props.searchBy] || item[props.labelField]))
            .map((option) => {
              if (!props.keepSelectedInList && methods.isSelected(option)) {
                return null;
              }

              return (
                <Item
                  disabled={option.disabled}
                  key={option[props.valueField]}
                  onClick={option.disabled ? null : () => methods.addItem(option)}>
                  <input
                    type="checkbox"
                    onChange={() => (option.disabled ? undefined : methods.addItem(option))}
                    checked={state.values.indexOf(option) !== -1}
                  />
                  <ItemLabel>{option[props.labelField]}</ItemLabel>
                </Item>
              );
            })}
        </Items>
      </div>
    );
  };

  render() {
    return (
      <div>
        <Heading
          title={this.props.title}
          source="https://github.com/sanusart/react-dropdown-select/tree/master/docs/src/examples/CustomContentAndDropdown.js"
        />

        <StyledSelect
          placeholder="Select"
          multi
          contentRenderer={this.customContentRenderer}
          dropdownRenderer={this.customDropdownRenderer}
          onChange={(value) =>
            console.log(
              `%c > onChange ${this.props.title} `,
              'background: #555; color: tomato',
              value
            )
          }
          options={this.props.options}
          values={[]}
        />
      </div>
    );
  }
}

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

const StyledSelect = styled(Select)`
  .react-dropdown-select-dropdown {
    overflow: initial;
  }
`;

const SearchAndToggle = styled.div`
  display: flex;
  flex-direction: column;

  input {
    margin: 10px 10px 0;
    line-height: 30px;
    padding: 0px 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    :focus {
      outline: none;
      border: 1px solid deepskyblue;
    }
  }
`;

const Items = styled.div`
  overflow: auto;
  min-height: 10px;
  max-height: 200px;
`;

const Item = styled.div`
  display: flex;
  margin: 10px;
  align-items: baseline;
  ${({ disabled }) => disabled && 'text-decoration: line-through;'}
`;

const ItemLabel = styled.div`
  margin: 5px 10px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: space-between;

  & div {
    margin: 10px 0 0 10px;
    font-weight: 600;
  }
`;

const Button = styled.button`
  background: none;
  border: 1px solid #555;
  color: #555;
  border-radius: 3px;
  margin: 10px 10px 0;
  padding: 3px 5px;
  font-size: 10px;
  text-transform: uppercase;
  cursor: pointer;
  outline: none;

  &.clear {
    color: tomato;
    border: 1px solid tomato;
  }

  :hover {
    border: 1px solid deepskyblue;
    color: deepskyblue;
  }
`;

CustomContentAndDropdown.propTypes = {};

export default CustomContentAndDropdown;
