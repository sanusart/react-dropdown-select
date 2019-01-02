import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './demo-styles.css';

import Select from '../../src';

export class App extends React.Component {
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
      searchBy: 'label',
      clearable: true,
      separator: true,
      forceOpen: false,
      handle: true,
      options: []
    };
  }

  componentDidMount() {
    window
      .fetch('https://jsonplaceholder.typicode.com/users')
      .then((responce) => responce.json())
      .then((result) => {
        this.setOptions(
          result.map((user) => ({
            label: user.username,
            value: user.email
          }))
        );
      });
  }

  setValues = (selectValues) => this.setState({ selectValues });

  setOptions = (options) => this.setState({ options });

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
    <div key={item.value}>
      <div style={{ margin: '10px' }}>
        <input
          onChange={() => methods.addItem(item)}
          type="checkbox"
          checked={methods.isSelected(item)}
        />
        <span onClick={() => methods.addItem(item)}>&nbsp;&nbsp;&nbsp;{item.label}</span>
      </div>
    </div>
  );

  dropdownRenderer = (props, state, methods) => {
    const regexp = new RegExp(state.search, 'i');

    return (
      <div>
        <input
          type="text"
          size={methods.getInputSize()}
          value={state.search}
          onChange={methods.setSearch}
          placeholder="Type anything"
        />
        <button onClick={methods.selectAll}>Select all</button>
        <button onClick={methods.clearAll}>Clear all</button>
        {props.options
          .filter((item) => regexp.test(item[props.searchBy] || item.label))
          .map((option) => (
            <div key={option.value} onClick={() => methods.addItem(option)}>
              <input
                type="checkbox"
                onChange={() => methods.addItem(option)}
                checked={state.values.indexOf(option) !== -1}
              />
              {option.label}
            </div>
          ))}
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
      <React.Fragment>
        <div>
          <p>
            react-dropdown-select demo |{' '}
            <a href="https://github.com/sanusart/react-dropdown-select">GitHub</a>
          </p>
          <Select
            placeholder="Select user"
            addPlaceholder="+ click to add"
            disabled={this.state.disabled}
            loading={!this.state.options.length || this.state.loading}
            searchBy={this.state.searchBy}
            separator={this.state.separator}
            clearable={this.state.clearable}
            keepOpen={this.state.forceOpen}
            dropdownHandle={this.state.handle}
            multi={this.state.multi}
            values={[]}
            options={this.state.options}
            dropdownGap={5}
            onDropdownOpen={() => undefined}
            onDropdownClose={() => undefined}
            onClearAll={() => undefined}
            onSelectAll={() => undefined}
            onChange={(values) => this.setValues(values)}
            noDataLabel="No matches found"
            noDataRenderer={this.state.noDataRenderer ? () => this.noDataRenderer() : undefined}
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
          Search by field:{' '}
          <select
            selected={this.state.searchBy}
            onChange={(searchBy) =>
              this.setState({
                searchBy
              })
            }>
            <option value="label">label</option>
            <option value="customProperty">customProperty</option>
          </select>
        </p>

        <p>Current value(s):</p>
        <pre>{JSON.stringify(this.state.selectValues, false, 2)}</pre>

        <p>
          Options <small>(loaded from: https://jsonplaceholder.typicode.com/users)</small>:
        </p>
        <pre>{JSON.stringify(this.state.options, false, 2)}</pre>

        <p>
          I am text, I am text, I am text, I am text, I am text, I am text, I am text, I am text, I
          am text, I am text, I am text, I am text, I am text, I am text, I am text,{' '}
        </p>
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);
