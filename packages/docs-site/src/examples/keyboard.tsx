import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'keyboard',
  title: 'Keyboard Navigation',
  description: 'Full keyboard support with arrow keys, Enter, Escape, and Backspace.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  multi
  searchable
  placeholder="Use keyboard to navigate..."
/>
// Keys: ↑↓ Navigate | Enter Select | Backspace Delete | Escape Close`,
};

export default function KeyboardExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div className="space-y-3">
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        multi
        searchable
        placeholder="Use keyboard to navigate..."
      />
      <div className="p-3 rounded-lg bg-gray-50 text-xs text-gray-500 space-y-1">
        <p>
          <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono text-xs">
            ↑
          </kbd>{' '}
          <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono text-xs">
            ↓
          </kbd>{' '}
          Navigate
        </p>
        <p>
          <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono text-xs">
            Enter
          </kbd>{' '}
          Select item
        </p>
        <p>
          <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono text-xs">
            Backspace
          </kbd>{' '}
          Delete last
        </p>
        <p>
          <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono text-xs">
            Escape
          </kbd>{' '}
          Close
        </p>
      </div>
    </div>
  );
}
