import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'customInput',
  title: 'Custom Input Renderer',
  description: 'Replace the search input with a custom one.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  multi searchable
  inputRenderer={({ state, methods, inputRef }) => (
    <input
      ref={inputRef}
      type="text"
      value={state.search}
      onChange={methods.setSearch}
      placeholder="Search..."
    />
  )}
/>`,
};

export default function CustomInputRendererExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        multi
        searchable
        inputRenderer={({ state, methods, inputRef }) => (
          <input
            ref={inputRef}
            type="text"
            value={state.search}
            onChange={methods.setSearch}
            placeholder={
              values.length > 0 ? `${values.length} selected...` : '🔍 Search countries...'
            }
            className="flex-1 min-w-0 bg-transparent outline-none text-sm px-2 py-1.5 placeholder-gray-400"
          />
        )}
      />
    </div>
  );
}
