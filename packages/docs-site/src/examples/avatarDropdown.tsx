import { useState } from 'react';
import Select from 'react-dropdown-select';
import { people } from './data';
import type { Person } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'avatarDropdown',
  title: 'Avatar Dropdown',
  description: 'Rich dropdown with avatars and descriptions.',
  code: `<Select
  options={people}
  valueField="id"
  labelField="name"
  values={values}
  onChange={setValues}
  multi searchable
  itemRenderer={({ item, state, methods }) => (
    <div onClick={() => methods.addItem(item)}>
      <Avatar color={item.color}>{item.name[0]}</Avatar>
      <div>{item.name}</div>
      <div>{item.role}</div>
    </div>
  )}
/>`,
};

export default function AvatarDropdownExample() {
  const [values, setValues] = useState<Person[]>([]);
  return (
    <div>
      <Select
        options={people}
        valueField="id"
        labelField="name"
        values={values}
        onChange={setValues}
        multi
        searchable
        placeholder="Select team members..."
        itemRenderer={({ item, state, methods }) => (
          <div
            key={item.id}
            onClick={() => methods.addItem(item)}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
              state.values.some((v) => v.id === item.id) ? 'bg-indigo-50' : 'hover:bg-gray-50'
            }`}>
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0"
              style={{ backgroundColor: item.color }}>
              {item.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-900">{item.name}</div>
              <div className="text-xs text-gray-400">{item.role}</div>
            </div>
          </div>
        )}
        optionRenderer={({ item }) => (
          <div className="flex items-center gap-2">
            <div
              className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
              style={{ backgroundColor: item.color }}>
              {item.name.charAt(0)}
            </div>
            {item.name}
          </div>
        )}
      />
    </div>
  );
}
