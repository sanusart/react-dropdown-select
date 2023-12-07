import PropTypes from 'prop-types';

const SelectMethodsModel = Object.freeze({
  activeCursorItem: PropTypes.func,
  /**
   * Add a new item
   */
  addItem: PropTypes.func.isRequired,
  /**
   * Check if all items are selected
   */
  areAllSelected: PropTypes.func.isRequired,
  /**
   * Clear all selected items
   */
  clearAll: PropTypes.func.isRequired,
  /**
   * Create a new item
   */
  createNew: PropTypes.func.isRequired,
  /**
   * Close/Toggle/Open
   */
  dropDown: PropTypes.func.isRequired,
  /**
   * Get the input size
   */
  getInputSize: PropTypes.func.isRequired,
  /**
   * Get the bounds of the select component
   */
  getSelectBounds: PropTypes.func.isRequired,
  /**
   * Get the reference to the select component
   */
  getSelectRef: PropTypes.func.isRequired,
  /**
   * Handle key down event
   */
  handleKeyDown: PropTypes.func.isRequired,
  /**
   * Check if an item is selected
   */
  isSelected: PropTypes.func.isRequired,
  /**
   * Remove an item
   */
  removeItem: PropTypes.func.isRequired,
  /**
   * Make a string safe
   */
  safeString: PropTypes.func.isRequired,
  /**
   * Get search results
   */
  searchResults: PropTypes.func.isRequired,
  /**
   * Select all items
   */
  selectAll: PropTypes.func.isRequired,
  /**
   * Set the search string
   */
  setSearch: PropTypes.func.isRequired,
  /**
   * Sort items
   */
  sortBy: PropTypes.func.isRequired,
  /**
   * Toggle select all
   */
  toggleSelectAll: PropTypes.func.isRequired,
});

export default SelectMethodsModel;
