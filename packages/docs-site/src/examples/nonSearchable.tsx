import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'nonSearchable',
  title: 'Non-Searchable',
  description: 'Dropdown without search input.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  searchable={false}
  placeholder="Click to open..."
/>`,
};

export default function NonSearchableExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        searchable={false}
        placeholder="Click to open..."
      />
    </div>
  );
}
