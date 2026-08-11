import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'customContent',
  title: 'Custom Content Renderer',
  description: 'Replace the entire content area with gradient pills.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  multi searchable
  contentRenderer={({ state }) => (
    <div>
      {state.values.map((v) => (
        <span key={v.value} style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: 'white',
          borderRadius: '9999px',
          padding: '2px 10px',
          fontSize: '12px'
        }}>
          {v.label}
        </span>
      ))}
    </div>
  )}
/>`,
};

export default function CustomContentRendererExample() {
  const [values, setValues] = useState<Country[]>([countryOptions[0], countryOptions[3]]);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        multi
        searchable
        contentRenderer={({ state }) => (
          <div className="flex items-center gap-2 flex-wrap p-1">
            {state.values.length === 0 && (
              <span className="text-gray-400 text-sm px-2">Nothing selected</span>
            )}
            {state.values.map((v) => (
              <span
                key={v.value}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                {v.label}
              </span>
            ))}
          </div>
        )}
      />
    </div>
  );
}
