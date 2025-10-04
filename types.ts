import {
  ChangeEvent,
  CSSProperties,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  RefObject,
} from 'react';

export interface SetStateFnArgs<T> {
  dropdown?: boolean;
  values?: T[];
  search?: string;
  selectBounds?: DOMRect | NonNullable<unknown>;
  cursor?: number | null;
  activeCursorItem?: unknown;
}

export interface SelectState<T> {
  dropdown: boolean;
  values: T[];
  search: string;
  selectBounds: DOMRect | NonNullable<unknown>;
  cursor: number | null;
}

export interface SelectMethods<T> {
  removeItem: (event: MouseEvent<HTMLElement> | null, item: T, close?: boolean) => void;
  dropDown: (action: string, event?: MouseEvent | KeyboardEvent, force?: boolean) => void;
  addItem: (item: T) => void;
  setSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  getInputSize: () => number;
  toggleSelectAll: () => void;
  clearAll: () => void;
  selectAll: (items?: T[]) => void;
  searchResults: () => T[];
  getSelectRef: () => HTMLDivElement | null;
  isSelected: (item: T) => boolean;
  getSelectBounds: () => NonNullable<unknown> | DOMRect;
  areAllSelected: () => boolean;
  handleKeyDown: (event: KeyboardEvent) => void;
  activeCursorItem: (activeCursorItem: unknown) => void;
  createNew: (searchText: string) => void;
  sortBy: () => T[];
  safeString: (input: string) => string;
}

// Minimal reusable shapes to avoid duplication across renderer / item renderer / keydown signatures
export type SelectPropsStateMethodsType<T> = {
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
};

export type SetStateSetter<T> =
  | ((args: SetStateFnArgs<T>) => SetStateFnArgs<T>)
  | SetStateFnArgs<T>;

export interface SelectOnDropdownCloseRequest<T> {
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
  close: () => void;
}

export interface SelectKeyDown<T> {
  event: KeyboardEvent;
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
  setState: (setter: SetStateSetter<T>) => void;
}

export type SelectItemRenderer<T> = SelectPropsStateMethodsType<T> & {
  item: T;
  itemIndex?: number;
};

// Generic renderer function types to reduce repeated function signatures in SelectProps
export type RendererFn<T, R = React.ReactNode> = (args: SelectPropsStateMethodsType<T>) => R;
export type ItemRendererFn<T, R = React.ReactNode> = (args: SelectItemRenderer<T>) => R;
export type InputRendererFn<T, R = React.ReactNode> = (
  args: SelectPropsStateMethodsType<T> & { inputRef: RefObject<HTMLInputElement> },
) => R;

export interface SelectProps<T> {
  backspaceDelete?: boolean;
  className?: string;
  addPlaceholder?: string;
  placeholder?: string;
  loading?: boolean;
  compareValuesFunc: (a: Record<string, unknown>, b: Record<string, unknown>) => boolean;
  style?: CSSProperties;
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
  keepOpen?: boolean;
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
  closeOnClickInput?: boolean;
  clearOnBlur?: boolean;
  clearOnSelect?: boolean;
  dropdownPosition?: 'top' | 'bottom' | 'auto';
  dropdownHeight?: string;
  autoFocus?: boolean;
  portal?: HTMLElement;
  create?: boolean;
  direction?: 'ltr' | 'rtl';
  name?: string;
  required?: boolean;
  pattern?: string;
  defaultMenuIsOpen?: boolean;
  onChange: (value: T[]) => void;
  onSelect?: (value: T[]) => void;
  onDeselect?: (value: T[]) => void;
  onDropdownOpen?: () => void;
  onDropdownClose?: () => void;
  onClearAll?: () => void;
  clearAllLabel?: string;
  onSelectAll?: () => void;
  onCreateNew?: (item: T) => void;
  onDropdownCloseRequest?: ({
    props,
    state,
    methods,
    close,
  }: SelectOnDropdownCloseRequest<T>) => T[];

  // Reused renderer / handler types
  searchFn?: (args: SelectPropsStateMethodsType<T>) => T[];
  handleKeyDownFn?: (args: SelectKeyDown<T>) => void;
  clearRenderer?: RendererFn<T>;
  contentRenderer?: RendererFn<T>;
  dropdownRenderer?: RendererFn<T>;
  dropdownHandleRenderer?: RendererFn<T>;
  inputRenderer?: InputRendererFn<T>;
  itemRenderer?: ItemRendererFn<T>;
  loadingRenderer?: ItemRendererFn<T>;
  noDataRenderer?: RendererFn<T>;
  optionRenderer?: ItemRendererFn<T>;
  separatorRenderer?: RendererFn<T>;

  additionalProps?: HTMLAttributes<HTMLDivElement>;
  wrapperClassName?: string;
  selectAll?: boolean;
  selectAllLabel?: string;
}
