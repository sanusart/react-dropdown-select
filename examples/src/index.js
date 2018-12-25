import React from 'react';
import ReactDOM from 'react-dom';

import 'normalize.css';
import './demo-styles.css';

import Select from '../../src';

const options = [
  { value: 'sasha', label: 'Sasha', customProperty: 'he is a dude' },
  { value: 'katy', label: 'Katy', customProperty: 'she is a lady' },
  { value: 'emily', label: 'Emily', customProperty: 'she is a lady' },
  { value: 'adam', label: 'Adam', customProperty: 'he is a dude' },
  {
    value: 'lily',
    label: 'Lily the dog',
    customProperty: 'she is a lady, but she is a dog'
  }
];

export class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      multi: true,
      disabled: false,
      loading: false,
      contentRenderer: false,
      dropdownRenderer: false,
      selectValues: [],
      searchBy: 'label',
      clearable: true,
      separator: true,
      forceOpen: false,
      handle: true
    };
  }

  setValues = (selectValues) => this.setState({ selectValues });

  contentRenderer = (innerProps, innerState) => {
    return (
      <div>
        {innerProps.values.length} of {innerState.options.length} Selected
      </div>
    );
  };

  dropdownRenderer = (props, state, methods) => {
    const regexp = new RegExp(state.search, 'i');

    return (
      <div>
        <input
          type="text"
          size={methods.getInputSize}
          value={state.search}
          onChange={methods.setSearch}
          placeholder="Type anything"
        />
        <button onClick={() => methods.toggleSelectAll()}>
          {state.values.length === 0 ? 'Select all' : 'Clear all'}
        </button>
        {state.options
          .filter((item) => regexp.test(item[props.searchBy] || item.label))
          .map((option) => (
            <div className="sa-select-item" onClick={() => methods.addItem(option)}>
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

  render() {
    return (
      <React.Fragment>
        <div>
          <p>
            react-dropdown-select demo |{' '}
            <a href="https://github.com/sanusart/react-dropdown-select">GitHub</a>
          </p>

          <Select
            placeholder="Sasha's family members"
            addPlaceholder="+ click to add"
            disabled={this.state.disabled}
            loading={this.state.loading}
            searchBy={this.state.searchBy}
            separator={this.state.separator}
            clearable={this.state.clearable}
            forceOpen={this.state.forceOpen}
            handle={this.state.handle}
            multi={this.state.multi}
            values={[options[0]]}
            options={options}
            onDropdownOpen={() => undefined}
            onDropdownClose={() => undefined}
            onChange={(values) => this.setValues(values)}
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
          I am text, I am text, I am text, I am text, I am text, I am text, I am text, I am text, I
          am text, I am text, I am text, I am text, I am text, I am text, I am text,{' '}
        </p>
      </React.Fragment>
    );
  }
}

const rootElement = document.getElementById('root');

ReactDOM.render(<App />, rootElement);
