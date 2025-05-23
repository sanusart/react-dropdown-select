import React from 'react';
import ReactDOM from 'react-dom';
import styled from '@emotion/styled';

import { LIB_NAME } from './constants';
import Dropdown from './components/Dropdown';
import Clear from './components/Clear';
import Input from './components/Input';
import Content from './components/Content';
import Loading from './components/Loading';
import DropdownHandle from './components/DropdownHandle';

import {
  valueExistInSelected,
  hexToRGBA,
  isomorphicWindow,
} from './util';

export interface SelectProps {
  values: any[];
  options: any[];
  valueField: string;
  labelField: string;
  searchBy: string;
  multi: boolean;
  clearOnSelect: boolean;
  closeOnSelect: boolean;
  closeOnScroll: boolean;
  defaultMenuIsOpen?: boolean;
  debounceDelay?: number;
  backspaceDelete?: boolean;
  disabled?: boolean;
  className?: string;
  color?: string;
  placeholder: string;
  addPlaceholder: string;
  name?: string;
  required?: boolean;
  pattern?: string;
  style?: React.CSSProperties;
  dropdownHandle?: boolean;
  separator?: boolean;
  clearable?: boolean;
  loading?: boolean;
  direction?: 'ltr' | 'rtl';
  keepOpen?: boolean;
  portal?: HTMLElement | null;
  create?: boolean;

  onChange: (values: any[]) => void;
  onSelect: (values: any[]) => void;
  onDeselect: (values: any[]) => void;
  onClearAll: () => void;
  onSelectAll: () => void;
  onCreateNew: (value: string) => void;
  onDropdownClose: () => void;
  onDropdownOpen: () => void;
  onDropdownCloseRequest?: (args: {
    props: SelectProps;
    methods: SelectMethods;
    state: SelectState;
    close: () => void;
  }) => void;

  compareValuesFunc: (prev: any[], next: any[]) => boolean;
  searchFn?: (args: { props: SelectProps; state: SelectState; methods: SelectMethods }) => any[];
  handleKeyDownFn?: (args: {
    event: React.KeyboardEvent;
    state: SelectState;
    props: SelectProps;
    methods: SelectMethods;
    setState: React.Component<SelectProps, SelectState>['setState'];
  }) => void;
}

export interface SelectState {
  dropdown: boolean;
  values: any[];
  search: string;
  selectBounds: DOMRect | {};
  cursor: number | null;
  searchResults: any[];
  activeCursorItem?: any;
}

export interface SelectMethods {
  addItem: (item: any) => boolean;
  removeItem: (event: React.MouseEvent | null, item: any, close?: boolean) => void;
  clearAll: () => void;
  selectAll: () => void;
  areAllSelected: () => boolean;
  createNew: (value: string) => void;
  setSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  dropDown: (action: 'open' | 'close' | 'toggle', event?: React.MouseEvent | null, forceClose?: boolean) => void;
  getSelectRef: () => React.RefObject<HTMLDivElement>;
  isSelected: (item: any) => boolean;
}

// === Styled wrapper for main container ===
const ReactDropdownSelect = styled.div`
    font-family: Arial, sans-serif;
    font-size: 14px;
    position: relative;
    box-sizing: border-box;
    user-select: none;
    width: 100%;
`;

export class Select extends React.Component<SelectProps, SelectState> {
  select: React.RefObject<HTMLDivElement | null>;
  dropdownRoot: HTMLElement | null;
  debounceTimeout?: number;
  methods: SelectMethods;

  constructor(props: SelectProps) {
    super(props);
    this.select = React.createRef<HTMLDivElement>();
    this.dropdownRoot = null;

    this.state = {
      dropdown: props.defaultMenuIsOpen ?? false,
      values: props.values || [],
      search: '',
      selectBounds: {},
      cursor: null,
      searchResults: props.options || [],
    };

    // Bind methods
    this.methods = {
      addItem: this.addItem,
      removeItem: this.removeItem,
      clearAll: this.clearAll,
      selectAll: this.selectAll,
      areAllSelected: this.areAllSelected,
      createNew: this.createNew,
      setSearch: this.setSearch,
      handleKeyDown: this.handleKeyDown,
      dropDown: this.dropDown,
      getSelectRef: () => this.select,
      isSelected: this.isSelected,
    };
  }

