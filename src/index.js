import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ClickOutHandler from 'react-onclickout';

import Content from './components/Content';
import Dropdown from './components/Dropdown';
import Loading from './components/Loading';
import Clear from './components/Clear';
import Separator from './components/Separator';
import DropdownHandle from './components/DropdownHandle';

import { debounce, hexToRGBA } from './util';

export class Select extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onDropdownClose: PropTypes.func,
    onDropdownOpen: PropTypes.func,
    onClearAll: PropTypes.func,
    onSelectAll: PropTypes.func,
    values: PropTypes.array,
    options: PropTypes.array.isRequired,
    keepOpen: PropTypes.bool,
    dropdownGap: PropTypes.number,
    multi: PropTypes.bool,
    placeholder: PropTypes.string,
    addPlaceholder: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    loading: PropTypes.bool,
    clearable: PropTypes.bool,
    searchable: PropTypes.bool,
    separator: PropTypes.bool,
    dropdownHandle: PropTypes.bool,
    searchBy: PropTypes.string,
    closeOnScroll: PropTypes.bool,
    openOnTop: PropTypes.bool,
    style: PropTypes.object,
    contentRenderer: PropTypes.func,
    dropdownRenderer: PropTypes.func,
    itemRenderer: PropTypes.func,
    noDataRenderer: PropTypes.func,
    optionRenderer: PropTypes.func,
    inputRenderer: PropTypes.func,
    loadingRenderer: PropTypes.func,
    clearRenderer: PropTypes.func,
    separatorRenderer: PropTypes.func,
    dropdownHandleRenderer: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      dropdown: false,
      values: props.values,
      search: '',
      selectBounds: {},
      cursor: 0
    };

    this.methods = {
      removeItem: this.removeItem,
      dropDown: this.dropDown,
      addItem: this.addItem,
      setSearch: this.setSearch,
      getInputSize: this.getInputSize,
      toggleSelectAll: this.toggleSelectAll,
      clearAll: this.clearAll,
      selectAll: this.selectAll,
      searchResults: this.searchResults,
      getSelectRef: this.getSelectRef,
      isSelected: this.isSelected,
      getSelectBounds: this.getSelectBounds,
      areAllSelected: this.areAllSelected,
      handleKeyDown: this.handleKeyDown,
      activeCursorItem: this.activeCursorItem,
      createNew: this.createNew
    };

    this.select = React.createRef();
    this.dropdownRoot = typeof document !== 'undefined' && document.createElement('div');
  }

  componentDidMount() {
    this.props.portal && this.props.portal.appendChild(this.dropdownRoot);
    window.addEventListener('resize', debounce(this.updateSelectBounds));
    window.addEventListener('scroll', debounce(this.onScroll));

    this.props.onChange(this.state.values);

    this.dropDown('close');

    if (this.select) {
      this.updateSelectBounds();
    }
  }

  componentDidUpdate(prevProps, prevState) {
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
    window.removeEventListener(
      'resize',
      debounce(this.updateSelectBounds, this.props.debounceDelay)
    );
    window.removeEventListener('scroll', debounce(this.onScroll, this.props.debounceDelay));
  }

  onDropdownClose = () => {
    this.setState({ cursor: 0 });
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

  dropDown = (action = 'toggle', event) => {
    if (
      this.props.portal &&
      event &&
      event.srcElement &&
      !this.props.closeOnScroll &&
      !this.props.closeOnSelect &&
      event.srcElement.offsetParent.classList.contains('react-dropdown-select-dropdown')
    ) {
      return;
    }

    if (this.props.keepOpen) {
      return this.setState({ dropdown: true });
    }

    if (action === 'close') {
      this.select.current.blur();
      return this.setState({ dropdown: false, search: '' });
    }

    if (action === 'open') {
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
      if (this.state.values.indexOf(item) !== -1) {
        return this.removeItem(null, item, false);
      }

      this.setState({
        values: [...this.state.values, item]
      });
    } else {
      this.setState({
        values: [item],
        dropdown: false,
        search: ''
      });
    }

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
        (values) => values[this.props.valueField] !== item[this.props.valueField]
      )
    });
  };

  setSearch = (event) => {
    this.setState({
      cursor: null
    });

    this.setState({
      search: event.target.value
    });
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

  selectAll = () => {
    this.props.onSelectAll();
    return this.setState({
      values: this.props.options.filter((option) => !option.disabled)
    });
  };

  isSelected = (option) => this.state.values.indexOf(option) !== -1;

  areAllSelected = () =>
    this.state.values.length === this.props.options.filter((option) => !option.disabled).length;

  searchResults = () => {
    const regexp = new RegExp(this.state.search, 'i');

    return this.props.options.filter((item) =>
      regexp.test(item[this.props.searchBy] || item[[this.props.labelField]])
    );
  };

  activeCursorItem = (activeCursorItem) =>
    this.setState({
      activeCursorItem
    });

  handleKeyDown = (event) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
    }

    const { cursor } = this.state;

    if (event.key === 'Escape') {
      this.dropDown('close');
    }

    if (event.key === 'Enter') {
      const currentItem = this.searchResults()[cursor];
      if (currentItem && !currentItem.disabled) {
        this.addItem(currentItem);
      }
    }

    if (event.key === 'ArrowUp' && cursor >= 0) {
      this.setState((prevState) => ({
        cursor: prevState.cursor - 1
      }));
    }

    if (event.key === 'ArrowDown') {
      this.setState((prevState) => ({
        cursor: prevState.cursor + 1
      }));
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
      <ClickOutHandler onClickOut={(event) => this.dropDown('close', event)}>
        <ReactDropdownSelect
          onKeyDown={this.handleKeyDown}
          tabIndex="0"
          style={this.props.style}
          ref={this.select}
          disabled={this.props.disabled}
          className={`react-dropdown-select ${this.props.className}`}
          color={this.props.color}>
          <Content props={this.props} state={this.state} methods={this.methods} />

          {this.props.loading && <Loading props={this.props} />}

          {this.props.clearable && (
            <Clear props={this.props} state={this.state} methods={this.methods} />
          )}

          {this.props.separator && (
            <Separator props={this.props} state={this.state} methods={this.methods} />
          )}

          {this.props.dropdownHandle && (
            <DropdownHandle
              onCLick={() => this.select.current.focus()}
              props={this.props}
              state={this.state}
              methods={this.methods}
            />
          )}

          {this.state.dropdown && this.renderDropdown()}
        </ReactDropdownSelect>
      </ClickOutHandler>
    );
  }
}

