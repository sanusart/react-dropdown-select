import { useState } from 'react';
import Select from 'react-dropdown-select';
import { colorOptions } from './data';
import type { Color } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'multi',
  title: 'Multi Select',
  description: 'Select multiple values with search and clear.',
  code: `<Select
  options={colorOptions}
  values={values}
  onChange={setValues}
  multi
  searchable
  clearable
  placeholder="Pick colors..."
/>`,
};

export default function MultiExample() {
  const [values, setValues] = useState<Color[]>([]);
  return (
    <div>
      <Select
        options={colorOptions}
        values={values}
        onChange={setValues}
        multi
        searchable
        clearable
        placeholder="Pick colors..."
      />
    </div>
  );
}
