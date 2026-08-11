import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'basic',
  title: 'Basic',
  description: 'Simple single-select dropdown.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  placeholder="Pick a country..."
/>`,
};

export default function BasicExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <Select
      options={countryOptions}
      values={values}
      onChange={setValues}
      placeholder="Pick a country..."
    />
  );
}