Select.defaultProps = {
  addPlaceholder: '+',
  placeholder: 'Select...',
  values: [],
  options: [],
  multi: false,
  disabled: false,
  searchBy: 'label',
  clearable: false,
  searchable: true,
  dropdownHandle: true,
  separator: false,
  keepOpen: undefined,
  noDataLabel: 'No data',
  dropdownGap: 5,
  closeOnScroll: false,
  debounceDelay: 0,
  labelField: 'label',
  valueField: 'value',
  color: '#0074D9',
  keepSelectedInList: true,
  closeOnSelect: false,
  openOnTop: false,
  dropdownHeight: '300px',
  autoFocus: true,
  portal: null,
  create: false,
  createNewLabel: 'add {search}',
  onDropdownOpen: () => undefined,
  onDropdownClose: () => undefined,
  onClearAll: () => undefined,
  onSelectAll: () => undefined,
  onCreateNew: () => undefined
};

const ReactDropdownSelect = styled.div`
  position: relative;
  display: flex;
  border: 1px solid #ccc;
  width: 100%;
  border-radius: 2px;
  padding: 2px 5px;
  flex-direction: row;
  align-items: center;
  min-height: 36px;
  ${({ disabled }) =>
    disabled ? 'cursor: not-allowed;pointer-events: none;opacity: 0.3;' : 'pointer-events: all;'}

  :hover, 
  :focus-within {
    border-color: ${({ color }) => color};
  }

  :focus {
    outline: 0;
    box-shadow: 0 0 0 3px ${({ color }) => hexToRGBA(color, 0.2)};
  }
`;

export default Select;
