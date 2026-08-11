import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'externalControl',
  title: 'External Controls',
  description: 'Programmatic add, remove, clear, and select all.',
  code: `// Add next unselected
const avail = options.filter((o) => !values.some((v) => v.value === o.value))
if (avail.length > 0) setValues([...values, avail[0]])

// Remove last
setValues(values.slice(0, -1))`,
};

export default function ExternalClearAddExample() {
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
          onClick={() => {
            const avail = countryOptions.filter((o) => !values.some((v) => v.value === o.value));
            if (avail.length > 0) setValues([...values, avail[0]]);
          }}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-colors">
          + Add next
        </button>
        <button
          onClick={() => setValues(values.slice(0, -1))}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors">
          - Remove last
        </button>
        <button
          onClick={() => setValues([])}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors">
          Clear all
        </button>
        <button
          onClick={() => setValues([...countryOptions])}
          className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
          Select all
        </button>
      </div>
    </div>
  );
}
