import React, {
  Component,
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from 'react';
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
  isomorphicWindow,
} from './util';
import { LIB_NAME } from './constants';
import type { SelectMethods, SelectProps, SelectState, SelectKeyDown } from '../types';
import type { IsomorphicWindow } from './util';

// Internal state: build from exported SelectState but allow nullable cursor and extra runtime fields
type InternalState<T extends object | string = NonNullable<unknown>> = Omit<
  SelectState<T>,
  'cursor' | 'selectBounds'
> & {
  cursor: number | null;
  selectBounds: DOMRect | NonNullable<unknown>;
  searchResults: T[];
  activeCursorItem?: unknown;
};

export class Select<T extends object | string = NonNullable<unknown>> extends Component<
  SelectProps<T>,
  InternalState<T>
> {
  static defaultProps: Partial<SelectProps<unknown>> = {
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
    values: [],
    defaultMenuIsOpen: false,
  };

  methods: SelectMethods<T>;
  select: React.RefObject<HTMLDivElement>;
  dropdownRoot: HTMLDivElement | null;

  constructor(props: SelectProps<T>) {
    super(props);

    this.state = {
      dropdown: false,
      values: props.values,
      search: '',
      selectBounds: {},
      cursor: null,
      searchResults: props.options,
    } as InternalState<T>;

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
      toggleSelectAll: this.toggleSelectAll,
    } as SelectMethods<T>;

    this.select = React.createRef<HTMLDivElement>();
    this.dropdownRoot =
      typeof document !== 'undefined' ? (document.createElement('div') as HTMLDivElement) : null;
  }

  componentDidMount() {
    if (this.props.portal && this.dropdownRoot) this.props.portal.appendChild(this.dropdownRoot);
    (isomorphicWindow() as IsomorphicWindow).addEventListener(
      'resize',
      debounce(this.updateSelectBounds),
    );
    (isomorphicWindow() as IsomorphicWindow).addEventListener('scroll', debounce(this.onScroll));

    this.dropDown('close');

    if (this.select && this.select.current) {
      this.updateSelectBounds();
    }
    if (this.props.defaultMenuIsOpen) {
      this.dropDown('open');
    }
  }

  componentDidUpdate(prevProps: SelectProps<T>, prevState: InternalState<T>) {
    if (
      !this.props.compareValuesFunc(
        prevProps.values as unknown as Record<string, unknown>,
        this.props.values as unknown as Record<string, unknown>,
      ) &&
      this.props.compareValuesFunc(
        prevProps.values as unknown as Record<string, unknown>,
        prevState.values as unknown as Record<string, unknown>,
      )
    ) {
      this.setState(
        {
          values: this.props.values,
        },
        () => {
          this.props.onChange(this.state.values);
        },
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
    if (this.props.portal && this.dropdownRoot) this.props.portal.removeChild(this.dropdownRoot);
    (isomorphicWindow() as IsomorphicWindow).removeEventListener(
      'resize',
      debounce(this.updateSelectBounds, this.props.debounceDelay),
    );
    (isomorphicWindow() as IsomorphicWindow).removeEventListener(
      'scroll',
      debounce(this.onScroll, this.props.debounceDelay),
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
      selectBounds: this.select.current.getBoundingClientRect(),
    });

  getSelectBounds = () => this.state.selectBounds;

  dropDown = (action = 'toggle', event?: Event | ReactMouseEvent<HTMLElement>, force = false) => {
    const target =
      (event && (event as Event & { target?: Element }).target) ||
      (event && (event as unknown as { srcElement?: Element }).srcElement);

    if (
      this.props.onDropdownCloseRequest !== undefined &&
      this.state.dropdown &&
      force === false &&
      action === 'close'
    ) {
      return this.props.onDropdownCloseRequest({
        props: this.props,
        methods: this.methods as SelectMethods<T>,
        state: this.state,
        close: () => this.dropDown('close', undefined, true),
      });
    }

    if (
      this.props.portal &&
      !this.props.closeOnScroll &&
      !this.props.closeOnSelect &&
      event &&
      target &&
      target instanceof HTMLElement &&
      (target as HTMLElement).offsetParent &&
      ((target as HTMLElement).offsetParent as HTMLElement).classList.contains(
        'react-dropdown-select-dropdown',
      )
    ) {
      return;
    }

    if (this.props.keepOpen) {
      return this.setState({ dropdown: true });
    }

    if (action === 'close' && this.state.dropdown) {
      this.select.current && this.select.current.blur();

      return this.setState({
        dropdown: false,
        search: this.props.clearOnBlur ? '' : this.state.search,
        searchResults: this.props.options,
      });
    }

    if (action === 'open' && !this.state.dropdown) {
      return this.setState({ dropdown: true });
    }

    if (action === 'toggle') {
      this.select.current && this.select.current.focus();
      return this.setState({ dropdown: !this.state.dropdown });
    }

    return false;
  };

  getSelectRef = () => this.select.current;

  addItem = (item: T) => {
    if (this.props.multi) {
      if (
        valueExistInSelected(
          getByPath(item, this.props.valueField),
          this.state.values,
          this.props as SelectProps<T>,
        )
      ) {
        return this.removeItem(null, item, false);
      }

      this.setState({
        values: [...this.state.values, item],
      });
      this.props.onSelect && this.props.onSelect([...this.state.values, item]);
    } else {
      this.setState({
        values: [item],
        dropdown: false,
      });
      this.props.onSelect && this.props.onSelect([item]);
    }

    this.props.clearOnSelect &&
      this.setState({ search: '' }, () => {
        this.setState({ searchResults: this.searchResults() });
      });

    return true;
  };

  removeItem = (event: ReactMouseEvent<HTMLElement> | null, item: T, close = false) => {
    if (event && close) {
      event.preventDefault();
      event.stopPropagation();
      this.dropDown('close');
    }

    const values = this.state.values.filter(
      values => getByPath(values, this.props.valueField) !== getByPath(item, this.props.valueField),
    );
    this.setState({
      values,
    });
    this.props.onDeselect && this.props.onDeselect(values);
  };

  setSearch = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      cursor: null,
    });

    this.setState(
      {
        search: event.target.value,
      },
      () => {
        this.setState({ searchResults: this.searchResults() });
      },
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
    // selectAll and clearAll already update state themselves (they return void),
    // so just call them instead of trying to use their return values.
    if (this.state.values.length === 0) {
      this.selectAll();
    } else {
      this.clearAll();
    }
  };

  clearAll = () => {
    this.props.onClearAll && this.props.onClearAll();
    this.setState({
      values: [],
    });
  };

  selectAll = (valuesList: T[] = []) => {
    this.props.onSelectAll && this.props.onSelectAll();
    const values =
      valuesList.length > 0
        ? valuesList
        : (this.props.options as T[]).filter(
            (option: T) => !(option as unknown as { disabled?: boolean }).disabled,
          );

    this.setState({ values });
  };

  isSelected = (option: T) =>
    !!this.state.values.find(
      value => getByPath(value, this.props.valueField) === getByPath(option, this.props.valueField),
    );

  areAllSelected = () =>
    this.state.values.length ===
    (this.props.options as T[]).filter(
      (option: T) => !(option as unknown as { disabled?: boolean }).disabled,
    ).length;

  safeString = (string: string) => string.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&');

  sortBy = () => {
    const { sortBy, options } = this.props as SelectProps<T> & { options: T[] };

    if (!sortBy) {
      return options;
    }

    options.sort((a: T, b: T) => {
      const av = getProp(a, sortBy) as unknown;
      const bv = getProp(b, sortBy) as unknown;

      if (av < bv) {
        return -1;
      } else if (av > bv) {
        return 1;
      } else {
        return 0;
      }
    });

    return options;
  };

  searchFn = ({ state, methods }: { state: InternalState<T>; methods: SelectMethods<T> }) => {
    const regexp = new RegExp(methods.safeString(state.search), 'i');

    return methods
      .sortBy()
      .filter((item: T) =>
        regexp.test(
          String(getByPath(item, this.props.searchBy) || getByPath(item, this.props.valueField)),
        ),
      );
  };

  searchResults = (): T[] => {
    const args = { state: this.state, props: this.props, methods: this.methods };

    return (
      (this.props.searchFn && this.props.searchFn(args)) ||
      this.searchFn({ state: this.state, methods: this.methods })
    );
  };

  activeCursorItem = (activeCursorItem: unknown) =>
    this.setState({
      activeCursorItem,
    });

  handleKeyDown = (event: ReactKeyboardEvent) => {
    const args: SelectKeyDown<T> = {
      event: event as unknown as ReactKeyboardEvent,
      state: this.state as unknown as SelectState<T>,
      props: this.props,
      methods: this.methods,
      setState: this.setState.bind(this),
    };

    if (this.props.handleKeyDownFn) {
      return this.props.handleKeyDownFn(args);
    }

    return this.handleKeyDownFn(args);
  };

  handleKeyDownFn = (args: SelectKeyDown<T>) => {
    const { event, state, props, methods, setState } = args;
    // state passed in via SelectKeyDown is the public SelectState; narrow to our InternalState
    type InternalStateLocal = Omit<SelectState<T>, 'cursor' | 'selectBounds'> & {
      cursor: number | null;
      selectBounds: DOMRect | NonNullable<unknown>;
      searchResults: T[];
      activeCursorItem?: unknown;
    };

    const cursor = (state as unknown as InternalStateLocal).cursor;
    const searchResults = (state as unknown as InternalStateLocal).searchResults || [];
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
        cursor: 0,
      });
    }

    if ((arrowDown || (tab && state.dropdown)) && cursor === null) {
      return setState({
        cursor: 0,
      });
    }

    if (arrowUp || arrowDown || (shiftTab && state.dropdown) || (tab && state.dropdown)) {
      (event as unknown as { preventDefault?: () => void }).preventDefault &&
        (event as unknown as { preventDefault?: () => void }).preventDefault();
    }

    if (escape) {
      this.dropDown('close');
    }

    if (enter) {
      const currentItem = searchResults[cursor as number];
      if (currentItem && !(currentItem as unknown as { disabled?: boolean }).disabled) {
        if (props.create && valueExistInSelected(state.search, state.values, props)) {
          return null;
        }

        methods.addItem(currentItem);
      }
    }

    if ((arrowDown || (tab && state.dropdown)) && searchResults.length === (cursor as number)) {
      return setState({
        cursor: 0,
      });
    }

    if (arrowDown || (tab && state.dropdown)) {
      setState((prevState: InternalState<T>) => ({
        cursor: (prevState.cursor as number) + 1,
      }));
    }

    if ((arrowUp || (shiftTab && state.dropdown)) && (cursor as number) > 0) {
      setState((prevState: InternalState<T>) => ({
        cursor: (prevState.cursor as number) - 1,
      }));
    }

    if ((arrowUp || (shiftTab && state.dropdown)) && cursor === 0) {
      setState({
        cursor: searchResults.length,
      });
    }

    if (backspace && props.backspaceDelete && this.getInputSize() === 0) {
      this.setState({
        values: this.state.values.slice(0, -1),
      });
    }
  };

  renderDropdown = () =>
    this.props.portal ? (
      ReactDOM.createPortal(
        <Dropdown props={this.props} state={this.state} methods={this.methods} />,
        this.dropdownRoot as Element,
      )
    ) : (
      <Dropdown props={this.props} state={this.state} methods={this.methods} />
    );

  createNew = (item: string) => {
    const newValue = {
      [this.props.labelField]: item,
      [this.props.valueField]: item,
    } as unknown as T;

    this.addItem(newValue);
    this.props.onCreateNew && this.props.onCreateNew(newValue);
    this.setState({ search: '' });
  };

  render() {
    return (
      <ClickOutside onClickOutside={(event?: Event) => this.dropDown('close', event)}>
        <ReactDropdownSelect
          onKeyDown={this.handleKeyDown}
          aria-label="Dropdown select"
          aria-expanded={this.state.dropdown}
          onClick={(event: React.MouseEvent<HTMLDivElement>) => this.dropDown('open', event)}
          tabIndex={this.props.disabled ? '-1' : '0'}
          direction={this.props.direction}
          style={this.props.style}
          ref={this.select}
          disabled={this.props.disabled}
          className={`${LIB_NAME} ${this.props.className}`}
          color={this.props.color}
          {...this.props.additionalProps}
        >
          <Content props={this.props} state={this.state} methods={this.methods} />

          {(this.props.name || this.props.required) && (
            <input
              tabIndex={-1}
              style={{ opacity: 0, width: 0, position: 'absolute' }}
              name={this.props.name}
              required={this.props.required}
              pattern={this.props.pattern}
              defaultValue={
                this.state.values
                  .map(
                    (value: T) =>
                      (value as unknown as Record<string, unknown>)[
                        this.props.labelField
                      ] as unknown,
                  )
                  .toString() || []
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
              onClick={() => this.select.current && this.select.current.focus()}
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

interface ReactDropdownSelectProps {
  direction?: 'ltr' | 'rtl';
  disabled?: boolean;
  color?: string;
}

const ReactDropdownSelect = styled.div<ReactDropdownSelectProps>`
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
