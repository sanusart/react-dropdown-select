import { useState } from 'react';
import Select from 'react-dropdown-select';
import { emojiOptions } from './data';
import type { Emoji } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'customItem',
  title: 'Custom Item Renderer',
  description: 'Replace the dropdown item with a custom component.',
  code: `<Select
  options={emojiOptions}
  values={values}
  onChange={setValues}
  multi searchable
  itemRenderer={({ item, state, methods }) => (
    <div onClick={() => methods.addItem(item)}>
      <span>{item.emoji}</span>
      <span>{item.label}</span>
      {state.values.find((v) => v.value === item.value) && <span>✓</span>}
    </div>
  )}
  optionRenderer={({ item }) => (
    <span>{item.emoji} {item.label}</span>
  )}
/>`,
};

export default function CustomItemRendererExample() {
  const [values, setValues] = useState<Emoji[]>([]);
  return (
    <div>
      <Select
        options={emojiOptions}
        values={values}
        onChange={setValues}
        multi
        searchable
        placeholder="Countries with flags..."
        itemRenderer={({ item, state, methods }) => (
          <div
            key={item.value}
            onClick={() => methods.addItem(item)}
            className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
              state.values.find((v) => v.value === item.value) ? 'bg-indigo-50' : 'hover:bg-gray-50'
            }`}>
            <span className="text-xl">{item.emoji}</span>
            <div>
              <div className="text-sm font-medium text-gray-900">{item.label}</div>
              <div className="text-xs text-gray-400">{item.value.toUpperCase()}</div>
            </div>
            {state.values.find((v) => v.value === item.value) && (
              <svg
                className="w-4 h-4 text-indigo-500 ml-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
        )}
        optionRenderer={({ item }) => (
          <span className="flex items-center gap-1.5">
            <span>{item.emoji}</span>
            {item.label}
          </span>
        )}
      />
    </div>
  );
}
