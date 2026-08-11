import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'callbacks',
  title: 'Event Callbacks',
  description:
    'Monitor all events: onChange, onSelect, onDeselect, onDropdownOpen, onDropdownClose.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={(v) => setValues(v)}
  onSelect={(v) => log('selected', v)}
  onDeselect={() => log('deselected')}
  onDropdownOpen={() => log('opened')}
  onDropdownClose={() => log('closed')}
  onClearAll={() => log('cleared')}
  multi searchable clearable
/>`,
};

export default function CallbacksExample() {
  const [events, setEvents] = useState<string[]>([]);
  const log = (msg: string) =>
    setEvents((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 8));
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div className="space-y-4">
      <Select
        options={countryOptions}
        values={values}
        onChange={(v) => {
          setValues(v);
          log(`onChange: ${v.length} selected`);
        }}
        onSelect={(v) => log(`onSelect: ${v[v.length - 1]?.label}`)}
        onDeselect={() => log(`onDeselect: removed`)}
        onDropdownOpen={() => log('onDropdownOpen')}
        onDropdownClose={() => log('onDropdownClose')}
        onClearAll={() => log('onClearAll')}
        multi
        searchable
        clearable
        placeholder="Pick countries..."
      />
      <div className="p-3 rounded-lg bg-gray-900 font-mono text-xs text-green-400 space-y-1 max-h-40 overflow-y-auto">
        {events.length === 0 && <span className="text-gray-500">Events appear here...</span>}
        {events.map((e, i) => (
          <div key={i}>{e}</div>
        ))}
      </div>
    </div>
  );
}
