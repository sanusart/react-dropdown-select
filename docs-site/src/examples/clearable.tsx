import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'clearable',
  title: 'Clearable',
  description: 'Show a clear button to reset the selection.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  clearable
/>`,
};

export default function ClearableExample() {
  const [values, setValues] = useState<Country[]>([countryOptions[2]]);
  return (
    <div>
      <Select options={countryOptions} values={values} onChange={setValues} clearable />
    </div>
  );
}
