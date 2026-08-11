import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'addPlaceholder',
  title: 'Add Placeholder',
  description: 'Secondary placeholder when values already exist.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  multi
  searchable
  addPlaceholder="+ search more..."
/>`,
};

export default function AddPlaceholderExample() {
  const [values, setValues] = useState<Country[]>([countryOptions[0], countryOptions[3]]);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        multi
        searchable
        addPlaceholder="+ search more..."
      />
    </div>
  );
}
