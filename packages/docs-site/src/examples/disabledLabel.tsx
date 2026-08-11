import { useState } from 'react';
import Select from 'react-dropdown-select';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'disabledLabel',
  title: 'Disabled Label',
  description: 'Custom label suffix for disabled items.',
  code: `<Select
  options={options}
  values={values}
  onChange={setValues}
  disabledLabel="(unavailable)"
/>`,
};

export default function DisabledLabelExample() {
  const options: (Country & { disabled?: boolean })[] = [
    { value: 'a', label: 'Available' },
    { value: 'b', label: 'Taken', disabled: true },
    { value: 'c', label: 'Available' },
    { value: 'd', label: 'Reserved', disabled: true },
  ];
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div>
      <Select
        options={options}
        values={values}
        onChange={setValues}
        disabledLabel="(unavailable)"
        placeholder="Disabled items show label..."
      />
    </div>
  );
}
