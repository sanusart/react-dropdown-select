import { useState } from 'react';
import Select from 'react-dropdown-select';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'tagsCreate',
  title: 'Tags with Create',
  description: 'Tag input: create new tags with custom styled pills.',
  code: `<Select
  options={options}
  values={values}
  onChange={setValues}
  onCreateNew={(newItem) => setOptions([...options, newItem])}
  create
  createNewLabel='+ add "{search}"'
  multi searchable clearable
  optionRenderer={({ item, state, methods }) => (
    <div onClick={() => methods.addItem(item)}>
      {item.label}
      {state.values.some((v) => v.value === item.value) && <span>selected</span>}
    </div>
  )}
/>`,
};

export default function TagsWithCreateExample() {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([
    { value: 'react', label: 'React' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'tailwind', label: 'Tailwind CSS' },
  ]);
  const [values, setValues] = useState<{ value: string; label: string }[]>([]);
  return (
    <div>
      <Select
        options={options}
        values={values}
        onChange={setValues}
        onCreateNew={(newItem) => setOptions([...options, newItem])}
        create
        createNewLabel='+ add "{search}"'
        multi
        searchable
        clearable
        placeholder="Type a skill and press Enter..."
        optionRenderer={({ item, state, methods }) => {
          const isSelected = state.values.some((v) => v.value === item.value);
          return (
            <div
              key={item.value}
              onClick={() => methods.addItem(item)}
              className={`flex items-center justify-between px-3 py-2 mx-2 my-0.5 rounded-lg cursor-pointer text-sm transition-colors ${
                isSelected ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-50'
              }`}>
              <span>{item.label}</span>
              {isSelected && <span className="text-indigo-400 text-xs">selected</span>}
            </div>
          );
        }}
      />
    </div>
  );
}
