"use strict";var _propTypes=_interopRequireDefault(require("prop-types"));exports.__esModule=!0,exports.default=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var SelectMethodsModel=Object.freeze({activeCursorItem:_propTypes.default.func,/**
   * Add a new item
   */addItem:_propTypes.default.func.isRequired,/**
   * Check if all items are selected
   */areAllSelected:_propTypes.default.func.isRequired,/**
   * Clear all selected items
   */clearAll:_propTypes.default.func.isRequired,/**
   * Create a new item
   */createNew:_propTypes.default.func.isRequired,/**
   * Close/Toggle/Open
   */dropDown:_propTypes.default.func.isRequired,/**
   * Get the input size
   */getInputSize:_propTypes.default.func.isRequired,/**
   * Get the bounds of the select component
   */getSelectBounds:_propTypes.default.func.isRequired,/**
   * Get the reference to the select component
   */getSelectRef:_propTypes.default.func.isRequired,/**
   * Handle key down event
   */handleKeyDown:_propTypes.default.func.isRequired,/**
   * Check if an item is selected
   */isSelected:_propTypes.default.func.isRequired,/**
   * Remove an item
   */removeItem:_propTypes.default.func.isRequired,/**
   * Make a string safe
   */safeString:_propTypes.default.func.isRequired,/**
   * Get search results
   */searchResults:_propTypes.default.func.isRequired,/**
   * Select all items
   */selectAll:_propTypes.default.func.isRequired,/**
   * Set the search string
   */setSearch:_propTypes.default.func.isRequired,/**
   * Sort items
   */sortBy:_propTypes.default.func.isRequired,/**
   * Toggle select all
   */toggleSelectAll:_propTypes.default.func.isRequired}),_default=SelectMethodsModel;exports.default=_default;