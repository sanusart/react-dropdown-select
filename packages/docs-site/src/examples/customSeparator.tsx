import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'customSeparator',
  title: 'Custom Separator Renderer',
  description: 'Gradient vertical separator line.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  separator clearable
  separatorRenderer={() => (
    <div style={{ width: '1px', height: '24px', background: 'linear-gradient(to bottom, transparent, #818cf8, transparent)' }} />
  )}
/>`,
};

export default function CustomSeparatorRendererExample() {
  const [values, setValues] = useState<Country[]>([countryOptions[0]]);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        separator
        clearable
        separatorRenderer={() => (
          <div className="flex items-center px-1">
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-indigo-300 to-transparent" />
          </div>
        )}
      />
    </div>
  );
}
