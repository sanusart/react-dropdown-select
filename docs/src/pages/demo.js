import React from 'react';

import styled from '@emotion/styled';

import 'normalize.css';
import '../demo-styles.css';

import '../styles.css';

import Select from '../../../src/index';

import { options } from '../options';

export class Demo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      multi: true,
      disabled: false,
      loading: false,
      contentRenderer: false,
      dropdownRenderer: false,
      inputRenderer: false,
      itemRenderer: false,
      optionRenderer: false,
      noDataRenderer: false,
      selectValues: [],
      searchBy: 'username',
      clearable: false,
      separator: false,
      forceOpen: false,
      handle: true,
      labelField: 'username',
      valueField: 'email',
      color: '#0074D9',
      keepSelectedInList: true,
      closeOnSelect: false,
      openOnTop: false,
      dropdownHeight: '300px'
    };
  }

  setValues = (selectValues) => this.setState({ selectValues });

  contentRenderer = (innerProps, innerState) => {
    return (
      <div>
        {innerState.values.length} of {innerProps.options.length} Selected
      </div>
    );
  };

  noDataRenderer = () => {
    return (
      <p style={{ textAlign: 'center' }}>
        <strong>Ooops!</strong> No data found
      </p>
    );
  };

  itemRenderer = (item, itemIndex, props, state, methods) => (
    <div key={item[props.valueField]} onClick={() => methods.addItem(item)}>
      <div style={{ margin: '10px' }}>
        <input type="checkbox" checked={methods.isSelected(item)} />
        &nbsp;&nbsp;&nbsp;{item[props.labelField]}
      </div>
    </div>
  );

  dropdownRenderer = (props, state, methods) => {
    const regexp = new RegExp(state.search, 'i');

    return (
      <div>
        <SearchAndToggle color={this.state.color}>
          <Buttons>
            <div>Search and select:</div>
            {methods.areAllSelected() ? (
              <Button className="clear" onClick={methods.clearAll}>
                Clear all
              </Button>
            ) : (
              <Button onClick={methods.selectAll}>Select all</Button>
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
              if (!this.state.keepSelectedInList && methods.isSelected(option)) {
                return null;
              }

              return (
                <Item
                  disabled={option.disabled}
                  key={option[props.valueField]}
                  onClick={option.disabled ? null : () => methods.addItem(option)}>
                  <input
                    type="checkbox"
                    onChange={() => methods.addItem(option)}
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

  optionRenderer = (option, props, state, methods) => (
    <React.Fragment>
      <div onClick={(event) => methods.removeItem(event, option, true)}>{option.label}</div>
    </React.Fragment>
  );

  inputRenderer = (props, state, methods) => (
    <input
      tabIndex="1"
      className="react-dropdown-select-input"
      size={methods.getInputSize()}
      value={state.search}
      onClick={() => methods.dropDown('open')}
      onChange={methods.setSearch}
      placeholder="Type in"
    />
  );

  render() {
    return (
      <div className={this.props.className}>
        <div>
          <div style={{ maxWidth: '500px', margin: '0 auto' }}>
            <StyledSelect
              placeholder="Select peoples"
              addPlaceholder="+ click to add"
              color={this.state.color}
              disabled={this.state.disabled}
              loading={this.state.loading}
              searchBy={this.state.searchBy}
              separator={this.state.separator}
              clearable={this.state.clearable}
              keepOpen={this.state.forceOpen}
              dropdownHandle={this.state.handle}
              dropdownHeight={this.state.dropdownHeight}
              multi={this.state.multi}
              values={[options[0]]}
              labelField={this.state.labelField}
              valueField={this.state.valueField}
              options={options}
              dropdownGap={5}
              keepSelectedInList={this.state.keepSelectedInList}
              onDropdownOpen={() => undefined}
              onDropdownClose={() => undefined}
              onClearAll={() => undefined}
              onSelectAll={() => undefined}
              onChange={(values) => this.setValues(values)}
              noDataLabel="No matches found"
              closeOnSelect={this.state.closeOnSelect}
              noDataRenderer={this.state.noDataRenderer ? () => this.noDataRenderer() : undefined}
              openOnTop={this.state.openOnTop}
              itemRenderer={
                this.state.itemRenderer
                  ? (item, itemIndex, props, state, methods) =>
                      this.itemRenderer(item, itemIndex, props, state, methods)
                  : undefined
              }
              inputRenderer={
                this.state.inputRenderer
                  ? (props, state, methods) => this.inputRenderer(props, state, methods)
                  : undefined
              }
              optionRenderer={
                this.state.optionRenderer
                  ? (option, props, state, methods) =>
                      this.optionRenderer(option, props, state, methods)
                  : undefined
              }
              contentRenderer={
                this.state.contentRenderer
                  ? (innerProps, innerState) => this.contentRenderer(innerProps, innerState)
                  : undefined
              }
              dropdownRenderer={
                this.state.dropdownRenderer
                  ? (innerProps, innerState, innerMethods) =>
                      this.dropdownRenderer(innerProps, innerState, innerMethods)
                  : undefined
              }
            />
          </div>
        </div>
        <p>&nbsp;</p>
        <p>
          <input
            type="checkbox"
            checked={this.state.multi}
            onChange={() =>
              this.setState({
                multi: !this.state.multi
              })
            }
          />{' '}
          Multi
          <br />
          <input
            type="checkbox"
            checked={this.state.disabled}
            onChange={() =>
              this.setState({
                disabled: !this.state.disabled
              })
            }
          />{' '}
          Disabled
          <br />
          <input
            type="checkbox"
            checked={this.state.openOnTop}
            onChange={() =>
              this.setState({
                openOnTop: !this.state.openOnTop
              })
            }
          />{' '}
          Open on top of select
          <br />
          <input
            type="checkbox"
            checked={this.state.loading}
            onChange={() =>
              this.setState({
                loading: !this.state.loading
              })
            }
          />{' '}
          Loading
          <br />
          <input
            type="checkbox"
            checked={this.state.clearable}
            onChange={() =>
              this.setState({
                clearable: !this.state.clearable
              })
            }
          />{' '}
          Clearable
          <br />
          <input
            type="checkbox"
            checked={this.state.separator}
            onChange={() =>
              this.setState({
                separator: !this.state.separator
              })
            }
          />{' '}
          Separator
          <br />
          <input
            type="checkbox"
            checked={this.state.handle}
            onChange={() =>
              this.setState({
                handle: !this.state.handle
              })
            }
          />{' '}
          Dropdown handle
          <br />
          <input
            type="checkbox"
            checked={this.state.forceOpen}
            onChange={() =>
              this.setState({
                forceOpen: !this.state.forceOpen
              })
            }
          />{' '}
          Stay open
          <br />
          Dropdown Height:{' '}
          <input
            type="text"
            checked={this.state.dropdownHeight}
            value={this.state.dropdownHeight}
            onChange={(event) =>
              this.setState({
                dropdownHeight: event.target.value
              })
            }
          />
          <br />
          <input
            type="checkbox"
            checked={this.state.contentRenderer}
            onChange={() =>
              this.setState({
                contentRenderer: !this.state.contentRenderer
              })
            }
          />{' '}
          Custom content renderer
          <br />
          <input
            type="checkbox"
            checked={this.state.dropdownRenderer}
            onChange={() =>
              this.setState({
                dropdownRenderer: !this.state.dropdownRenderer
              })
            }
          />{' '}
          Custom dropdown renderer
          <br />
          <input
            type="checkbox"
            checked={this.state.itemRenderer}
            onChange={() =>
              this.setState({
                itemRenderer: !this.state.itemRenderer
              })
            }
          />{' '}
          Custom dropdown item renderer
          <br />
          <input
            type="checkbox"
            checked={this.state.keepSelectedInList}
            onChange={() =>
              this.setState({
                keepSelectedInList: !this.state.keepSelectedInList
              })
            }
          />{' '}
          Keep selected item in a list
          <br />
          <input
            type="checkbox"
            checked={this.state.closeOnSelect}
            onChange={() =>
              this.setState({
                closeOnSelect: !this.state.closeOnSelect
              })
            }
          />{' '}
          Close dropdown on select/deselect
          <br />
          <input
            type="color"
            defaultValue={this.state.color}
            onChange={(event) =>
              this.setState({
                color: event.target.value
              })
            }
          />{' '}
          Custom color
          <br />
          Search by field:{' '}
          <select
            defaultValue={this.state.searchBy}
            onChange={(event) => this.setState({ searchBy: event.target.value })}>
            {Object.keys(options[0]).map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <br />
          Label field:{' '}
          <select
            defaultValue={this.state.labelField}
            onChange={(event) =>
              this.setState({
                labelField: event.target.value,
                searchBy: event.target.value
              })
            }>
            {Object.keys(options[0]).map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
          <br />
          Value field:{' '}
          <select
            defaultValue={this.state.valueField}
            onChange={(event) => this.setState({ valueField: event.target.value })}>
            {Object.keys(options[0]).map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </p>

        <details>
          <summary>Options:</summary>
          <pre>{JSON.stringify(options, false, 2)}</pre>
        </details>

        <details>
          <summary>Selected values:</summary>
          <pre>{JSON.stringify(this.state.selectValues, false, 2)}</pre>
        </details>
      </div>
    );
  }
}

const StyledSelect = styled(Select)`
  ${({ dropdownRenderer }) =>
    dropdownRenderer &&
    `
		.react-dropdown-select-dropdown {
			overflow: initial;
		}
	`}
`;

const SearchAndToggle = styled.div`
  display: flex;
  flex-direction: column;

  input {
    margin: 10px 10px 0;
    line-height: 30px;
    padding: 0 20px;
    border: 1px solid #ccc;
    border-radius: 3px;
    :focus {
      outline: none;
      border: 1px solid ${({ color }) => color};
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
  cursor: pointer;
  border-bottom: 1px dotted transparent;

  :hover {
    border-bottom: 1px dotted #ccc;
  }

  ${({ disabled }) =>
    disabled
      ? `
  	opacity: 0.5;
  	pointer-events: none;
  	cursor: not-allowed;
  `
      : ''}
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

export default Demo;
