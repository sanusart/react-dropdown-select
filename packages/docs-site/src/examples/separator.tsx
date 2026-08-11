import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'separator',
  title: 'Separator',
  description: 'Vertical separator between clear button and dropdown handle.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  separator
  clearable
  dropdownHandle
/>`,
};

export default function SeparatorExample() {
  const [values, setValues] = useState<Country[]>([countryOptions[0]]);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        separator
        clearable
        dropdownHandle
      />
    </div>
  );
}
