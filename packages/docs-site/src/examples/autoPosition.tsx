import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'autoPosition',
  title: 'Auto Position',
  description: 'Automatically flip upward when there is not enough space below.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  dropdownPosition="auto"
  placeholder="Auto position..."
/>`,
};

export default function AutoPositionExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        dropdownPosition="auto"
        placeholder="Auto position..."
      />
    </div>
  );
}
