import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'colors',
  title: 'Custom Colors',
  description: 'Change the accent color with the color prop.',
  code: `<Select color="#10b981" placeholder="Emerald" />
<Select color="#f59e0b" placeholder="Amber" />
<Select color="#ec4899" placeholder="Pink" />
<Select color="#000" placeholder="Black" />`,
};

export default function CustomColorExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div className="space-y-3">
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        color="#10b981"
        placeholder="Emerald"
      />
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        color="#f59e0b"
        placeholder="Amber"
      />
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        color="#ec4899"
        placeholder="Pink"
      />
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        color="#000"
        placeholder="Black"
      />
    </div>
  );
}
