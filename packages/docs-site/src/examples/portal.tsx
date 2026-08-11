import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'portal',
  title: 'Portal',
  description: 'Render the dropdown inside document.body.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  portal={document.body}
  searchable
  placeholder="Renders in body..."
/>`,
};

export default function PortalExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        portal={document.body}
        searchable
        placeholder="Renders in body..."
      />
    </div>
  );
}
