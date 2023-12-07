import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';
import ClickOutside from './components/ClickOutside';

import Content from './components/Content';
import Dropdown from './components/Dropdown';
import Loading from './components/Loading';
import Clear from './components/Clear';
import Separator from './components/Separator';
import DropdownHandle from './components/DropdownHandle';

import {
  debounce,
  hexToRGBA,
  isEqual,
  getByPath,
  getProp,
  valueExistInSelected,
  isomorphicWindow
} from './util';
import { LIB_NAME } from './constants';
import SelectPropsModel from './models/SelectPropsModel';

export class Select extends Component {
  static propTypes = SelectPropsModel;

  constructor(props) {
    super(props);

    this.state = {
      dropdown: false,
      values: props.values,
      search: '',
      selectBounds: {},
      cursor: null,
      searchResults: props.options
    };

    this.methods = {
      activeCursorItem: this.activeCursorItem,
      addItem: this.addItem,
      areAllSelected: this.areAllSelected,
      clearAll: this.clearAll,
      createNew: this.createNew,
      dropDown: this.dropDown,
      getInputSize: this.getInputSize,
      getSelectBounds: this.getSelectBounds,
      getSelectRef: this.getSelectRef,
      handleKeyDown: this.handleKeyDown,
      isSelected: this.isSelected,
      removeItem: this.removeItem,
      safeString: this.safeString,
      searchResults: this.searchResults,
      selectAll: this.selectAll,
      setSearch: this.setSearch,
      sortBy: this.sortBy,
      toggleSelectAll: this.toggleSelectAll
    };

    this.select = React.createRef();
    this.dropdownRoot = typeof document !== 'undefined' && document.createElement('div');
  }

  componentDidMount() {
    this.props.portal && this.props.portal.appendChild(this.dropdownRoot);
    isomorphicWindow().addEventListener('resize', debounce(this.updateSelectBounds));
    isomorphicWindow().addEventListener('scroll', debounce(this.onScroll));

    this.dropDown('close');

    if (this.select) {
      this.updateSelectBounds();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      !this.props.compareValuesFunc(prevProps.values, this.props.values) &&
      this.props.compareValuesFunc(prevProps.values, prevState.values)
    ) {
      this.setState(
        {
          values: this.props.values
        },
        () => {
          this.props.onChange(this.state.values);
        }
      );
      this.updateSelectBounds();
    }

    if (prevProps.options !== this.props.options) {
      this.setState({ searchResults: this.searchResults() });
    }

    if (prevState.values !== this.state.values) {
      this.props.onChange(this.state.values);
      this.updateSelectBounds();
    }

    if (prevState.search !== this.state.search) {
      this.updateSelectBounds();
    }

    if (prevState.values !== this.state.values && this.props.closeOnSelect) {
      this.dropDown('close');
    }

    if (prevProps.multi !== this.props.multi) {
      this.updateSelectBounds();
    }

    if (prevState.dropdown && prevState.dropdown !== this.state.dropdown) {
      this.onDropdownClose();
    }

    if (!prevState.dropdown && prevState.dropdown !== this.state.dropdown) {
      this.props.onDropdownOpen();
    }
  }

  componentWillUnmount() {
    this.props.portal && this.props.portal.removeChild(this.dropdownRoot);
    isomorphicWindow().removeEventListener(
      'resize',
      debounce(this.updateSelectBounds, this.props.debounceDelay)
    );
    isomorphicWindow().removeEventListener(
      'scroll',
      debounce(this.onScroll, this.props.debounceDelay)
    );
  }

  onDropdownClose = () => {
    this.setState({ cursor: null });
    this.props.onDropdownClose();
  };

  onScroll = () => {
    if (this.props.closeOnScroll) {
      this.dropDown('close');
    }

    this.updateSelectBounds();
  };

  updateSelectBounds = () =>
    this.select.current &&
    this.setState({
      selectBounds: this.select.current.getBoundingClientRect()
    });

  getSelectBounds = () => this.state.selectBounds;

  dropDown = (action = 'toggle', event, force = false) => {
    const target = (event && event.target) || (event && event.srcElement);

    if (
      this.props.onDropdownCloseRequest !== undefined &&
      this.state.dropdown &&
      force === false &&
      action === 'close'
    ) {
      return this.props.onDropdownCloseRequest({
        props: this.props,
        methods: this.methods,
        state: this.state,
        close: () => this.dropDown('close', null, true)
      });
    }

    if (
      this.props.portal &&
      !this.props.closeOnScroll &&
      !this.props.closeOnSelect &&
      event &&
      target &&
      target.offsetParent &&
      target.offsetParent.classList.contains('react-dropdown-select-dropdown')
    ) {
      return;
    }

    if (this.props.keepOpen) {
      return this.setState({ dropdown: true });
    }

    if (action === 'close' && this.state.dropdown) {
      this.select.current.blur();

      return this.setState({
        dropdown: false,
        search: this.props.clearOnBlur ? '' : this.state.search,
        searchResults: this.props.options
      });
    }

    if (action === 'open' && !this.state.dropdown) {
      return this.setState({ dropdown: true });
    }

    if (action === 'toggle') {
      this.select.current.focus();
      return this.setState({ dropdown: !this.state.dropdown });
    }

    return false;
  };

