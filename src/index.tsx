import React, { Component, JSX } from 'react';
import ReactDOM from 'react-dom';
import { SelectProps } from './types';

// Import all components
import ClickOutside from './components/ClickOutside';
import Content from './components/Content';
import Dropdown from './components/Dropdown';
import Loading from './components/Loading';
import Clear from './components/Clear';
import Separator from './components/Separator';
import DropdownHandle from './components/DropdownHandle';

import {
  debounce,
  getByPath,
  getProp,
  valueExistInSelected,
  isomorphicWindow
} from './util';
import { LIB_NAME } from './constants';

interface SimpleState {
  dropdown: boolean;
  values: any[];
  search: string;
  selectBounds: any;
  cursor: any;
  searchResults: any[];
  activeCursorItem?: any;
}

// Main Select component
export class Select<T extends object = {}> extends Component<SelectProps<T>, SimpleState> {
  private select: React.RefObject<HTMLDivElement | null>;
  private readonly dropdownRoot: HTMLElement | null = null;
  private readonly methods: any;

  constructor(props: SelectProps<T>) {
    super(props);

    this.state = {
      dropdown: false,
      values: (props as any).values || [],
      search: '',
      selectBounds: {},
      cursor: null,
      searchResults: (props as any).options || []
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

    this.select = React.createRef<HTMLDivElement>();
    this.dropdownRoot = typeof document !== 'undefined' ? document.createElement('div') : null;
  }

  componentDidMount(): void {
    const props = this.props as any;
    if (props.portal && this.dropdownRoot) {
      props.portal.appendChild(this.dropdownRoot);
    }
    isomorphicWindow().addEventListener('resize', debounce(this.updateSelectBounds, props.debounceDelay || 0));
    isomorphicWindow().addEventListener('scroll', debounce(this.onScroll, props.debounceDelay || 0));

    this.dropDown('close');

    if (this.select.current) {
      this.updateSelectBounds();
    }
    if (props.defaultMenuIsOpen) {
      this.dropDown('open');
    }
  }

  componentDidUpdate(prevProps: SelectProps<T>, prevState: SimpleState): void {
    const props = this.props as any;
    if (
      !props.compareValuesFunc?.(prevProps.values, props.values) &&
      props.compareValuesFunc?.(prevProps.values, prevState.values)
    ) {
      this.setState(
        {
          values: props.values
        },
        () => {
          props.onChange(this.state.values);
        }
      );
      this.updateSelectBounds();
    }

    if (prevProps.options !== props.options) {
      this.setState({ searchResults: this.searchResults() });
    }

    if (prevState.values !== this.state.values) {
      props.onChange?.(this.state.values);
      this.updateSelectBounds();
    }

    if (prevState.search !== this.state.search) {
      this.updateSelectBounds();
    }

    if (prevState.values !== this.state.values && props.closeOnSelect) {
      this.dropDown('close');
    }

    if (prevProps.multi !== props.multi) {
      this.updateSelectBounds();
    }

    if (prevState.dropdown && prevState.dropdown !== this.state.dropdown) {
      this.onDropdownClose();
    }

    if (!prevState.dropdown && prevState.dropdown !== this.state.dropdown) {
      props.onDropdownOpen();
    }
  }

  componentWillUnmount(): void {
    const props = this.props as any;
    if (props.portal && this.dropdownRoot) {
      props.portal.removeChild(this.dropdownRoot);
    }
    isomorphicWindow().removeEventListener(
      'resize',
      debounce(this.updateSelectBounds, props.debounceDelay || 0)
    );
    isomorphicWindow().removeEventListener(
      'scroll',
      debounce(this.onScroll, props.debounceDelay || 0)
    );
  }

  onDropdownClose = (): void => {
    this.setState({ cursor: null });
    (this.props as any).onDropdownClose();
  };

  onScroll = (): void => {
    const props = this.props as any;
    if (props.closeOnScroll) {
      this.dropDown('close');
    }
    this.updateSelectBounds();
  };

  updateSelectBounds = (): void => {
    if (this.select.current) {
      this.setState({
        selectBounds: this.select.current.getBoundingClientRect()
      });
    }
  };

  getSelectBounds = (): any => this.state.selectBounds;

  dropDown = (action: string = 'toggle', event?: Event, force: boolean = false): any => {
    const props = this.props as any;
    if (
      props.onDropdownCloseRequest !== undefined &&
      this.state.dropdown && !force &&
      action === 'close'
    ) {
      return props.onDropdownCloseRequest({
        props: this.props,
        methods: this.methods,
        state: this.state,
        close: () => this.dropDown('close', undefined, true)
      });
    }

    if (
      props.portal &&
      !props.closeOnScroll &&
      !props.closeOnSelect &&
      event &&
      event.target &&
      (event.target as HTMLElement).offsetParent &&
      (event.target as HTMLElement).offsetParent?.classList.contains('react-dropdown-select-dropdown')
    ) {
      return;
    }

    if (props.keepOpen) {
      return this.setState({ dropdown: true });
    }

    if (action === 'close' && this.state.dropdown) {
      this.select.current?.blur();
      return this.setState({
        dropdown: false,
        search: props.clearOnBlur ? '' : this.state.search,
        searchResults: this.props.options
      });
    }

    if (action === 'open' && !this.state.dropdown) {
      return this.setState({ dropdown: true });
    }

    if (action === 'toggle') {
      (this.select.current as any)?.focus();
      return this.setState({ dropdown: !this.state.dropdown });
    }

    return false;
  };

  getSelectRef = (): HTMLDivElement => this.select.current as any;

  addItem = (item: any): boolean => {
    const props = this.props as any;
    if (props.multi) {
      if (
        valueExistInSelected(getByPath(item, props.valueField || 'value'), this.state.values, props)
      ) {
        this.removeItem(null, item, false);
        return true;
      }

      this.setState({
        values: [...this.state.values, item]
      });
      props.onSelect([...this.state.values, item]);
    } else {
      this.setState({
        values: [item],
        dropdown: false
      });
      props.onSelect([item]);
    }

    if (props.clearOnSelect) {
      this.setState({ search: '' }, () => {
        this.setState({ searchResults: this.searchResults() });
      });
    }

    return true;
  };

  removeItem = (event: any, item: any, close: boolean = false): void => {
    const props = this.props as any;
    if (event && close) {
      event.preventDefault();
      event.stopPropagation();
      this.dropDown('close');
    }

    const values = this.state.values.filter(
      (values: any) =>
        getByPath(values, props.valueField || 'value') !== getByPath(item, props.valueField || 'value')
    );
    this.setState({
      values
    });
    props.onDeselect(values);
  };

  setSearch = (event: any): void => {
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

  getInputSize = (): number => {
    if (this.state.search) {
      return this.state.search.length;
    }

    if (this.state.values.length > 0) {
      return ((this.props as any).addPlaceholder || '').length;
    }

    return ((this.props as any).placeholder || '').length;
  };

  toggleSelectAll = (): void => {
    this.setState({
      values: this.state.values.length === 0 ? this.selectAll() : this.clearAll()
    });
  };

  clearAll = (): any[] => {
    this.props.onClearAll?.();
    this.setState({
      values: []
    });
    return [];
  };

  selectAll = (valuesList: any[] = []): any[] => {
    const props = this.props as any;
    props.onSelectAll?.();
    const values =
      valuesList.length > 0 ? valuesList : props.options.filter((option: any) => !option.disabled);

    this.setState({ values });
    return values;
  };

  isSelected = (option: any): boolean =>
    !!this.state.values.find(
      (value: any) =>
        getByPath(value, (this.props as any).valueField || 'value') === getByPath(option, (this.props as any).valueField || 'value')
    );

  areAllSelected = (): boolean =>
    this.state.values.length === ((this.props as any).options || []).filter((option: any) => !option.disabled).length;

  safeString = (string: string): string => string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  sortBy = (): any[] => {
    const props = this.props as any;
    const { sortBy, options } = props;

    if (!sortBy) {
      return options;
    }

    return options.slice().sort((a: any, b: any) => {
      if (getProp(a, sortBy) < getProp(b, sortBy)) {
        return -1;
      } else if (getProp(a, sortBy) > getProp(b, sortBy)) {
        return 1;
      } else {
        return 0;
      }
    });
  };

  searchFn = (): any[] => {
    const regexp = new RegExp(this.safeString(this.state.search), 'i');
    const props = this.props as any;

    return this.sortBy()
      .filter((item: any) =>
        regexp.test(getByPath(item, props.searchBy || 'label') || getByPath(item, props.valueField || 'value'))
      );
  };

  searchResults = (): any[] => {
    const props = this.props as any;
    const args = { state: this.state, props: this.props, methods: this.methods };

    return props.searchFn ? props.searchFn(args) : this.searchFn();
  };

  activeCursorItem = (activeCursorItem: any): void =>
    this.setState({
      activeCursorItem
    });

  handleKeyDown = (event: any): void => {
    const props = this.props as any;
    const args = {
      event,
      state: this.state,
      props: this.props,
      methods: this.methods,
      setState: this.setState.bind(this)
    };

    props.handleKeyDownFn ? props.handleKeyDownFn(args) : this.handleKeyDownFn(args);
  };

  handleKeyDownFn = (args: any): void => {
    const { event, state } = args;
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
      this.setState({
        cursor: 0
      });
      return;
    }

    if ((arrowDown || (tab && state.dropdown)) && cursor === null) {
      this.setState({
        cursor: 0
      });
      return;
    }

    if (arrowUp || arrowDown || (shiftTab && state.dropdown) || (tab && state.dropdown)) {
      event.preventDefault();
    }

    if (escape) {
      this.dropDown('close');
      return;
    }

    if (enter) {
      const currentItem = searchResults[cursor];
      if (currentItem && !currentItem.disabled) {
        const props = this.props as any;
        if (props.create && valueExistInSelected(state.search, state.values, props)) {
          return;
        }

        this.methods.addItem(currentItem);
      }
      return;
    }

    if ((arrowDown || (tab && state.dropdown)) && searchResults.length === cursor) {
      this.setState({
        cursor: 0
      });
      return;
    }

    if (arrowDown || (tab && state.dropdown)) {
      this.setState((prevState: SimpleState) => ({
        cursor: (prevState.cursor || 0) + 1
      }));
      return;
    }

    if ((arrowUp || (shiftTab && state.dropdown)) && cursor && cursor > 0) {
      this.setState((prevState: SimpleState) => ({
        cursor: (prevState.cursor || 0) - 1
      }));
      return;
    }

    if ((arrowUp || (shiftTab && state.dropdown)) && cursor === 0) {
      this.setState({
        cursor: searchResults.length
      });
      return;
    }

    if (backspace && (this.props as any).backspaceDelete && this.getInputSize() === 0) {
      this.setState({
        values: this.state.values.slice(0, -1)
      });
      return;
    }
  };

  renderDropdown = (): JSX.Element => {
    const props = this.props as any;
    if (props.portal && this.dropdownRoot) {
      return ReactDOM.createPortal(
        <Dropdown props={this.props} state={this.state} methods={this.methods} />,
        this.dropdownRoot
      );
    }

    return <Dropdown props={this.props} state={this.state} methods={this.methods} />;
  };

  createNew = (item: string): void => {
    const props = this.props as any;
    const newValue: any = {
      [props.labelField || 'label']: item,
      [props.valueField || 'value']: item
    };

    this.addItem(newValue);
    props.onCreateNew(newValue);
    this.setState({ search: '' });
  };

  render(): JSX.Element {
    const props = this.props as any;
    const containerStyle: React.CSSProperties = {
      boxSizing: 'border-box',
      position: 'relative',
      display: 'flex',
      border: '1px solid #ccc',
      width: '100%',
      borderRadius: '2px',
      padding: '2px 5px',
      flexDirection: 'row',
      direction: props.direction || 'ltr',
      alignItems: 'center',
      cursor: props.disabled ? 'not-allowed' : 'pointer',
      minHeight: '36px',
      opacity: props.disabled ? 0.3 : 1,
      pointerEvents: props.disabled ? 'none' : 'all',
      ...props.style
    };

    if (props.disabled) {
      containerStyle.pointerEvents = 'none';
      containerStyle.opacity = 0.3;
      containerStyle.cursor = 'not-allowed';
    }

    return (
      <ClickOutside onClickOutside={(event: any) => this.dropDown('close', event)}>
        <div
          style={containerStyle}
          onKeyDown={this.handleKeyDown}
          aria-label="Dropdown select"
          aria-expanded={this.state.dropdown}
          onClick={(event: any) => this.dropDown('open', event)}
          tabIndex={props.disabled ? -1 : 0}
          className={`${LIB_NAME} ${props.className}`}
          {...props.additionalProps}>
          <Content props={this.props} state={this.state} methods={this.methods} />

          {(props.name || props.required) && (
            <input
              tabIndex={-1}
              style={{ opacity: 0, width: 0, position: 'absolute' }}
              name={props.name}
              required={props.required}
              pattern={props.pattern}
              defaultValue={
                this.state.values.map((value: any) => (value && value[props.labelField || 'label'])?.toString() || '').toString() || []
              }
              disabled={props.disabled}
            />
          )}

          {props.loading && <Loading props={this.props} />}

          {props.clearable && (
            <Clear props={this.props} state={this.state} methods={this.methods} />
          )}

          {props.separator && (
            <Separator props={this.props} state={this.state} methods={this.methods} />
          )}

          {props.dropdownHandle && (
            <DropdownHandle
              props={this.props}
              state={this.state}
              methods={this.methods}
            />
          )}

          {this.state.dropdown && !props.disabled && this.renderDropdown()}
        </div>
      </ClickOutside>
    );
  }
}

export default Select;
