import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'customHandle',
  title: 'Custom Dropdown Handle',
  description: 'Replace the chevron with a custom handle.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  dropdownHandleRenderer={({ state, methods }) => (
    <div onClick={() => methods.dropDown(state.dropdown ? 'close' : 'open')}>
      {state.dropdown ? '▲' : '▼'}
    </div>
  )}
/>`,
};

export default function CustomDropdownHandleExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        dropdownHandleRenderer={({ state, methods }) => (
          <div
            onClick={(event) => methods.dropDown(state.dropdown ? 'close' : 'open', event)}
            className="flex items-center justify-center w-8 h-full cursor-pointer text-gray-400 hover:text-indigo-600 transition-colors">
            {state.dropdown ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            )}
          </div>
        )}
        placeholder="Custom handle..."
      />
    </div>
  );
}
