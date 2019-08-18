import React from 'react';

export interface IState {
  dropdown: boolean;
  values: object;
  search: string;
  selectBounds: object;
  cursor: null;
}

export interface IMethods {
  removeItem: () => void;
  dropDown: () => void;
  addItem: () => void;
  setSearch: () => void;
  getInputSize: () => void;
  toggleSelectAll: () => void;
  clearAll: () => void;
  selectAll: () => void;
  searchResults: () => void;
  getSelectRef: () => void;
  isSelected: () => void;
  getSelectBounds: () => void;
  areAllSelected: () => void;
  handleKeyDown: () => void;
  activeCursorItem: () => void;
  createNew: () => void;
  sortBy: () => void;
  safeString: () => void;
}

export interface ISelectProps {
  addPlaceholder: '';
  placeholder: 'Select...';
  values: [];
  options: [];
  multi: false;
  disabled: false;
  searchBy: 'label';
  sortBy: null;
  clearable: false;
  searchable: true;
  dropdownHandle: true;
  separator: false;
  keepOpen: undefined;
  noDataLabel: 'No data';
  createNewLabel: 'add {search}';
  disabledLabel: 'disabled';
  dropdownGap: 5;
  closeOnScroll: false;
  debounceDelay: 0;
  labelField: 'label';
  valueField: 'value';
  color: '#0074D9';
  keepSelectedInList: true;
  closeOnSelect: false;
  clearOnBlur: true;
  clearOnSelect: true;
  dropdownPosition: 'bottom';
  dropdownHeight: '300px';
  autoFocus: false;
  portal: null;
  create: false;
  direction: 'ltr';
  name: null;
  onChange: () => void;
  onDropdownOpen: () => void;
  onDropdownClose: () => void;
  onClearAll: () => void;
  onSelectAll: () => void;
  onCreateNew: () => void;
  searchFn: () => void;
  clearRenderer: ({ props: ISelectProps, state: IState, methods: IMethods }) => void;
  contentRenderer: ({ props: ISelectProps, state: IState, methods: IMethods }) => void;
  dropdownRenderer: ({ props: ISelectProps, state: IState, methods: IMethods }) => void;
  dropdownHandleRenderer: ({ props: ISelectProps, state: IState, methods: IMethods }) => void;
  inputRenderer: ({ props: ISelectProps, state: IState, methods: IMethods, inputRef: any }) => void;
  itemRenderer: ({
    item: number,
    itemIndex: number,
    props: ISelectProps,
    state: IState,
    methods: IMethods
  }) => void;
  loadingRenderer: ({ props: ISelectProps }) => void;
  noDataRenderer: ({ props: ISelectProps, state: IState, methods: IMethods }) => void;
  optionRenderer: ({ item, props: ISelectProps, state: IState, methods: IMethods }) => void;
  separatorRenderer: ({ props: ISelectProps, state: IState, methods: IMethods }) => void;
}

declare const Select: React.SFC<ISelectProps>;

export default Select;
