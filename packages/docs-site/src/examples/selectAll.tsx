import { useState } from 'react';
import Select from 'react-dropdown-select';
import { colorOptions } from './data';
import type { Color } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'selectAll',
  title: 'Select All / Clear All',
  description: 'Buttons to select or clear all values at once.',
  code: `<Select
  options={colorOptions}
  values={values}
  onChange={setValues}
  multi
  selectAll
  selectAllLabel="Select all colors"
  clearAllLabel="Clear all colors"
  placeholder="Pick colors..."
/>`,
};

export default function SelectAllExample() {
  const [values, setValues] = useState<Color[]>([]);
  return (
    <div>
      <Select
        options={colorOptions}
        values={values}
        onChange={setValues}
        multi
        selectAll
        selectAllLabel="Select all colors"
        clearAllLabel="Clear all colors"
        placeholder="Pick colors..."
      />
    </div>
  );
}
