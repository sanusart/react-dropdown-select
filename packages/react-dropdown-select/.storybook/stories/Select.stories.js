import React from 'react';
import { Select, defaultProps as selectDefaultProps } from '../../src';
import { optionsBase } from './options';

const options = optionsBase(10);
const baseArgs = {
  ...selectDefaultProps,
  options,
  multi: false,
  onChange: (values) => console.log(values),
};

export default {
  title: 'react-dropdown-select',
  component: Select,
};

export const Basic = {
  args: {
    ...baseArgs,
    placeholder: 'Select a fruit',
  },
};

export const MultiSelect = {
  args: {
    ...baseArgs,
    multi: true,
    placeholder: 'Select fruits',
  },
};

export const Searchable = {
  args: {
    ...baseArgs,
    searchable: true,
    placeholder: 'Search and select...',
  },
};

export const NotSearchable = {
  args: {
    ...baseArgs,
    searchable: false,
    placeholder: 'Pick one...',
  },
};

export const Clearable = {
  args: {
    ...baseArgs,
    clearable: true,
    values: [options[0]],
    placeholder: 'Select and clear...',
  },
};

export const Disabled = {
  args: {
    ...baseArgs,
    disabled: true,
    values: [options[0]],
  },
};

export const Loading = {
  args: {
    ...baseArgs,
    loading: true,
    placeholder: 'Loading...',
  },
};

export const CreateNew = {
  args: {
    ...baseArgs,
    create: true,
    placeholder: 'Select or type to create...',
  },
};

export const SelectAll = {
  args: {
    ...baseArgs,
    multi: true,
    selectAll: true,
    placeholder: 'Select all or pick...',
  },
};

export const CustomColor = {
  name: 'Custom Color',
  args: {
    ...baseArgs,
    multi: true,
    color: '#7c3aed',
    values: [options[0], options[2]],
    placeholder: 'Purple theme',
  },
};

export const WithSeparator = {
  name: 'With Separator',
  args: {
    ...baseArgs,
    multi: true,
    separator: true,
    values: [options[0], options[1], options[2]],
  },
};

export const CustomHeight = {
  name: 'Custom Height',
  args: {
    ...baseArgs,
    dropdownHeight: '150px',
    placeholder: 'Short dropdown',
  },
};

export const NoDropdownHandle = {
  name: 'No Dropdown Handle',
  args: {
    ...baseArgs,
    dropdownHandle: false,
    placeholder: 'Click input to open',
  },
};

export const WithValues = {
  name: 'Pre-selected Values',
  args: {
    ...baseArgs,
    values: [options[0], options[3]],
    multi: true,
    placeholder: 'Has values...',
  },
};

export const CloseOnSelect = {
  name: 'Close On Select',
  args: {
    ...baseArgs,
    closeOnSelect: true,
    placeholder: 'Closes after picking',
  },
};
