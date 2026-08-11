import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'rtl',
  title: 'RTL Support',
  description: 'Right-to-left layout for Arabic, Hebrew, etc.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  direction="rtl"
/>`,
};

export default function DirectionExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        direction="rtl"
        placeholder="RTL direction..."
      />
    </div>
  );
}