  componentDidMount() {
    this.dropdownRoot = document.createElement('div');
    this.dropdownRoot.id = `${LIB_NAME}-portal`;
    if (this.props.portal) {
      this.props.portal.appendChild(this.dropdownRoot);
    } else {
      document.body.appendChild(this.dropdownRoot);
    }
  }

  componentDidUpdate(prevProps: SelectProps, prevState: SelectState) {
    if (!this.props.compareValuesFunc(prevProps.values, this.props.values)) {
      this.setState({ values: this.props.values });
    }
    if (prevProps.options !== this.props.options) {
      this.setState({ searchResults: this.props.options });
    }
  }

  componentWillUnmount() {
    if (this.dropdownRoot) {
      if (this.props.portal) {
        this.props.portal.removeChild(this.dropdownRoot);
      } else {
        document.body.removeChild(this.dropdownRoot);
      }
    }
  }

  addItem = (item: any): boolean => {
    if (this.isSelected(item)) {
      return false;
    }

    const values = this.props.multi ? [...this.state.values, item] : [item];
    this.setState({ values, search: '' }, () => {
      this.props.onSelect(values);
      this.props.onChange(values);
    });

    if (this.props.clearOnSelect) {
      this.setState({ search: '' });
    }

    if (this.props.closeOnSelect && !this.props.multi) {
      this.dropDown('close', null, true);
    }

    return true;
  };

  removeItem = (event: React.MouseEvent | null, item: any, close = false): void => {
    if (event) {
      event.stopPropagation();
    }
    const values = this.state.values.filter(
      (value) => value[this.props.valueField] !== item[this.props.valueField]
    );
    this.setState({ values }, () => {
      this.props.onDeselect(values);
      this.props.onChange(values);
      if (close) {
        this.dropDown('close', null, true);
      }
    });
  };

  clearAll = () => {
    this.setState({ values: [] }, () => {
      this.props.onClearAll();
      this.props.onChange([]);
    });
  };

  selectAll = () => {
    this.setState({ values: [...this.props.options] }, () => {
      this.props.onSelectAll();
      this.props.onChange(this.props.options);
    });
  };

  areAllSelected = (): boolean => {
    return this.props.options.every((opt) =>
      this.state.values.some(
        (val) => val[this.props.valueField] === opt[this.props.valueField]
      )
    );
  };

  createNew = (value: string) => {
    this.props.onCreateNew(value);
    this.setState({ search: '' });
  };

