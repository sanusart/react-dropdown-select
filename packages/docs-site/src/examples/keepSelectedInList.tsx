import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'keepSelectedInList',
  title: 'Keep Selected in List',
  description: 'Toggle showing selected items in the dropdown.',
  code: `// Shown (default)
<Select options={countryOptions} values={values} onChange={setValues} multi searchable keepSelectedInList />
// Hidden
<Select options={countryOptions} values={values} onChange={setValues} multi searchable keepSelectedInList={false} />`,
};

export default function KeepSelectedInListExample() {
  const [values, setValues] = useState<Country[]>([countryOptions[1], countryOptions[3]]);
  return (
    <div className="space-y-3">
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        multi
        searchable
        keepSelectedInList
      />
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        multi
        searchable
        keepSelectedInList={false}
        placeholder="Selected hidden from list..."
      />
    </div>
  );
}
