import { useState } from 'react';
import Select from 'react-dropdown-select';
import { userOptions } from './data';
import type { User } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'nested',
  title: 'Nested Data',
  description: 'Access deeply nested properties with dot notation.',
  code: `<Select
  options={userOptions}
  valueField="id"
  labelField="name"
  searchBy="name"
  values={values}
  onChange={setValues}
  multi searchable
/>`,
};

export default function NestedDataExample() {
  const [values, setValues] = useState<User[]>([]);
  return (
    <div>
      <Select
        options={userOptions}
        valueField="id"
        labelField="name"
        searchBy="name"
        values={values}
        onChange={setValues}
        multi
        searchable
        placeholder="Search by name..."
      />
    </div>
  );
}
