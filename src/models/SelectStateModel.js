import PropTypes from 'prop-types';

const SelectStateModel = Object.freeze({
  /**
   * Flag indicating whether the dropdown is open or closed
   */
  dropdown: PropTypes.bool.isRequired,
  /**
   * Array of selected values
   */
  values: PropTypes.arrayOf(PropTypes.shape({})),
  /**
   * Search string
   */
  search: PropTypes.string.isRequired,
  /**
   * Array of bounds for the select component
   */
  selectBounds: PropTypes.shape({}),
  /**
   * Cursor position
   */
  cursor: PropTypes.number,
  /**
   * Array of search results
   */
  searchResults: PropTypes.arrayOf(PropTypes.shape({}))
});

export default SelectStateModel;
