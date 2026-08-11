import { useState } from 'react';
import Select from 'react-dropdown-select';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'create',
  title: 'Create New Entries',
  description: 'Type and press Enter to create custom options.',
  code: `<Select
  options={options}
  values={values}
  onChange={setValues}
  onCreateNew={(newItem) => setOptions([...options, newItem])}
  create
  createNewLabel="add {search}"
  multi
  searchable
  placeholder="Type to add a framework..."
/>`,
};

export default function CreateExample() {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
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
        createNewLabel="add {search}"
        multi
        searchable
        placeholder="Type to add a framework..."
      />
    </div>
  );
}
