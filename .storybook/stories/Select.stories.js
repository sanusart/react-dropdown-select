import React from 'react';
import { Select } from '../../src';
import { optionsBase } from '../../docs/src/options';

const options = optionsBase(4);
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

export const Basic = { args: baseArgs };
export const Multi = { args: { ...baseArgs, multi: true } };
