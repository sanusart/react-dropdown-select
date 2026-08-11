import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'noDataLabel',
  title: 'Custom No Data Label',
  description: 'Custom text when search returns no results.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  searchable
  noDataLabel="Nothing found, try again!"
/>`,
};

export default function NoDataLabelExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        searchable
        noDataLabel="Nothing found, try again!"
        placeholder="Search for something missing..."
      />
    </div>
  );
}
