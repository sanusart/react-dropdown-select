import { useState } from 'react';
import Select from 'react-dropdown-select';
import { tagOptions } from './data';
import type { Tag } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'customDropdown',
  title: 'Custom Dropdown Renderer',
  description: 'Replace the dropdown with grouped sections.',
  code: `<Select
  options={tagOptions}
  values={values}
  onChange={setValues}
  multi searchable
  dropdownRenderer={({ props, state, methods }) => {
    const groups = {}
    state.searchResults.forEach((item) => {
      const g = item.group || 'Other'
      if (!groups[g]) groups[g] = []
      groups[g].push(item)
    })
    return (
      <div>
        {Object.entries(groups).map(([group, items]) => (
          <div key={group}>
            <div style={{ padding: '4px 16px', fontSize: '11px', fontWeight: 600 }}>{group}</div>
            {items.map((item) => (
              <div key={item[props.valueField]} onClick={() => methods.addItem(item)}>
                {item[props.labelField]}
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }}
/>`,
};

export default function CustomDropdownRendererExample() {
  const [values, setValues] = useState<Tag[]>([]);
  return (
    <div>
      <Select
        options={tagOptions}
        values={values}
        onChange={setValues}
        multi
        searchable
        placeholder="Grouped dropdown..."
        dropdownRenderer={({ props, state, methods }) => {
          const groups: Record<string, Tag[]> = {};
          state.searchResults.forEach((item) => {
            const g = item.group || 'Other';
            if (!groups[g]) groups[g] = [];
            groups[g].push(item);
          });
          const valueField = (props.valueField ?? 'value') as keyof Tag;
          const labelField = (props.labelField ?? 'label') as keyof Tag;
          return (
            <div className="py-2">
              {Object.entries(groups).map(([group, items]) => (
                <div key={group}>
                  <div className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50">
                    {group}
                  </div>
                  {items.map((item) => (
                    <div
                      key={item[valueField]}
                      onClick={() => methods.addItem(item)}
                      className={`px-4 py-2 cursor-pointer text-sm transition-colors ${
                        state.values.find((v) => v[valueField] === item[valueField])
                          ? 'bg-indigo-50 text-indigo-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}>
                      {item[labelField]}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          );
        }}
      />
    </div>
  );
}
