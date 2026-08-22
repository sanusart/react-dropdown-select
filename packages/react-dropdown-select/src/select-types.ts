import {
  CSSProperties,
  HTMLAttributes,
  KeyboardEvent,
  MouseEvent,
  RefObject,
  ChangeEvent,
} from 'react';

export interface SelectState<T> {
  /**
   * Whether the dropdown is currently open.
   */
  dropdown: boolean;
  /**
   * Currently selected value objects.
   */
  values: T[];
  /**
   * Current search text.
   */
  search: string;
  /**
   * `getBoundingClientRect()` result for the select element.
   */
  selectBounds: DOMRect | Record<string, never>;
  /**
   * Keyboard cursor position within the dropdown list.
   */
  cursor: number | null;
  /**
   * Options filtered by the current search.
   */
  searchResults: T[];
  /**
   * The option currently highlighted by the keyboard cursor.
   */
  activeCursorItem?: any;
}

export interface SelectMethods<T> {
  /**
   * Sets the option highlighted by the keyboard cursor.
   */
  activeCursorItem: (item: any) => void;
  /**
   * Adds an item to the selection (toggles it in multi mode).
   */
  addItem: (item: T) => void;
  /**
   * Returns true when every non-disabled option is selected.
   */
  areAllSelected: () => boolean;
  /**
   * Clears all selected values.
   */
  clearAll: () => void;
  /**
   * Creates a new option from the search text. Requires `create: true`.
   */
  createNew: (item: string) => void;
  /**
   * Opens ("open"), closes ("close") or toggles ("toggle") the dropdown.
   */
  dropDown: (
    action: string,
    event?: React.MouseEvent | React.KeyboardEvent | null,
    force?: boolean,
  ) => void | false;
  /**
   * Current length of the search input text.
   */
  getInputSize: () => number;
  /**
   * Bounding rectangle of the select element.
   */
  getSelectBounds: () => DOMRect | Record<string, never>;
  /**
   * The select's root DOM element.
   */
  getSelectRef: () => HTMLDivElement | null;
  /**
   * Processes a keyboard event.
   */
  handleKeyDown: (event: KeyboardEvent) => void;
  /**
   * Returns true when the given item is selected.
   */
  isSelected: (item: T) => boolean;
  /**
   * Removes an item from the selection.
   */
  removeItem: (event: MouseEvent<HTMLElement> | null, item: T, close?: boolean) => void;
  /**
   * Escapes regex special characters in a string.
   */
  safeString: (input: string) => string;
  /**
   * Options filtered by the current search.
   */
  searchResults: () => T[];
  /**
   * Selects all options, or a specific list of values.
   */
  selectAll: (valuesList?: T[]) => void;
  /**
   * Updates the search text from an input event.
   */
  setSearch: (event: ChangeEvent<HTMLInputElement>) => void;
  /**
   * Options sorted by the `sortBy` field.
   */
  sortBy: () => T[];
  /**
   * Selects all options or clears the selection, depending on the current state.
   */
  toggleSelectAll: () => void;
}

