"use strict";var _propTypes=_interopRequireDefault(require("prop-types"));exports.__esModule=!0,exports.default=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var SelectPropsModel=Object.freeze({/**
   * Secondary placeholder on search field if any value selected
   */addPlaceholder:_propTypes.default.string,/**
   * Additional props to pass to Select
   */additionalProps:_propTypes.default.object,/**
   * If true, and searchable, dropdown will autofocus
   */autoFocus:_propTypes.default.bool,/**
   * If true, backspace key will delete last value
   */backspaceDelete:_propTypes.default.bool,/**
   * CSS class attribute to pass to select
   */className:_propTypes.default.string,/**
   * Label for "Clear all"
   */clearAllLabel:_propTypes.default.string,/**
   * If true, and searchable, search value will be cleared on blur
   */clearOnBlur:_propTypes.default.bool,/**
   * If true, and searchable, search value will be cleared upon value select/de-select
   */clearOnSelect:_propTypes.default.bool,/**
   * Overrides internal clear button
   */clearRenderer:_propTypes.default.func,/**
   * Clear all indicator
   */clearable:_propTypes.default.bool,/**
   * If true, scrolling the page will close the dropdown
   */closeOnScroll:_propTypes.default.bool,/**
   * If true, selecting option will close the dropdown
   */closeOnSelect:_propTypes.default.bool,/**
   * If true, clicking input will close the dropdown if you are not searching.
   */closeOnClickInput:_propTypes.default.bool,/**
   * Base color (any CSS compatible) to use in component, also can be overwritten via CSS
   */color:_propTypes.default.string,/**
   * Compare values override function
   */compareValuesFunc:_propTypes.default.func,/**
   * Overrides internal content component (the contents of the select component)
   * | <a href="https://sanusart.github.io/react-dropdown-select/prop/content-renderer">example</a>
   */contentRenderer:_propTypes.default.func,/**
   * If true, select will create value from search string and fire onCreateNew callback prop
   */create:_propTypes.default.bool,/**
   * If create set to true, this will be the label of the "add new" component. {search} will be replaced by search value
   */createNewLabel:_propTypes.default.string,/**
   * Debounce Delay for updates upon component interactions
   */debounceDelay:_propTypes.default.number,/**
   * Direction of a dropdown "ltr", "rtl" or "auto"
   */direction:_propTypes.default.string,/**
   * Disable select and all interactions
   */disabled:_propTypes.default.bool,/**
   * Label shown on disabled field (after) the text
   */disabledLabel:_propTypes.default.string,/**
   * Gap between select element and dropdown
   */dropdownGap:_propTypes.default.number,/**
   * Show or hide dropdown handle to open/close dropdown
   */dropdownHandle:_propTypes.default.bool,/**
   * Overrides internal dropdown handle
   */dropdownHandleRenderer:_propTypes.default.func,/**
   * Minimum height of a dropdown
   */dropdownHeight:_propTypes.default.string,/**
   * Available options are "auto", "top" and "bottom" defaults to "bottom". Auto will adjust itself according Select's position on the page
   * | <a href="https://sanusart.github.io/react-dropdown-select/prop/dropdown-position">example</a>
   */dropdownPosition:_propTypes.default.oneOf(["top","bottom","auto"]),/**
   * Overrides internal dropdown handle
   */dropdownRenderer:_propTypes.default.func,/**
   * Overrides internal keyDown function
   */handleKeyDownFn:_propTypes.default.func,/**
   * Overrides internal input text
   */inputRenderer:_propTypes.default.func,/**
   * Overrides internal item in a dropdown
   */itemRenderer:_propTypes.default.func,/**
   * If true, dropdown will always stay open (good for debugging)
   */keepOpen:_propTypes.default.bool,/**
   * If false, selected item will not appear in a list
   */keepSelectedInList:_propTypes.default.bool,/**
   * Field in data to use for label
   */labelField:_propTypes.default.string,/**
   * Loading indicator
   */loading:_propTypes.default.bool,/**
   * Overrides internal loading
   */loadingRenderer:_propTypes.default.func,/**
   * If true - will act as multi-select, if false - only one option will be selected at the time
   */multi:_propTypes.default.bool,/**
   * If set, input type hidden would be added in the component with the value of the `name` prop as `name` and select's `values` as `value`
   * Useful for HTML forms
   */name:_propTypes.default.string,/**
   * Label for "No data"
   */noDataLabel:_propTypes.default.string,/**
   * Overrides internal "no data" (shown where search has no results)
   */noDataRenderer:_propTypes.default.func,/**
   * onChange callback handler
   */onChange:_propTypes.default.func.isRequired,/**
   * Fires upon clearing all values (via custom renderers)
   */onClearAll:_propTypes.default.func,/**
   * Fires upon creation of new item if create prop set to true
   */onCreateNew:_propTypes.default.func,/**
   * Fires upon dropdown close
   */onDropdownClose:_propTypes.default.func,/**
   * Fires upon dropdown closing state, stops the closing and provides own method close()
   * @return undefined
   */onDropdownCloseRequest:_propTypes.default.func,/**
   * Fires upon dropdown open
   */onDropdownOpen:_propTypes.default.func,/**
   * Fires upon selecting all values (via custom renderers)
   */onSelectAll:_propTypes.default.func,/**
   * Overrides internal option (the pillow with an "x") on the select content
   */optionRenderer:_propTypes.default.func,/**
   * Available options, (option with key disabled: true will be disabled)
   */options:_propTypes.default.array.isRequired,/**
   * If set, input type hidden would be added in the component with pattern prop as regex
   */pattern:_propTypes.default.string,/**
   * Placeholder shown where there are no selected values
   */placeholder:_propTypes.default.string,/**
   * If valid DOM element specified - dropdown will break out to render inside the specified element
   */portal:_propTypes.default.element,/**
   * If set, input type hidden would be added in the component with required prop as true/false
   */required:_propTypes.default.bool,/**
   * Search by object property in values
   */searchBy:_propTypes.default.string,/**
   * Overrides internal search function
   */searchFn:_propTypes.default.func,/**
   * If true, select will have search input text
   */searchable:_propTypes.default.bool,/**
   * Allow to select all (if select is multi-select)
   */selectAll:_propTypes.default.bool,/**
   * Label for "Select all"
   */selectAllLabel:_propTypes.default.string,/**
   * Separator line between close all and dropdown handle
   */separator:_propTypes.default.bool,/**
   * Overrides internal separator
   */separatorRenderer:_propTypes.default.func,/**
   * Sort by object property in values
   */sortBy:_propTypes.default.string,/**
   * Style object to pass to select
   */style:_propTypes.default.object,/**
   * Field in data to use for value
   */valueField:_propTypes.default.string,/**
   * Selected values
   */values:_propTypes.default.array,/**
    * If true, dropdown will be open by default
    */defaultMenuIsOpen:_propTypes.default.bool}),_default=SelectPropsModel;exports.default=_default;