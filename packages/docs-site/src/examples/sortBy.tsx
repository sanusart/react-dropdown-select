import { useState } from 'react';
import Select from 'react-dropdown-select';
import { userOptions } from './data';
import type { User } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'sortBy',
  title: 'Sort By',
  description: 'Sort options by different fields.',
  code: `<Select options={userOptions} valueField="id" labelField="name" sortBy="name" />
<Select options={userOptions} valueField="id" labelField="name" sortBy="role" />`,
};

export default function SortByExample() {
  const [values, setValues] = useState<User[]>([]);
  return (
    <div className="space-y-3">
      <Select
        options={userOptions}
        valueField="id"
        labelField="name"
        sortBy="name"
        values={values}
        onChange={setValues}
        searchable
        placeholder="Sorted by name..."
      />
      <Select
        options={userOptions}
        valueField="id"
        labelField="name"
        sortBy="role"
        values={values}
        onChange={setValues}
        searchable
        placeholder="Sorted by role..."
      />
    </div>
  );
}
