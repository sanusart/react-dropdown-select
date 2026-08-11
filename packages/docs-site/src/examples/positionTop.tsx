import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'positionTop',
  title: 'Position Top',
  description: 'Force the dropdown to always open upward.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  dropdownPosition="top"
  placeholder="Opens upward..."
/>`,
};

export default function PositionTopExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        dropdownPosition="top"
        placeholder="Opens upward..."
      />
    </div>
  );
}
