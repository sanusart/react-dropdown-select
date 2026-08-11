import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'customNoData',
  title: 'Custom No Data Renderer',
  description: 'Illustrated no-results state.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  searchable
  noDataRenderer={({ state }) => (
    <div style={{ textAlign: 'center', padding: '32px' }}>
      <svg><!-- search icon --></svg>
      <p>No results for "{state.search}"</p>
    </div>
  )}
/>`,
};

export default function CustomNoDataRendererExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        searchable
        noDataRenderer={({ state }) => (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <svg
              className="w-10 h-10 text-gray-300 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="text-sm font-medium text-gray-500">No results for "{state.search}"</p>
            <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
          </div>
        )}
        placeholder="Type something missing..."
      />
    </div>
  );
}
