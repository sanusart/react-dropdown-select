import PropTypes from 'prop-types';

const SelectPropsModel = Object.freeze({
  /**
   * Secondary placeholder on search field if any value selected
   */
  addPlaceholder: PropTypes.string,
  /**
   * Additional props to pass to Select
   */
  additionalProps: PropTypes.object,
  /**
   * If true, and searchable, dropdown will autofocus
   */
  autoFocus: PropTypes.bool,
  /**
   * If true, backspace key will delete last value
   */
  backspaceDelete: PropTypes.bool,
  /**
   * CSS class attribute to pass to select
   */
  className: PropTypes.string,
  /**
   * Label for "Clear all"
   */
  clearAllLabel: PropTypes.string,
  /**
   * If true, and searchable, search value will be cleared on blur
   */
  clearOnBlur: PropTypes.bool,
  /**
   * If true, and searchable, search value will be cleared upon value select/de-select
   */
  clearOnSelect: PropTypes.bool,
  /**
   * Overrides internal clear button
   */
  clearRenderer: PropTypes.func,
  /**
   * Clear all indicator
   */
  clearable: PropTypes.bool,
  /**
   * If true, scrolling the page will close the dropdown
   */
  closeOnScroll: PropTypes.bool,
  /**
   * If true, selecting option will close the dropdown
   */
  closeOnSelect: PropTypes.bool,
  /**
   * If true, clicking input will close the dropdown if you are not searching.
   */
  closeOnClickInput: PropTypes.bool,
  /**
   * Base color (any CSS compatible) to use in component, also can be overwritten via CSS
   */
  color: PropTypes.string,
  /**
   * Compare values override function
   */
  compareValuesFunc: PropTypes.func,
  /**
   * Overrides internal content component (the contents of the select component)
   * | <a href="https://sanusart.github.io/react-dropdown-select/prop/content-renderer">example</a>
   */
  contentRenderer: PropTypes.func,
  /**
   * If true, select will create value from search string and fire onCreateNew callback prop
   */
  create: PropTypes.bool,
  /**
   * If create set to true, this will be the label of the "add new" component. {search} will be replaced by search value
   */
  createNewLabel: PropTypes.string,
  /**
   * Debounce Delay for updates upon component interactions
   */
  debounceDelay: PropTypes.number,
  /**
   * Direction of a dropdown "ltr", "rtl" or "auto"
   */
  direction: PropTypes.string,
  /**
   * Disable select and all interactions
   */
  disabled: PropTypes.bool,
  /**
   * Label shown on disabled field (after) the text
   */
  disabledLabel: PropTypes.string,
  /**
   * Gap between select element and dropdown
   */
  dropdownGap: PropTypes.number,
  /**
   * Show or hide dropdown handle to open/close dropdown
   */
  dropdownHandle: PropTypes.bool,
  /**
   * Overrides internal dropdown handle
   */
  dropdownHandleRenderer: PropTypes.func,
  /**
   * Minimum height of a dropdown
   */
  dropdownHeight: PropTypes.string,
  /**
   * Available options are "auto", "top" and "bottom" defaults to "bottom". Auto will adjust itself according Select's position on the page
   * | <a href="https://sanusart.github.io/react-dropdown-select/prop/dropdown-position">example</a>
   */
  dropdownPosition: PropTypes.oneOf(['top', 'bottom', 'auto']),
  /**
   * Overrides internal dropdown handle
   */
  dropdownRenderer: PropTypes.func,
  /**
   * Overrides internal keyDown function
   */
  handleKeyDownFn: PropTypes.func,
  /**
   * Overrides internal input text
   */
  inputRenderer: PropTypes.func,
  /**
   * Overrides internal item in a dropdown
   */
  itemRenderer: PropTypes.func,
  /**
   * If true, dropdown will always stay open (good for debugging)
   */
  keepOpen: PropTypes.bool,
  /**
   * If false, selected item will not appear in a list
   */
  keepSelectedInList: PropTypes.bool,
  /**
   * Field in data to use for label
   */
  labelField: PropTypes.string,
  /**
   * Loading indicator
   */
  loading: PropTypes.bool,
  /**
   * Overrides internal loading
   */
  loadingRenderer: PropTypes.func,
  /**
   * If true - will act as multi-select, if false - only one option will be selected at the time
   */
  multi: PropTypes.bool,
  /**
   * If set, input type hidden would be added in the component with the value of the `name` prop as `name` and select's `values` as `value`
   * Useful for HTML forms
   */
  name: PropTypes.string,
  /**
   * Label for "No data"
   */
  noDataLabel: PropTypes.string,
  /**
   * Overrides internal "no data" (shown where search has no results)
   */
  noDataRenderer: PropTypes.func,
  /**
   * onChange callback handler
   */
  onChange: PropTypes.func.isRequired,
  /**
   * Fires upon clearing all values (via custom renderers)
   */
  onClearAll: PropTypes.func,
  /**
   * Fires upon creation of new item if create prop set to true
   */
  onCreateNew: PropTypes.func,
  /**
   * Fires upon dropdown close
   */
  onDropdownClose: PropTypes.func,
  /**
   * Fires upon dropdown closing state, stops the closing and provides own method close()
   * @return undefined
   */
  onDropdownCloseRequest: PropTypes.func,
  /**
   * Fires upon dropdown open
   */
  onDropdownOpen: PropTypes.func,
  /**
   * Fires upon selecting all values (via custom renderers)
   */
  onSelectAll: PropTypes.func,
  /**
   * Overrides internal option (the pillow with an "x") on the select content
   */
  optionRenderer: PropTypes.func,
  /**
   * Available options, (option with key disabled: true will be disabled)
   */
  options: PropTypes.array.isRequired,
  /**
   * If set, input type hidden would be added in the component with pattern prop as regex
   */
  pattern: PropTypes.string,
  /**
   * Placeholder shown where there are no selected values
   */
  placeholder: PropTypes.string,
  /**
   * If valid DOM element specified - dropdown will break out to render inside the specified element
   */
  portal: PropTypes.element,
  /**
   * If set, input type hidden would be added in the component with required prop as true/false
   */
  required: PropTypes.bool,
  /**
   * Search by object property in values
   */
  searchBy: PropTypes.string,
  /**
   * Overrides internal search function
   */
  searchFn: PropTypes.func,
  /**
   * If true, select will have search input text
   */
  searchable: PropTypes.bool,
  /**
   * Allow to select all (if select is multi-select)
   */
  selectAll: PropTypes.bool,
  /**
   * Label for "Select all"
   */
  selectAllLabel: PropTypes.string,
  /**
   * Separator line between close all and dropdown handle
   */
  separator: PropTypes.bool,
  /**
   * Overrides internal separator
   */
  separatorRenderer: PropTypes.func,
  /**
   * Sort by object property in values
   */
  sortBy: PropTypes.string,
  /**
   * Style object to pass to select
   */
  style: PropTypes.object,
  /**
   * Field in data to use for value
   */
  valueField: PropTypes.string,
  /**
   * Selected values
   */
  values: PropTypes.array,
   /**
    * If true, dropdown will be open by default
    */
  defaultMenuIsOpen: PropTypes.bool,
});

export default SelectPropsModel;
