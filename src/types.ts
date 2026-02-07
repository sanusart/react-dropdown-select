export interface SetStateFnArgs<T> {
  dropdown?: boolean;
  values?: T[];
  search?: string;
  selectBounds?: DOMRect | {};
  cursor?: number | null;
  activeCursorItem?: any;
}

export interface SelectState<T> {
  dropdown: boolean;
  values: T[];
  search: string;
  selectBounds: object;
  cursor: number;
  searchResults: T[];
}

export interface SelectMethods<T> {
  removeItem: (event: React.MouseEvent<HTMLElement> | null, item: T, close: boolean) => void;
  dropDown: (action: string, event?: React.MouseEvent<HTMLElement> | null) => void;
  addItem: (item: T) => void;
  setSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
  getInputSize: () => number;
  toggleSelectAll: () => void;
  clearAll: () => void;
  selectAll: (items?: T[]) => void;
  searchResults: () => T[];
  getSelectRef: () => HTMLDivElement;
  isSelected: (item: T) => boolean;
  getSelectBounds: () => {} | DOMRect;
  areAllSelected: () => boolean;
  handleKeyDown: (event: React.KeyboardEvent) => void;
  activeCursorItem: (activeCursorItem: any) => void;
  createNew: (searchText: string) => void;
  sortBy: () => T[];
  safeString: (input: string) => string;
}

export interface SelectRenderer<T> {
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
}

export interface SelectOnDropdownCloseRequest<T> {
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
  close: () => void;
}

export interface SelectKeyDown<T> {
  event: React.KeyboardEvent;
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
  setState: (setter: ((args: SetStateFnArgs<T>) => SetStateFnArgs<T>) | SetStateFnArgs<T>) => void;
}

export interface SelectItemRenderer<T> {
  item: T;
  itemIndex?: number;
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
}

export interface SelectProps<T> {
  backspaceDelete?: boolean;
  className?: string;
  addPlaceholder?: string;
  placeholder?: string;
  loading?: boolean;
  style?: React.CSSProperties;
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
    close
  }: SelectOnDropdownCloseRequest<T>) => T[];
  searchFn?: ({ props, state, methods }: SelectRenderer<T>) => T[];
  handleKeyDownFn?: ({ event, props, state, methods, setState }: SelectKeyDown<T>) => void;
  clearRenderer?: ({ props, state, methods }: SelectRenderer<T>) => React.JSX.Element;
  contentRenderer?: ({ props, state, methods }: SelectRenderer<T>) => React.JSX.Element;
  dropdownRenderer?: ({ props, state, methods }: SelectRenderer<T>) => React.JSX.Element;
  dropdownHandleRenderer?: ({ props, state, methods }: SelectRenderer<T>) => React.JSX.Element;
  inputRenderer?: ({
    props,
    state,
    methods,
    inputRef
  }: SelectRenderer<T> & {
    inputRef: React.RefObject<HTMLInputElement>;
  }) => React.JSX.Element;
  itemRenderer?: ({
    item,
    itemIndex,
    props,
    state,
    methods
  }: SelectItemRenderer<T>) => React.JSX.Element;
  loadingRenderer?: ({ props }: SelectItemRenderer<T>) => React.JSX.Element;
  noDataRenderer?: ({ props, state, methods }: SelectRenderer<T>) => React.JSX.Element;
  optionRenderer?: ({ item, props, state, methods }: SelectItemRenderer<T>) => React.JSX.Element;
  separatorRenderer?: ({ props, state, methods }: SelectRenderer<T>) => React.JSX.Element;
  additionalProps?: React.HTMLAttributes<HTMLDivElement>;
  wrapperClassName?: string;
  selectAll?: boolean;
  selectAllLabel?: string;
  compareValuesFunc?: (a: any, b: any) => boolean;
}
