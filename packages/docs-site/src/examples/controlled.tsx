import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'controlled',
  title: 'Controlled Mode',
  description: 'External buttons to add, remove, clear, and select all.',
  code: `const [values, setValues] = useState([])

<Select options={countryOptions} values={values} onChange={setValues} multi searchable />
<button onClick={() => setValues(countryOptions.slice(0, 3))}>Select first 3</button>
<button onClick={() => setValues([])}>Clear all</button>
<button onClick={() => setValues(countryOptions)}>Select all</button>`,
};

export default function ControlledExample() {
  const [values, setValues] = useState<Country[]>([countryOptions[0]]);
  return (
    <div className="space-y-4">
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        multi
        searchable
        placeholder="Select countries..."
      />
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setValues(countryOptions.slice(0, 3))}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors">
          Select first 3
        </button>
        <button
          onClick={() => setValues([])}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
          Clear all
        </button>
        <button
          onClick={() => setValues(countryOptions)}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
          Select all
        </button>
      </div>
      <p className="text-xs text-gray-400">
        Selected: {values.length > 0 ? values.map((v) => v.label).join(', ') : 'None'}
      </p>
    </div>
  );
}
