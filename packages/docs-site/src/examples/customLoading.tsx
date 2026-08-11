import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'customLoading',
  title: 'Custom Loading Renderer',
  description: 'Custom spinner with text.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  loading
  loadingRenderer={() => (
    <div>
      <div className="spinner" />
      <span>Fetching data...</span>
    </div>
  )}
/>`,
};

export default function CustomLoadingRendererExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        loading
        loadingRenderer={() => (
          <div className="flex items-center justify-center py-4 gap-2">
            <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-500 font-medium">Fetching data...</span>
          </div>
        )}
      />
    </div>
  );
}
