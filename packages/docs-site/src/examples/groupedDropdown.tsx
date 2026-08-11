import { useState } from 'react';
import Select from 'react-dropdown-select';
import { tagOptions } from './data';
import type { Tag } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'groupedDropdown',
  title: 'Grouped Dropdown',
  description: 'Grouped items with sticky headers and checkboxes.',
  code: `<Select
  options={tagOptions}
  values={values}
  onChange={setValues}
  multi searchable
  dropdownRenderer={({ props, state, methods }) => {
    // Group items by group field, render with sticky headers + checkboxes
  }}
/>`,
};

export default function GroupedDropdownExample() {
  const [values, setValues] = useState<Tag[]>([]);
  return (
    <div>
      <Select
        options={tagOptions}
        values={values}
        onChange={setValues}
        multi
        searchable
        placeholder="Select technologies..."
        dropdownRenderer={({ props, state, methods }) => {
          const groups: Record<string, Tag[]> = {};
          state.searchResults.forEach((item) => {
            const g = item.group || 'Other';
            if (!groups[g]) groups[g] = [];
            groups[g].push(item);
          });
          const valueField = (props.valueField ?? 'value') as keyof Tag;
          return (
            <div className="py-2 max-h-72 overflow-y-auto">
              {Object.entries(groups).map(([group, items]) => (
                <div key={group}>
                  <div className="px-4 py-2 text-[11px] font-bold text-indigo-500 uppercase tracking-widest bg-gray-50 sticky top-0">
                    {group}
                  </div>
                  {items.map((item) => {
                    const isSelected = state.values.some((v) => v[valueField] === item[valueField]);
                    return (
                      <div
                        key={item[valueField]}
                        onClick={() => methods.addItem(item)}
                        className={`flex items-center gap-2 px-4 py-2 cursor-pointer text-sm transition-all ${
                          isSelected
                            ? 'bg-indigo-50 text-indigo-700 font-medium'
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}>
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                            isSelected ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300'
                          }`}>
                          {isSelected && (
                            <svg
                              className="w-2.5 h-2.5 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={3}>
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          )}
                        </div>
                        {item.label}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
}
