import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'backspaceDelete',
  title: 'Backspace Delete',
  description: 'Toggle backspace to delete the last selected value.',
  code: `// Enabled (default)
<Select options={countryOptions} values={values} onChange={setValues} multi backspaceDelete searchable />
// Disabled
<Select options={countryOptions} values={values} onChange={setValues} multi backspaceDelete={false} searchable />`,
};

export default function BackspaceDeleteExample() {
  const [values, setValues] = useState<Country[]>([
    countryOptions[0],
    countryOptions[1],
    countryOptions[2],
  ]);
  return (
    <div className="space-y-3">
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        multi
        backspaceDelete
        searchable
      />
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        multi
        backspaceDelete={false}
        searchable
        placeholder="Backspace disabled..."
      />
    </div>
  );
}
