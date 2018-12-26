import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled'
import ClickOutHandler from 'react-onclickout';

export class Select extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onDropdownClose: PropTypes.func.isRequired,
    onDropdownOpen: PropTypes.func.isRequired,
    values: PropTypes.array,
    options: PropTypes.array.isRequired,
    forceOpen: PropTypes.bool,
    multi: PropTypes.bool,
    placeholder: PropTypes.string,
    addPlaceholder: PropTypes.string,
    disabled: PropTypes.bool,
    className: PropTypes.string,
    contentRenderer: PropTypes.func,
    dropdownRenderer: PropTypes.func,
    loading: PropTypes.bool,
    clearable: PropTypes.bool,
    separator: PropTypes.bool,
    handle: PropTypes.bool,
    searchBy: PropTypes.string,
    noDataRenderer: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.node
    ])
  };

  constructor(props) {
    super(props);

    this.state = {
      dropdown: false,
      values: this.props.values,
      options: this.props.options,
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
      searchResults: this.searchResults
    };

    this.select = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateSelectBounds);

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

    if (prevState.dropdown && prevState.dropdown !== this.state.dropdown) {
      this.props.onDropdownClose();
    }

    if (!prevState.dropdown && prevState.dropdown !== this.state.dropdown) {
      this.props.onDropdownOpen();
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateSelectBounds);
  }

  updateSelectBounds = () =>
    this.setState({
      selectBounds: this.select.current.getBoundingClientRect()
    });

  dropDown = (action = 'toggle') => {
    if (this.props.forceOpen) {
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

  toggleSelectAll = () =>
    this.setState({
      values: this.state.values.length === 0 ? this.props.options : []
    });

  clearAll = () =>
    this.setState({
      values: []
    });

  isSelected = (option) => this.state.values.indexOf(option) !== -1;

  searchResults = () => {
    const regexp = new RegExp(this.state.search, 'i');

    return this.state.options.filter((item) =>
      regexp.test(item[this.props.searchBy] || item.label)
    );
  };

  render() {
    const placeHolder =
      (this.state.values.length > 0 && this.props.addPlaceholder) || this.props.placeholder;

    return (
      <ClickOutHandler onClickOut={() => this.dropDown('close')}>
        <ReactDropdownSelect
          ref={this.select}
          disabled={this.props.disabled}
          className={this.props.className}>
          <Content
            className={`react-dropdown-select-content ${
              this.props.multi
                ? 'react-dropdown-select-type-multi'
                : 'react-dropdown-select-type-single'
            }`}
            onClick={() => this.dropDown('open')}>
            {this.props.contentRenderer ? (
              this.props.contentRenderer(this.props, this.state, this.methods)
            ) : (
              <React.Fragment>
                {this.props.multi &&
                  this.state.values.map((item) => (
                    <Option
                      key={`${item.value}${item.label}`}
                      disabled={this.props.disabled}
                      className="react-dropdown-select-option">
                      {item.label}{' '}
                      <span
                        className="react-dropdown-select-option-remove"
                        onClick={(event) => this.removeItem(event, item, true)}>
                        &times;
                      </span>
                    </Option>
                  ))}
                {!this.props.multi && this.state.values.length > 0 && (
                  <span>{this.state.values[0].label}</span>
                )}
                <Input
                  tabIndex="1"
                  className="react-dropdown-select-input"
                  size={this.getInputSize()}
                  value={this.state.search}
                  onClick={() => this.dropDown('open')}
                  onChange={this.setSearch}
                  placeholder={placeHolder}
                />
              </React.Fragment>
            )}
          </Content>
          {this.props.loading && <Loading className="react-dropdown-select-loading" />}
          {this.props.clearable && (
            <Clear tabIndex="2" onClick={() => this.clearAll()} onKeyPress={() => this.clearAll()}>
              &times;
            </Clear>
          )}
          {this.props.separator && <Separator className="react-dropdown-select-separator" />}

          {this.props.handle && (
            <Handle
              tabIndex="3"
              onClick={() => this.dropDown()}
              onKeyPress={() => this.dropDown()}
              className="react-dropdown-select-handle">
              {this.state.dropdown ? (
                <React.Fragment>&rsaquo;</React.Fragment>
              ) : (
                <React.Fragment>&lsaquo;</React.Fragment>
              )}
            </Handle>
          )}

          {this.state.dropdown && (
            <DropDown
              tabIndex="4"
              selectBounds={this.state.selectBounds}
              className="react-dropdown-select-dropdown">
              {this.props.dropdownRenderer ? (
                this.props.dropdownRenderer(this.props, this.state, this.methods)
              ) : (
                <React.Fragment>
                  {this.searchResults().length === 0 ? (
                    <NoData>{this.props.noDataRenderer}</NoData>
                  ) : (
                    this.searchResults().map((option, index) => {
                      return (
                        <Item
                          key={`${option.value}${option.label}`}
                          tabIndex={index + 4}
                          className={`react-dropdown-select-item ${
                            this.isSelected(option) ? 'react-dropdown-select-item-selected' : ''
                          }`}
                          onClick={() => this.addItem(option)}
                          onKeyPress={() => this.addItem(option)}>
                          {option.label}
                        </Item>
                      );
                    })
                  )}
                </React.Fragment>
              )}
            </DropDown>
          )}
        </ReactDropdownSelect>
      </ClickOutHandler>
    );
  }
}

Select.defaultProps = {
  addPlaceholder: '+ add',
  placeholder: 'Select...',
  values: [],
  multi: false,
  disabled: false,
  searchBy: 'label',
  clearable: true,
  forceOpen: undefined,
  noDataRenderer: 'No matches'
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
  background: linear-gradient(#eee, #fff, #eee);
`;

const Option = styled.span`
  padding: 0 5px;
  border-radius: 2px;
  line-height: 21px;
  margin: 3px 0 3px 5px;
  background: deepskyblue;
  color: #fff;
  white-space: nowrap;
  display: inline-block;

  .react-dropdown-select-option-remove {
    cursor: pointer;
    width: 22px;
    height: 22px;
    display: inline-block;
    text-align: center;
    margin: 0 -5px 0 0px;
    border-radius: 0 3px 3px 0;
  }

  :hover,
  :hover > span {
    background: #00c4ee;
  }
`;

const Content = styled.div`
  flex: 1;
`;

const Input = styled.input`
  width: auto;
  border: none;
  margin-left: 5px;
  background: transparent;
  :focus {
    outline: transparent;
  }
  font-size: smaller;
`;

const Separator = styled.div`
  border-left: 1px solid #ccc;
  width: 1px;
  height: 25px;
  display: block;
`;

const Loading = styled.div`
  @keyframes dual-ring-spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(180deg);
    }
  }

  padding: 0 5px;
  display: block;
  width: auto;
  height: auto;

  :after {
    content: ' ';
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid red;
    border-color: deepskyblue transparent;
    animation: dual-ring-spin 0.7s ease-in-out infinite;
    margin: 0 0 0 -10px;
  }
`;

const Handle = styled.div`
  width: 20px;
  text-align: center;
  line-height: 25px;
  transform: rotate(-90deg);
  cursor: pointer;
  font-size: 26px;
`;

const DropDown = styled.div`
  position: absolute;
  top: ${({ selectBounds }) => selectBounds.bottom + 5}px;
  left: ${({ selectBounds }) => selectBounds.left}px;
  border: 1px solid #ccc;
  width: ${({ selectBounds }) => selectBounds.width}px;
  padding: 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 2px;
  box-shadow: 0 0 10px 0 #0000003b;
  max-height: 300px;
  overflow: auto;
}
`;

const Item = styled.span`
  padding: 10px;
  cursor: pointer;
  outline: none;

  :hover,
  :focus {
    background: #f2f2f2;
  }

  &.react-dropdown-select-item-selected {
    background: deepskyblue;
    color: #fff;
    border-bottom: 1px solid #fff;
  }

  input {
    &[type='checkbox'] {
      vertical-align: baseline;
      margin: 0 10px 0 0;
    }
  }
`;

const Button = styled.button`
  margin: 10px;
`;

const Clear = styled.div`
  line-height: 25px;
  margin: 0 10px;
  cursor: pointer;
`;

const NoData = styled.div`
  padding: 10px;
  text-align: center;
  color: deepskyblue;
`;

export default Select;
