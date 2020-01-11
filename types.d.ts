import { React, SyntheticEvent, KeyboardEvent } from 'react';

export interface IState {
  dropdown: boolean;
  values: object;
  search: string;
  selectBounds: object;
  cursor: number;
}

export interface IMethods {
  removeItem: (event: SyntheticEvent | null, item: IItemRenderer['item'], close: boolean) => void;
  dropDown: (action: string, event: SyntheticEvent | null) => void;
  addItem: (item: IItemRenderer['item']) => void;
  setSearch: (event: SyntheticEvent) => void;
  getInputSize: () => number;
  toggleSelectAll: () => void;
  clearAll: () => void;
  selectAll: (items?: IItemRenderer['item'][]) => void;
  searchResults: () => void;
  getSelectRef: () => React.RefObject;
  isSelected: (item: IItemRenderer['item']) => boolean;
  getSelectBounds: () => ClientRect;
  areAllSelected: () => boolean;
  handleKeyDown: (event: KeyboardEvent) => void;
  activeCursorItem: () => void;
  createNew: (item: IItemRenderer['item']) => void;
  sortBy: () => ISelectProps['options'];
  safeString: (input: string) => string;
}

export interface IRenderer<T extends object = object> {
  props?: ISelectProps<T>;
  state?: IState;
  methods?: IMethods;
}

export interface IKeyDown<T extends object = object> {
	event: KeyboardEvent;
	props?: ISelectProps<T>;
	state?: IState;
	methods?: IMethods;
	setState?: () => void;
}

export interface IItemRenderer<T extends object = object> {
  item?: T;
  itemIndex?: number;
  props?: ISelectProps<T>;
  state?: IState;
  methods?: IMethods;
}

export interface ISelectProps<T extends object = object> {
	className?: string;
  addPlaceholder?: string;
  placeholder?: string;
  values: T[];
  options: T[];
  multi?: boolean;
  disabled?: boolean;
  searchBy?: string;
  sortBy?: string;
  clearable?: boolean;
  searchable?: boolean;
  dropdownHandle?: boolean;
  separator?: boolean;
  keepOpen?: undefined;
  noDataLabel?: string;
  createNewLabel?: string;
  disabledLabel?: string;
  dropdownGap?: number;
  closeOnScroll?: boolean;
  debounceDelay?: number;
  labelField?: string;
  valueField?: string;
  color?: string;
  keepSelectedInList?: boolean;
  closeOnSelect?: boolean;
  clearOnBlur?: boolean;
  clearOnSelect?: boolean;
  dropdownPosition?: string;
  dropdownHeight?: string;
  autoFocus?: boolean;
  portal?: string;
  create?: boolean;
  direction?: 'ltr' | 'rtl';
  name?: string;
	required?: boolean,
	pattern?: string,
  onChange: (value: any) => void;
  onDropdownOpen?: () => void;
  onDropdownClose?: () => void;
  onClearAll?: () => void;
  onSelectAll?: () => void;
  onCreateNew?: () => void;
	searchFn?: ({ props, state, methods }: IRenderer<T>) => T[];
	handleKeyDownFn?: ({ event, props, state, methods, setState }: IKeyDown<T>) => void;
  clearRenderer?: ({ props, state, methods }: IRenderer<T>) => void;
  contentRenderer?: ({ props, state, methods }: IRenderer<T>) => void;
  dropdownRenderer?: ({ props, state, methods }: IRenderer<T>) => void;
  dropdownHandleRenderer?: ({ props, state, methods }: IRenderer<T>) => void;
  inputRenderer?: ({ props, state, methods }: IRenderer<T>) => void;
  itemRenderer?: ({ item, itemIndex, props, state, methods }: IItemRenderer<T>) => void;
  loadingRenderer?: ({ props }: IItemRenderer<T>) => void;
  noDataRenderer?: ({ props, state, methods }: IRenderer<T>) => void;
  optionRenderer?: ({ item, props, state, methods }: IItemRenderer<T>) => void;
  separatorRenderer?: ({ props, state, methods }: IRenderer<T>) => void;
	additionalProps?: T;
}

declare const Select: React.SFC<ISelectProps<T extends object ? T : {}>>;

export default Select;
