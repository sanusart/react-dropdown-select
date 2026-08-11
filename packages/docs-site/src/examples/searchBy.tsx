import { useState } from 'react';
import Select from 'react-dropdown-select';
import { userOptions } from './data';
import type { User } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'searchBy',
  title: 'Search by Field',
  description: 'Search by different fields: name, email, or role.',
  code: `<Select options={userOptions} valueField="id" labelField="name" searchBy="name" />
<Select options={userOptions} valueField="id" labelField="email" searchBy="email" />
<Select options={userOptions} valueField="id" labelField="name" searchBy="role" />`,
};

export default function SearchByFieldExample() {
  const [values, setValues] = useState<User[]>([]);
  return (
    <div className="space-y-3">
      <Select
        options={userOptions}
        valueField="id"
        labelField="name"
        searchBy="name"
        values={values}
        onChange={setValues}
        searchable
        placeholder="Search by name..."
      />
      <Select
        options={userOptions}
        valueField="id"
        labelField="email"
        searchBy="email"
        values={values}
        onChange={setValues}
        searchable
        placeholder="Search by email..."
      />
      <Select
        options={userOptions}
        valueField="id"
        labelField="name"
        searchBy="role"
        values={values}
        onChange={setValues}
        searchable
        placeholder="Search by role..."
      />
    </div>
  );
}
