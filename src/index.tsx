import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ClickOutside from './components/ClickOutside';
import { injectStyles } from './styles';

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
import { SelectProps, SelectState, SelectMethods, HandleKeyDownArgs } from './select-types';

interface SelectComponentState<T> extends SelectState<T> {
  searchResults: T[];
}

injectStyles();

export class Select<T extends Record<string, any>> extends Component<
  SelectProps<T>,
  SelectComponentState<T>
> {
  methods!: SelectMethods<T>;
  select: React.RefObject<HTMLDivElement>;
  dropdownRoot: HTMLDivElement | false;

  static defaultProps: SelectProps<any> = {
    addPlaceholder: '',
    additionalProps: undefined,
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
    onSelect: () => undefined,
    onDeselect: () => undefined,
    onClearAll: () => undefined,
    onCreateNew: () => undefined,
    onDropdownClose: () => undefined,
    onDropdownCloseRequest: undefined,
    onDropdownOpen: () => undefined,
    onSelectAll: () => undefined,
    options: [],
    pattern: undefined,
    placeholder: 'Select...',
    portal: undefined,
    required: false,
    searchBy: 'label',
    searchFn: () => undefined as any,
    searchable: true,
    selectAll: false,
    selectAllLabel: 'Select all',
    separator: false,
    sortBy: null,
    valueField: 'value',
    values: [],
    defaultMenuIsOpen: false
  };

  constructor(props: SelectProps<T>) {
    super(props);

    this.state = {
      dropdown: false,
      values: (props.values || []) as T[],
      search: '',
      selectBounds: {} as DOMRect,
      cursor: null,
      searchResults: (props.options || []) as T[]
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
    this.dropdownRoot =
      typeof document !== 'undefined' && document.createElement('div');
  }

  componentDidMount() {
    this.props.portal && this.props.portal.appendChild(this.dropdownRoot as HTMLDivElement);
    isomorphicWindow().addEventListener('resize', debounce(this.updateSelectBounds));
    isomorphicWindow().addEventListener('scroll', debounce(this.onScroll));

    this.dropDown('close');

    if (this.select) {
      this.updateSelectBounds();
    }
    if (this.props.defaultMenuIsOpen) {
      this.dropDown('open');
    }
  }

  componentDidUpdate(prevProps: SelectProps<T>, prevState: SelectComponentState<T>) {
    if (
      !this.props.compareValuesFunc!(prevProps.values || [], this.props.values || []) &&
      this.props.compareValuesFunc!(prevProps.values || [], prevState.values)
    ) {
      this.setState(
        {
          values: this.props.values || []
        },
        () => {
          this.props.onChange!(this.state.values);
        }
      );
      this.updateSelectBounds();
    }

    if (prevProps.options !== this.props.options) {
      this.setState({ searchResults: this.searchResults() });
    }

    if (prevState.values !== this.state.values) {
      this.props.onChange!(this.state.values);
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
      this.props.onDropdownOpen!();
    }
  }

  componentWillUnmount() {
    this.props.portal && this.props.portal.removeChild(this.dropdownRoot as HTMLDivElement);
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
    this.props.onDropdownClose!();
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

  dropDown = (action = 'toggle', event?: React.MouseEvent | React.KeyboardEvent | null, force = false) => {
    const target = (event && (event.target as HTMLElement)) || (event && (event as any).srcElement);

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
      (target as HTMLElement).offsetParent &&
      (target as HTMLElement).offsetParent!.classList.contains('react-dropdown-select-dropdown')
    ) {
      return;
    }

    if (this.props.keepOpen) {
      return this.setState({ dropdown: true });
    }

    if (action === 'close' && this.state.dropdown) {
      this.select.current!.blur();

      return this.setState({
        dropdown: false,
        search: this.props.clearOnBlur ? '' : this.state.search,
        searchResults: this.props.options || []
      });
    }

    if (action === 'open' && !this.state.dropdown) {
      return this.setState({ dropdown: true });
    }

    if (action === 'toggle') {
      this.select.current!.focus();
      return this.setState({ dropdown: !this.state.dropdown });
    }

    return false;
  };

  getSelectRef = () => this.select.current;

  addItem = (item: T) => {
    if (this.props.multi) {
      if (
        valueExistInSelected(getByPath(item, this.props.valueField), this.state.values, this.props)
      ) {
        return this.removeItem(null, item, false);
      }

      this.setState({
        values: [...this.state.values, item]
      });
      this.props.onSelect!([...this.state.values, item]);
    } else {
      this.setState({
        values: [item],
        dropdown: false
      });
      this.props.onSelect!([item]);
    }

    this.props.clearOnSelect &&
      this.setState({ search: '' }, () => {
        this.setState({ searchResults: this.searchResults() });
      });

    return true;
  };

  removeItem = (event: React.MouseEvent<HTMLElement> | null, item: T, close = false) => {
    if (event && close) {
      event.preventDefault();
      event.stopPropagation();
      this.dropDown('close');
    }

    const values = this.state.values.filter(
      (v) =>
        getByPath(v, this.props.valueField) !== getByPath(item, this.props.valueField)
    );
    this.setState({
      values
    });
    this.props.onDeselect!(values);
  };

  setSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      return (this.props.addPlaceholder || '').length;
    }

    return (this.props.placeholder || '').length;
  };

  toggleSelectAll = () => {
    return this.setState({
      values: this.state.values.length === 0 ? this.selectAll() : (this.clearAll() as any)
    });
  };

  clearAll = () => {
    this.props.onClearAll!();
    this.setState({
      values: []
    });
    return [];
  };

  selectAll = (valuesList: T[] = []) => {
    this.props.onSelectAll!();
    const values =
      valuesList.length > 0
        ? valuesList
        : (this.props.options || []).filter((option: any) => !option.disabled);

    this.setState({ values });
    return values;
  };

  isSelected = (option: T) =>
    !!this.state.values.find(
      (value) =>
        getByPath(value, this.props.valueField) === getByPath(option, this.props.valueField)
    );

  areAllSelected = () =>
    this.state.values.length ===
    (this.props.options || []).filter((option: any) => !option.disabled).length;

  safeString = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  sortBy = () => {
    const { sortBy, options } = this.props;

    if (!sortBy) {
      return options || [];
    }

    const sorted = [...(options || [])];
    sorted.sort((a: any, b: any) => {
      if (getProp(a, sortBy) < getProp(b, sortBy)) {
        return -1;
      } else if (getProp(a, sortBy) > getProp(b, sortBy)) {
        return 1;
      } else {
        return 0;
      }
    });

    return sorted;
  };

  searchFn = ({ state, methods }: { state: SelectState<T>; methods: SelectMethods<T> }) => {
    const regexp = new RegExp(methods.safeString(state.search), 'i');

    return methods
      .sortBy()
      .filter((item: any) =>
        regexp.test(getByPath(item, this.props.searchBy) || getByPath(item, this.props.valueField))
      );
  };

  searchResults = () => {
    const args = { state: this.state, props: this.props, methods: this.methods };

    return this.props.searchFn!(args) || this.searchFn(args);
  };

  activeCursorItem = (activeCursorItem: any) =>
    this.setState({
      activeCursorItem
    });

  handleKeyDown = (event: React.KeyboardEvent) => {
    const args = {
      event,
      state: this.state,
      props: this.props,
      methods: this.methods,
      setState: this.setState.bind(this)
    };

    if (this.props.handleKeyDownFn) {
      this.props.handleKeyDownFn(args);
    } else {
      this.handleKeyDownFn(args);
    }
  };

  handleKeyDownFn = ({ event, state, props, methods, setState }: HandleKeyDownArgs<T>) => {
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
      const currentItem = searchResults[cursor as number];
      if (currentItem && !(currentItem as any).disabled) {
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
      setState((prevState: SelectComponentState<T>) => ({
        cursor: (prevState.cursor || 0) + 1
      }));
    }

    if ((arrowUp || (shiftTab && state.dropdown)) && cursor! > 0) {
      setState((prevState: SelectComponentState<T>) => ({
        cursor: prevState.cursor! - 1
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
        this.dropdownRoot as HTMLDivElement
      )
    ) : (
      <Dropdown props={this.props} state={this.state} methods={this.methods} />
    );

  createNew = (item: string) => {
    const newValue = {
      [this.props.labelField!]: item,
      [this.props.valueField!]: item
    } as unknown as T;

    this.addItem(newValue);
    this.props.onCreateNew!(newValue);
    this.setState({ search: '' });
  };

  render() {
    return (
      <ClickOutside onClickOutside={(event) => this.dropDown('close', event as React.MouseEvent)}>
        <div
          onKeyDown={this.handleKeyDown}
          aria-label="Dropdown select"
          aria-expanded={this.state.dropdown}
          onClick={(event) => this.dropDown('open', event)}
          tabIndex={this.props.disabled ? -1 : 0}
          ref={this.select}
          className={`${this.props.disabled ? `${LIB_NAME}-disabled` : ''} ${LIB_NAME} ${
            this.props.className || ''
          }`}
          style={{
            '--select-direction': this.props.direction,
            '--select-color': this.props.color,
            '--select-color-shadow': this.props.color ? hexToRGBA(this.props.color, 0.2) : hexToRGBA('#000', 0.2)
          } as React.CSSProperties}
          {...this.props.additionalProps}>
          <Content props={this.props} state={this.state} methods={this.methods} />

          {(this.props.name || this.props.required) && (
            <input
              tabIndex={-1}
              style={{ opacity: 0, width: 0, position: 'absolute' } as React.CSSProperties}
              name={this.props.name || ''}
              required={this.props.required}
              pattern={this.props.pattern}
              defaultValue={
                this.state.values
                  .map((value: any) => value[this.props.labelField!])
                  .toString() || ''
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
              onClick={() => this.select.current!.focus()}
              props={this.props}
              state={this.state}
              methods={this.methods}
            />
          )}

          {this.state.dropdown && !this.props.disabled && this.renderDropdown()}
        </div>
      </ClickOutside>
    );
  }
}

export default Select;