export interface SelectProps<T> {
  /**
   * Backspace removes the last selected value when the search input is empty.
   * @default true
   * @category configuration
   */
  backspaceDelete?: boolean;
  /**
   * CSS class applied to the root element.
   * @default ''
   * @category display
   */
  className?: string;
  /**
   * Secondary placeholder shown on the search input when values are already selected.
   * @default ''
   * @category display
   */
  addPlaceholder?: string;
  /**
   * Placeholder text shown when nothing is selected.
   * @default 'Select...'
   * @category display
   */
  placeholder?: string;
  /**
   * Shows a loading indicator instead of the handle.
   * @default false
   * @category configuration
   */
  loading?: boolean;
  /**
   * Style object applied to the root element.
   * @category display
   */
  style?: CSSProperties;
  /**
   * Nonce for the injected `<style>` tag, to satisfy a strict Content Security Policy.
   * @category display
   */
  styleNonce?: string;
  /**
   * Controlled selected values.
   * @default []
   * @category configuration
   */
  values?: T[];
  /**
   * Available options. Items with `disabled: true` are disabled.
   * @default []
   * @category configuration
   */
  options?: T[];
  /**
   * Enables multi-select mode.
   * @default false
   * @category configuration
   */
  multi?: boolean;
  /**
   * Disables all interactions.
   * @default false
   * @category configuration
   */
  disabled?: boolean;
  /**
   * Field to search by. Supports dot notation.
   * @default 'label'
   * @category behavior
   */
  searchBy?: string;
  /**
   * Field to sort options by. Supports dot notation.
   * @default null
   * @category behavior
   */
  sortBy?: string | null;
  /**
   * Shows a clear-all button.
   * @default false
   * @category configuration
   */
  clearable?: boolean;
  /**
   * Shows the search input.
   * @default true
   * @category configuration
   */
  searchable?: boolean;
  /**
   * Shows the dropdown open/close chevron handle.
   * @default true
   * @category configuration
   */
  dropdownHandle?: boolean;
  /**
   * Shows a vertical separator line before the handle.
   * @default false
   * @category configuration
   */
  separator?: boolean;
  /**
   * Forces the dropdown to stay open (useful for debugging).
   * @default false
   * @category configuration
   */
  keepOpen?: boolean;
  /**
   * Text displayed when there are no search results.
   * @default 'No data'
   * @category display
   */
  noDataLabel?: string;
  /**
   * Label for the "add new" button. `{search}` is replaced with the input value.
   * @default 'add {search}'
   * @category display
   */
  createNewLabel?: string;
  /**
   * Label suffix for disabled items.
   * @default 'disabled'
   * @category display
   */
  disabledLabel?: string;
  /**
   * Gap in pixels between the select and the dropdown.
   * @default 5
   * @category display
   */
  dropdownGap?: number;
  /**
   * Closes the dropdown when the page scrolls.
   * @default false
   * @category behavior
   */
  closeOnScroll?: boolean;
  /**
   * Debounce delay in ms for resize/scroll handlers.
   * @default 0
   * @category behavior
   */
  debounceDelay?: number;
  /**
   * Field name used for the display label. Supports dot notation.
   * @default 'label'
   * @category behavior
   */
  labelField?: string;
  /**
   * Field name used for the value. Supports dot notation.
   * @default 'value'
   * @category behavior
   */
  valueField?: string;
  /**
   * Base accent color. Accepts any CSS color value.
   * @default '#0074D9'
   * @category display
   */
  color?: string;
  /**
   * Shows selected items in the dropdown list.
   * @default true
   * @category configuration
   */
  keepSelectedInList?: boolean;
  /**
   * Closes the dropdown after selecting an item.
   * @default false
   * @category behavior
   */
  closeOnSelect?: boolean;
  /**
   * Closes the dropdown when clicking the input area while not searching.
   * @default false
   * @category behavior
   */
  closeOnClickInput?: boolean;
  /**
   * Clears the search text when the input loses focus.
   * @default true
   * @category behavior
   */
  clearOnBlur?: boolean;
  /**
   * Clears the search text on item select/deselect.
   * @default true
   * @category behavior
   */
  clearOnSelect?: boolean;
  /**
   * Dropdown position. `auto` adjusts based on available viewport space.
   * @default 'bottom'
   * @category behavior
   */
  dropdownPosition?: 'top' | 'bottom' | 'auto';
  /**
   * Maximum height of the dropdown list.
   * @default '300px'
   * @category display
   */
  dropdownHeight?: string;
  /**
   * Auto-focuses the search input on mount.
   * @default false
   * @category configuration
   */
  autoFocus?: boolean;
  /**
   * Renders the dropdown inside the given DOM element (e.g. `document.body`).
   * @category configuration
   */
  portal?: HTMLElement;
  /**
   * Allows creating new entries from the search text.
   * @default false
   * @category configuration
   */
  create?: boolean;
  /**
   * Text direction for RTL language support.
   * @default 'ltr'
   * @category display
   */
  direction?: 'ltr' | 'rtl';
  /**
   * Hidden input name for form integration.
   * @default null
   * @category behavior
   */
  name?: string | null;
  /**
   * Adds a hidden input with the required attribute for form validation.
   * @default false
   * @category configuration
   */
  required?: boolean;
  /**
   * Hidden input pattern (regex) for form validation.
   * @category behavior
   */
  pattern?: string;
  /**
   * Opens the dropdown by default on mount.
   * @default false
   * @category configuration
   */
  defaultMenuIsOpen?: boolean;
  /**
   * Fires on any values change and receives the new array of value objects.
   * @default () => undefined
   * @category callback
   */
  onChange?: (value: T[]) => void;
  /**
   * Fires on user-triggered value add.
   * @default () => undefined
   * @category callback
   */
  onSelect?: (value: T[]) => void;
  /**
   * Fires on user-triggered value remove.
   * @default () => undefined
   * @category callback
   */
  onDeselect?: (value: T[]) => void;
  /**
   * Fires when the dropdown opens.
   * @default () => undefined
   * @category callback
   */
  onDropdownOpen?: () => void;
  /**
   * Fires when the dropdown closes.
   * @default () => undefined
   * @category callback
   */
  onDropdownClose?: () => void;
  /**
   * Fires when all values are cleared.
   * @default () => undefined
   * @category callback
   */
  onClearAll?: () => void;
  /**
   * Label for the clear-all button.
   * @default 'Clear all'
   * @category display
   */
  clearAllLabel?: string;
  /**
   * Fires when all values are selected.
   * @default () => undefined
   * @category callback
   */
  onSelectAll?: () => void;
  /**
   * Fires when a new entry is created. Requires `create: true`.
   * @default () => undefined
   * @category callback
   */
  onCreateNew?: (item: T) => void;
  /**
   * Intercepts the dropdown close. Call `close()` to actually close. Useful for animations.
   * @category callback
   */
  onDropdownCloseRequest?: (args: {
    props: SelectProps<T>;
    state: SelectState<T>;
    methods: SelectMethods<T>;
    close: () => void;
  }) => void;
  /**
   * Overrides the default search logic. Must return the filtered array.
   * @default () => undefined
   * @category override
   */
  searchFn?: (args: RendererArgs<T>) => T[];
  /**
   * Overrides keyboard event handling.
   * @default () => undefined
   * @category override
   */
  handleKeyDownFn?: (args: HandleKeyDownArgs<T>) => void;
  /**
   * Replaces the clear button.
   * @category renderer
   * @receives { props, state, methods }
   * @replaces Clear button
   */
  clearRenderer?: (args: RendererArgs<T>) => JSX.Element | null;
  /**
   * Replaces the entire content area (selected values + input).
   * @category renderer
   * @receives { props, state, methods }
   * @replaces Entire content area (selected values + input)
   */
  contentRenderer?: (args: RendererArgs<T>) => JSX.Element | null;
  /**
   * Replaces the entire dropdown container.
   * @category renderer
   * @receives { props, state, methods }
   * @replaces Entire dropdown container
   */
  dropdownRenderer?: (args: RendererArgs<T>) => JSX.Element | null;
  /**
   * Replaces the dropdown arrow handle.
   * @category renderer
   * @receives { props, state, methods }
   * @replaces Dropdown arrow handle
   */
  dropdownHandleRenderer?: (args: RendererArgs<T>) => JSX.Element | null;
  /**
   * Replaces the search input element.
   * @category renderer
   * @receives { props, state, methods, inputRef }
   * @replaces Search input element
   */
  inputRenderer?: (args: InputRendererArgs<T>) => JSX.Element | null;
  /**
   * Replaces individual dropdown list items.
   * @category renderer
   * @receives { item, itemIndex, props, state, methods }
   * @replaces Individual dropdown list item
   */
  itemRenderer?: (args: ItemRendererArgs<T>) => JSX.Element | null;
  /**
   * Replaces the loading indicator.
   * @category renderer
   * @receives { props }
   * @replaces Loading indicator
   */
  loadingRenderer?: (args: { props: SelectProps<T> }) => JSX.Element | null;
  /**
   * Replaces the "No data" message.
   * @category renderer
   * @receives { props, state, methods }
   * @replaces "No data" message
   */
  noDataRenderer?: (args: RendererArgs<T>) => JSX.Element | null;
  /**
   * Replaces selected value pills/tags.
   * @category renderer
   * @receives { item, props, state, methods }
   * @replaces Selected value pill/tag
   */
  optionRenderer?: (args: ItemRendererArgs<T>) => JSX.Element | null;
  /**
   * Replaces the separator line.
   * @category renderer
   * @receives { props, state, methods }
   * @replaces Separator line
   */
  separatorRenderer?: (args: RendererArgs<T>) => JSX.Element | null;
  /**
   * Additional HTML attributes passed to the root element.
   * @category behavior
   */
  additionalProps?: HTMLAttributes<HTMLDivElement>;
  /**
   * CSS class applied to the wrapper element.
   * @category display
   */
  wrapperClassName?: string;
  /**
   * Shows select-all / clear-all buttons in the dropdown (multi mode only).
   * @default false
   * @category configuration
   */
  selectAll?: boolean;
  /**
   * Label for the select-all button.
   * @default 'Select all'
   * @category display
   */
  selectAllLabel?: string;
  /**
   * Custom comparison function for controlled mode value syncing.
   * @category behavior
   */
  compareValuesFunc?: (a: T[], b: T[]) => boolean;
}

export interface RendererArgs<T> {
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
}

export interface InputRendererArgs<T> extends RendererArgs<T> {
  inputRef: RefObject<HTMLInputElement>;
}

export interface ItemRendererArgs<T> {
  item: T;
  itemIndex?: number;
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
}

export interface HandleKeyDownArgs<T> {
  event: KeyboardEvent;
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
  setState: React.Dispatch<React.SetStateAction<any>>;
}

export interface ClickOutsideProps {
  onClickOutside: (event: React.MouseEvent | MouseEvent) => void;
  children: React.ReactNode;
  className?: string;
}

export interface ComponentRendererArgs<T> {
  props: SelectProps<T>;
  state: SelectState<T>;
  methods: SelectMethods<T>;
}
