import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'closeOnSelect',
  title: 'Close on Select',
  description: 'Close the dropdown after selecting an item.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  closeOnSelect
  multi
  searchable
  placeholder="Closes after each pick..."
/>`,
};

export default function CloseOnSelectExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        closeOnSelect
        multi
        searchable
        placeholder="Closes after each pick..."
      />
    </div>
  );
}
