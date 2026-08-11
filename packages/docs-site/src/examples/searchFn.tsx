import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'searchFn',
  title: 'Custom Search Function',
  description: 'Override the internal search logic.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  searchable
  searchFn={({ state, props }) => {
    const search = state.search.toLowerCase()
    if (!search) return props.options
    return props.options.filter((opt) =>
      opt.label.toLowerCase().split(' ').some((word) => word.includes(search))
    )
  }}
/>`,
};

export default function SearchFnExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        searchable
        searchFn={({ state, props }) => {
          const search = state.search.toLowerCase();
          if (!search) return props.options ?? [];
          return (props.options ?? []).filter((opt) =>
            opt.label
              .toLowerCase()
              .split(' ')
              .some((word) => word.includes(search)),
          );
        }}
        placeholder="Custom search..."
      />
    </div>
  );
}