  getSelectRef = () => this.select.current;

  addItem = (item) => {
    if (this.props.multi) {
      if (
        valueExistInSelected(getByPath(item, this.props.valueField), this.state.values, this.props)
      ) {
        return this.removeItem(null, item, false);
      }

      this.setState({
        values: [...this.state.values, item]
      });
    } else {
      this.setState({
        values: [item],
        dropdown: false
      });
    }

    this.props.clearOnSelect &&
      this.setState({ search: '' }, () => {
        this.setState({ searchResults: this.searchResults() });
      });

    return true;
  };

  removeItem = (event, item, close = false) => {
    if (event && close) {
      event.preventDefault();
      event.stopPropagation();
      this.dropDown('close');
    }

    this.setState({
      values: this.state.values.filter(
        (values) =>
          getByPath(values, this.props.valueField) !== getByPath(item, this.props.valueField)
      )
    });
  };

  setSearch = (event) => {
    this.setState({
      cursor: null
    });

    this.setState(
      {
        search: event.target.value
      },
      () => {
        this.setState({ searchResults: this.searchResults() });
      }
    );
  };

  getInputSize = () => {
    if (this.state.search) {
      return this.state.search.length;
    }

    if (this.state.values.length > 0) {
      return this.props.addPlaceholder.length;
    }

    return this.props.placeholder.length;
  };

  toggleSelectAll = () => {
    return this.setState({
      values: this.state.values.length === 0 ? this.selectAll() : this.clearAll()
    });
  };

  clearAll = () => {
    this.props.onClearAll();
    this.setState({
      values: []
    });
  };

  selectAll = (valuesList = []) => {
    this.props.onSelectAll();
    const values =
      valuesList.length > 0 ? valuesList : this.props.options.filter((option) => !option.disabled);

    this.setState({ values });
  };

  isSelected = (option) =>
    !!this.state.values.find(
      (value) =>
        getByPath(value, this.props.valueField) === getByPath(option, this.props.valueField)
    );

  areAllSelected = () =>
    this.state.values.length === this.props.options.filter((option) => !option.disabled).length;

