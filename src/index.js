import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import ClickOutHandler from 'react-onclickout';

import Content from './components/Content';
import Dropdown from './components/Dropdown';
import Loading from './components/Loading';
import Clear from './components/Clear';
import Separator from './components/Separator';
import DropdownHandle from './components/DropdownHandle';

const debounce = (fn, delay = 0) => {
  let timerId;

  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      fn(...args);
      timerId = null;
    }, delay);
  };
};

export class Select extends React.Component {
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
    separator: PropTypes.bool,
    dropdownHandle: PropTypes.bool,
    searchBy: PropTypes.string,
    closeOnScroll: PropTypes.bool,
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
      values: [],
      search: '',
      selectBounds: {}
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
      getSelectBounds: this.getSelectBounds
    };

    this.select = React.createRef();
  }

  componentDidMount() {
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

    if (prevProps.values !== this.props.values) {
      this.setState({ values: this.props.values});
    }

    if (prevProps.multi !== this.props.multi) {
      this.updateSelectBounds();
    }

    if (prevState.dropdown && prevState.dropdown !== this.state.dropdown, this.props.debounceDelay) {
      this.props.onDropdownClose();
    }

    if (!prevState.dropdown && prevState.dropdown !== this.state.dropdown, this.props.debounceDelay) {
      this.props.onDropdownOpen();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', debounce(this.updateSelectBounds, this.props.debounceDelay));
    window.removeEventListener('scroll', debounce(this.onScroll, this.props.debounceDelay));
  }

  onScroll = () => {
    if(this.props.closeOnScroll) {
      this.dropDown('close');
    }

    this.updateSelectBounds();
  };

  updateSelectBounds = () =>
    this.select.current && this.setState({
      selectBounds: this.select.current.getBoundingClientRect()
    });

  getSelectBounds = () => this.state.selectBounds;

  dropDown = (action = 'toggle') => {
    if (this.props.keepOpen) {
      return this.setState({ dropdown: true });
    }

    if (action === 'close') {
      return this.setState({ dropdown: false, search: '' });
    }

    if (action === 'open') {
      return this.setState({ dropdown: true });
    }

    if (action === 'toggle') {
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
      values: this.state.values.filter((values) => values.value !== item.value)
    });
  };

  setSearch = (event) =>
    this.setState({
      search: event.target.value
    });

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
      values: this.props.options
    });
  };

  isSelected = (option) => this.state.values.indexOf(option) !== -1;

  searchResults = () => {
    const regexp = new RegExp(this.state.search, 'i');

    return this.props.options.filter((item) =>
      regexp.test(item[this.props.searchBy] || item.label)
    );
  };

  render() {
    return (
      <ClickOutHandler onClickOut={() => this.dropDown('close')}>
        <ReactDropdownSelect
          style={this.props.style}
          ref={this.select}
          disabled={this.props.disabled}
          className={this.props.className}>
          <Content parentProps={this.props} parentState={this.state} parentMethods={this.methods} />

          {this.props.loading && <Loading parentProps={this.props} />}

          {this.props.clearable && (
            <Clear parentProps={this.props} parentState={this.state} parentMethods={this.methods} />
          )}

          {this.props.separator && (
            <Separator
              parentProps={this.props}
              parentState={this.state}
              parentMethods={this.methods}
            />
          )}

          {this.props.dropdownHandle && (
            <DropdownHandle
              parentProps={this.props}
              parentState={this.state}
              parentMethods={this.methods}
            />
          )}

          {this.state.dropdown && (
            <Dropdown
              parentProps={this.props}
              parentState={this.state}
              parentMethods={this.methods}
            />
          )}
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
  clearable: true,
  dropdownHandle: true,
  separator: true,
  keepOpen: undefined,
  noDataLabel: 'No data',
  dropdownGap: 5,
  closeOnScroll: false,
  debounceDelay: 0,
  onDropdownOpen: () => undefined,
  onDropdownClose: () => undefined,
  onClearAll: () => undefined,
  onSelectAll: () => undefined
};

const ReactDropdownSelect = styled.div`
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

  :focus-within {
    border-color: deepskyblue;
  }
`;

export default Select;
