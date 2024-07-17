"use strict";var _propTypes=_interopRequireDefault(require("prop-types"));exports.__esModule=!0,exports.default=void 0;function _interopRequireDefault(a){return a&&a.__esModule?a:{default:a}}var SelectStateModel=Object.freeze({/**
   * Flag indicating whether the dropdown is open or closed
   */dropdown:_propTypes.default.bool.isRequired,/**
   * Array of selected values
   */values:_propTypes.default.arrayOf(_propTypes.default.shape({})),/**
   * Search string
   */search:_propTypes.default.string.isRequired,/**
   * Array of bounds for the select component
   */selectBounds:_propTypes.default.shape({}),/**
   * Cursor position
   */cursor:_propTypes.default.number,/**
   * Array of search results
   */searchResults:_propTypes.default.arrayOf(_propTypes.default.shape({}))}),_default=SelectStateModel;exports.default=_default;