  setSearch = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const search = event.target.value;
    this.setState({ search }, () => {
      if (this.props.searchFn) {
        const searchResults = this.props.searchFn({
          props: this.props,
          state: this.state,
          methods: this.methods,
        });
        this.setState({ searchResults });
      } else {
        // Default search logic: filter options by labelField or searchBy field
        const searchResults = this.props.options.filter((opt) =>
          opt[this.props.searchBy]
            .toString()
            .toLowerCase()
            .includes(search.toLowerCase())
        );
        this.setState({ searchResults });
      }
    });
  };

  isSelected = (item: any): boolean => {
    return this.state.values.some(
      (val) => val[this.props.valueField] === item[this.props.valueField]
    );
  };

  dropDown = (
    action: 'open' | 'close' | 'toggle',
    event?: React.MouseEvent | null,
    forceClose = false
  ) => {
    if (event) {
      event.stopPropagation();
    }

    if (forceClose) {
      this.setState({ dropdown: false }, () => {
        this.props.onDropdownClose();
      });
      return;
    }

    if (action === 'open') {
      this.setState({ dropdown: true }, () => {
        this.props.onDropdownOpen();
      });
    } else if (action === 'close') {
      if (this.props.onDropdownCloseRequest) {
        this.props.onDropdownCloseRequest({
          props: this.props,
          methods: this.methods,
          state: this.state,
          close: () => this.dropDown('close', null, true),
        });
      } else {
        this.setState({ dropdown: false }, () => {
          this.props.onDropdownClose();
        });
      }
    } else if (action === 'toggle') {
      this.setState(
        (prevState) => ({ dropdown: !prevState.dropdown }),
        () => {
          if (this.state.dropdown) {
            this.props.onDropdownOpen();
          } else {
            this.props.onDropdownClose();
          }
        }
      );
    }
  };

  handleKeyDown = (event: React.KeyboardEvent): void => {
    if (this.props.handleKeyDownFn) {
      this.props.handleKeyDownFn({
        event,
        state: this.state,
        props: this.props,
        methods: this.methods,
        setState: this.setState.bind(this),
      });
      return;
    }

    // Default keyboard handling (simplified)
    const { cursor, searchResults } = this.state;
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      const next = cursor === null ? 0 : Math.min(cursor + 1, searchResults.length - 1);
      this.setState({ cursor: next });
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      const prev = cursor === null ? searchResults.length - 1 : Math.max(cursor - 1, 0);
      this.setState({ cursor: prev });
    } else if (event.key === 'Enter') {
      event.preventDefault();
      if (cursor !== null && searchResults[cursor]) {
        this.addItem(searchResults[cursor]);
      }
    } else if (event.key === 'Escape') {
      this.dropDown('close', null, true);
    }
  };

  renderDropdown = (): React.ReactNode => {
    if (!this.state.dropdown) {
      return null;
    }

    const dropdown = (
      <Dropdown
        props={this.props}
        state={this.state}
        methods={this.methods}
      />
    );

    if (this.dropdownRoot) {
      return ReactDOM.createPortal(dropdown, this.dropdownRoot);
    }

    return dropdown;
  };

  render() {
    const {
      disabled,
      clearable,
      className,
      color,
      placeholder,
      loading,
      valueField,
      labelField,
      multi,
      style,
      separator,
      name,
      required,
      pattern,
      direction,
      dropdownHandle,
    } = this.props;

    const { values, search, cursor } = this.state;

    return (
      <ReactDropdownSelect
        ref={this.select}
        tabIndex={0}
        onKeyDown={this.methods.handleKeyDown}
        onClick={() => this.methods.dropDown('toggle')}
        className={`${LIB_NAME}-container ${className ?? ''} ${disabled ? 'disabled' : ''}`}
        style={style}
        role="combobox"
        aria-expanded={this.state.dropdown}
        aria-haspopup="listbox"
        aria-owns={`${LIB_NAME}-list`}
        aria-activedescendant={
          cursor !== null && this.state.searchResults[cursor]
            ? `${LIB_NAME}-option-${cursor}`
            : undefined
        }
        dir={direction}
      >
        <Content
          values={values}
          valueField={valueField}
          labelField={labelField}
          multi={multi}
          removeItem={this.methods.removeItem}
          placeholder={placeholder}
          search={search}
          color={color}
          disabled={disabled}
          separator={separator}
          name={name}
          required={required}
          pattern={pattern}
        />
        <Input
          value={search}
          onChange={this.methods.setSearch}
          disabled={disabled}
          color={color}
          placeholder={values.length === 0 ? placeholder : ''}
          name={name}
          required={required}
          pattern={pattern}
        />
        {clearable && !disabled && values.length > 0 && (
          <Clear props={this.props} state={this.state} methods={this.methods} />
        )}
        {loading && <Loading color={color} props={{
          loadingRenderer: undefined,
          color: undefined
        }} />}
        {dropdownHandle && <DropdownHandle color={color} />}
        {this.renderDropdown()}
      </ReactDropdownSelect>
    );
  }
}

export default Select;