  safeString = (string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  sortBy = () => {
    const { sortBy, options } = this.props;

    if (!sortBy) {
      return options;
    }

    options.sort((a, b) => {
      if (getProp(a, sortBy) < getProp(b, sortBy)) {
        return -1;
      } else if (getProp(a, sortBy) > getProp(b, sortBy)) {
        return 1;
      } else {
        return 0;
      }
    });

    return options;
  };

  searchFn = ({ state, methods }) => {
    const regexp = new RegExp(methods.safeString(state.search), 'i');

    return methods
      .sortBy()
      .filter((item) =>
        regexp.test(getByPath(item, this.props.searchBy) || getByPath(item, this.props.valueField))
      );
  };

  searchResults = () => {
    const args = { state: this.state, props: this.props, methods: this.methods };

    return this.props.searchFn(args) || this.searchFn(args);
  };

  activeCursorItem = (activeCursorItem) =>
    this.setState({
      activeCursorItem
    });

  handleKeyDown = (event) => {
    const args = {
      event,
      state: this.state,
      props: this.props,
      methods: this.methods,
      setState: this.setState.bind(this)
    };

    return this.props.handleKeyDownFn(args) || this.handleKeyDownFn(args);
  };

  handleKeyDownFn = ({ event, state, props, methods, setState }) => {
    const { cursor, searchResults } = state;
    const escape = event.key === 'Escape';
    const enter = event.key === 'Enter';
    const arrowUp = event.key === 'ArrowUp';
    const arrowDown = event.key === 'ArrowDown';
    const backspace = event.key === 'Backspace';
    const tab = event.key === 'Tab' && !event.shiftKey;
    const shiftTab = event.shiftKey && event.key === 'Tab';

    if (arrowDown && !state.dropdown) {
      event.preventDefault();
      this.dropDown('open');
      return setState({
        cursor: 0
      });
    }

    if ((arrowDown || (tab && state.dropdown)) && cursor === null) {
      return setState({
        cursor: 0
      });
    }

    if (arrowUp || arrowDown || (shiftTab && state.dropdown) || (tab && state.dropdown)) {
      event.preventDefault();
    }

    if (escape) {
      this.dropDown('close');
    }

    if (enter) {
      const currentItem = searchResults[cursor];
      if (currentItem && !currentItem.disabled) {
        if (props.create && valueExistInSelected(state.search, state.values, props)) {
          return null;
        }

        methods.addItem(currentItem);
      }
    }

    if ((arrowDown || (tab && state.dropdown)) && searchResults.length === cursor) {
      return setState({
        cursor: 0
      });
    }

    if (arrowDown || (tab && state.dropdown)) {
      setState((prevState) => ({
        cursor: prevState.cursor + 1
      }));
    }

    if ((arrowUp || (shiftTab && state.dropdown)) && cursor > 0) {
      setState((prevState) => ({
        cursor: prevState.cursor - 1
      }));
    }

    if ((arrowUp || (shiftTab && state.dropdown)) && cursor === 0) {
      setState({
        cursor: searchResults.length
      });
    }

    if (backspace && props.backspaceDelete && this.getInputSize() === 0) {
      this.setState({
        values: this.state.values.slice(0, -1)
      });
    }
  };

  renderDropdown = () =>
    this.props.portal ? (
      ReactDOM.createPortal(
        <Dropdown props={this.props} state={this.state} methods={this.methods} />,
        this.dropdownRoot
      )
    ) : (
      <Dropdown props={this.props} state={this.state} methods={this.methods} />
    );

  createNew = (item) => {
    const newValue = {
      [this.props.labelField]: item,
      [this.props.valueField]: item
    };

    this.addItem(newValue);
    this.props.onCreateNew(newValue);
    this.setState({ search: '' });
  };

  render() {
    return (
      <ClickOutside onClickOutside={(event) => this.dropDown('close', event)}>
        <ReactDropdownSelect
          onKeyDown={this.handleKeyDown}
          aria-label="Dropdown select"
          aria-expanded={this.state.dropdown}
          onClick={(event) => this.dropDown('open', event)}
          tabIndex={this.props.disabled ? '-1' : '0'}
          direction={this.props.direction}
          style={this.props.style}
          ref={this.select}
          disabled={this.props.disabled}
          className={`${LIB_NAME} ${this.props.className}`}
          color={this.props.color}
          {...this.props.additionalProps}>
          <Content props={this.props} state={this.state} methods={this.methods} />

          {(this.props.name || this.props.required) && (
            <input
              tabIndex={-1}
              style={{ opacity: 0, width: 0, position: 'absolute' }}
              name={this.props.name}
              required={this.props.required}
              pattern={this.props.pattern}
              defaultValue={
                this.state.values.map((value) => value[this.props.labelField]).toString() || []
              }
              disabled={this.props.disabled}
            />
          )}

          {this.props.loading && <Loading props={this.props} />}

          {this.props.clearable && (
            <Clear props={this.props} state={this.state} methods={this.methods} />
          )}

          {this.props.separator && (
            <Separator props={this.props} state={this.state} methods={this.methods} />
          )}

          {this.props.dropdownHandle && (
            <DropdownHandle
              onClick={() => this.select.current.focus()}
              props={this.props}
              state={this.state}
              methods={this.methods}
            />
          )}

          {this.state.dropdown && !this.props.disabled && this.renderDropdown()}
        </ReactDropdownSelect>
      </ClickOutside>
    );
  }
}

Select.defaultProps = {
  addPlaceholder: '',
  additionalProps: null,
  autoFocus: false,
  backspaceDelete: true,
  clearAllLabel: 'Clear all',
  clearOnBlur: true,
  clearOnSelect: true,
  clearable: false,
  closeOnScroll: false,
  closeOnSelect: false,
  closeOnClickInput: false,
  color: '#0074D9',
  compareValuesFunc: isEqual,
  create: false,
  createNewLabel: 'add {search}',
  debounceDelay: 0,
  direction: 'ltr',
  disabled: false,
  disabledLabel: 'disabled',
  dropdownGap: 5,
  dropdownHandle: true,
  dropdownHeight: '300px',
  dropdownPosition: 'bottom',
  handleKeyDownFn: () => undefined,
  keepOpen: false,
  keepSelectedInList: true,
  labelField: 'label',
  loading: false,
  multi: false,
  name: null,
  noDataLabel: 'No data',
  onChange: () => undefined,
  onClearAll: () => undefined,
  onCreateNew: () => undefined,
  onDropdownClose: () => undefined,
  onDropdownCloseRequest: undefined,
  onDropdownOpen: () => undefined,
  onSelectAll: () => undefined,
  options: [],
  pattern: undefined,
  placeholder: 'Select...',
  portal: null,
  required: false,
  searchBy: 'label',
  searchFn: () => undefined,
  searchable: true,
  selectAll: false,
  selectAllLabel: 'Select all',
  separator: false,
  sortBy: null,
  valueField: 'value',
  values: []
};

const ReactDropdownSelect = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 2px;
  padding: 2px 5px;
  flex-direction: row;
  direction: ${({ direction }) => direction};
  align-items: center;
  cursor: pointer;
  min-height: 36px;

  ${({ disabled }) =>
    disabled ? 'cursor: not-allowed;pointer-events: none;opacity: 0.3;' : 'pointer-events: all;'}
  :hover,
  :focus-within {
    border-color: ${({ color }) => color};
  }

  :focus,
  :focus-within {
    outline: 0;
    box-shadow: 0 0 0 3px ${({ color }) => hexToRGBA(color, 0.2)};
  }

  * {
    box-sizing: border-box;
  }
`;

export default Select;
