import React from 'react';
import { Select } from '../../src';
import { optionsBase } from '../../docs/src/options';

const options = optionsBase(4);
const largeOptions = optionsBase(20000);

const baseArgs = {
  ...Select.defaultProps,
  options,
  multi: false,
  onChange: (values) => console.log(values)
};

export default {
  title: 'react-dropdown-select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: 'Basic select examples'
      }
    }
  }
};

// Basic single select
export const Basic = { args: baseArgs };

// Multi select
export const Multi = { args: { ...baseArgs, multi: true } };

// Form with validation
export const FormValidation = {
  args: {
    ...baseArgs,
    required: true,
    name: 'select-field',
    pattern: '.+'
  }
};

// Windowed (Large Dataset)
export const WindowedLargeDataset = {
  args: {
    ...baseArgs,
    options: largeOptions,
    dropdownRenderer: ({ props, state, methods }) => (
      <div style={{ maxHeight: '300px', overflow: 'auto' }}>
        {state.searchResults.map((item, index) => (
          <div
            key={index}
            onClick={() => methods.addItem(item)}
            style={{ padding: '10px', cursor: 'pointer' }}>
            {item.label}
          </div>
        ))}
      </div>
    )
  }
};

// Select All functionality
export const SelectAllExample = {
  args: {
    ...baseArgs,
    multi: true,
    selectAll: true,
    selectAllLabel: 'Select all',
    clearAllLabel: 'Clear all'
  }
};

// Custom Item Renderer
export const CustomItemRenderer = {
  args: {
    ...baseArgs,
    itemRenderer: ({ item, itemIndex, props, state, methods }) => (
      <div
        key={itemIndex}
        onClick={() => methods.addItem(item)}
        style={{
          padding: '10px',
          cursor: 'pointer',
          backgroundColor: methods.isSelected(item) ? '#f2f2f2' : 'white'
        }}>
        <div style={{ fontWeight: 'bold' }}>{item.label}</div>
        <div style={{ fontSize: '12px', color: '#666' }}>{item.value}</div>
      </div>
    )
  }
};

// Custom Content and Dropdown
export const CustomContentAndDropdown = {
  args: {
    ...baseArgs,
    contentRenderer: ({ props, state, methods }) => (
      <div style={{ padding: '10px' }}>
        {state.values.length ? state.values.map((item) => item.label).join(', ') : 'Select...'}
      </div>
    ),
    dropdownRenderer: ({ props, state, methods }) => (
      <div style={{ padding: '10px', border: '1px solid #ccc' }}>
        {state.searchResults.map((item, index) => (
          <div
            key={index}
            onClick={() => methods.addItem(item)}
            style={{ padding: '5px', cursor: 'pointer' }}>
            {item.label}
          </div>
        ))}
      </div>
    )
  }
};

// Custom Dropdown Handle
export const CustomDropdownHandle = {
  args: {
    ...baseArgs,
    dropdownHandleRenderer: ({ state }) => (
      <span style={{ padding: '5px' }}>{state.dropdown ? '▲' : '▼'}</span>
    )
  }
};

// With Animation
export const WithAnimation = {
  args: {
    ...baseArgs,
    style: {
      transition: 'all 0.2s ease'
    },
    contentRenderer: ({ props, state, methods }) => (
      <div
        style={{
          transition: 'all 0.2s ease',
          transform: state.dropdown ? 'scale(1.05)' : 'scale(1)'
        }}>
        {state.values.length ? state.values.map((item) => item.label).join(', ') : 'Select...'}
      </div>
    )
  }
};

// Custom Search Function
export const CustomSearch = {
  args: {
    ...baseArgs,
    searchFn: ({ state, props }) => {
      const regexp = new RegExp(state.search, 'i');
      return props.options.filter((item) => regexp.test(item.label) || regexp.test(item.value));
    }
  }
};

// No Data Example
export const NoDataExample = {
  args: {
    ...baseArgs,
    options: [],
    noDataLabel: 'No options available',
    noDataRenderer: ({ props, state, methods }) => (
      <div style={{ padding: '10px', color: '#666' }}>{props.noDataLabel}</div>
    )
  }
};

// Searchable select
export const Searchable = {
  args: {
    ...baseArgs,
    searchable: true,
    placeholder: 'Search and select...'
  }
};

// Disabled select
export const Disabled = {
  args: {
    ...baseArgs,
    disabled: true,
    values: [options[0]]
  }
};

// Select with custom colors
export const CustomColor = {
  args: {
    ...baseArgs,
    color: '#ff0000'
  }
};

// Select with create option
export const CreateOption = {
  args: {
    ...baseArgs,
    create: true,
    createNewLabel: 'Create: {search}'
  }
};

// Select with loading state
export const Loading = {
  args: {
    ...baseArgs,
    loading: true
  }
};

// Select with clear option
export const Clearable = {
  args: {
    ...baseArgs,
    clearable: true,
    values: [options[0]]
  }
};

// Select with custom dropdown position
export const DropdownPosition = {
  args: {
    ...baseArgs,
    dropdownPosition: 'top'
  }
};

// Select with RTL support
export const RTLSupport = {
  args: {
    ...baseArgs,
    direction: 'rtl'
  }
};

// Select with all features
export const AllFeatures = {
  args: {
    ...baseArgs,
    multi: true,
    searchable: true,
    clearable: true,
    create: true,
    selectAll: true,
    dropdownHandle: true,
    separator: true,
    keepSelectedInList: true,
    closeOnSelect: false,
    dropdownPosition: 'auto',
    values: [options[0]]
  }
};
