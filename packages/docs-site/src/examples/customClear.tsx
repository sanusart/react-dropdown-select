import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'customClear',
  title: 'Custom Clear Renderer',
  description: 'Replace the clear button with a styled Reset button.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  clearable
  clearRenderer={({ state, methods }) => (
    state.values.length > 0 ? (
      <button onClick={() => methods.clearAll()}>Reset</button>
    ) : null
  )}
/>`,
};

export default function CustomClearRendererExample() {
  const [values, setValues] = useState<Country[]>([countryOptions[0], countryOptions[3]]);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        clearable
        clearRenderer={({ state, methods }) =>
          state.values.length > 0 ? (
            <button
              onClick={() => methods.clearAll()}
              className="ml-1 px-2 py-0.5 rounded-md text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-200">
              Reset
            </button>
          ) : null
        }
      />
    </div>
  );
}
