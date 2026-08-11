import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'closeOnScroll',
  title: 'Close on Scroll',
  description: 'Close the dropdown when the page scrolls.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  closeOnScroll
  searchable
  placeholder="Closes on scroll..."
/>`,
};

export default function CloseOnScrollExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        closeOnScroll
        searchable
        placeholder="Closes on scroll..."
      />
    </div>
  );
}
