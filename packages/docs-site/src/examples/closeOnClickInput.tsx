import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'closeOnClickInput',
  title: 'Close on Click Input',
  description: 'Toggle dropdown by clicking the input area.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  closeOnClickInput
  searchable
  placeholder="Click input to toggle..."
/>`,
};

export default function CloseOnClickInputExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        closeOnClickInput
        searchable
        placeholder="Click input to toggle..."
      />
    </div>
  );
}
