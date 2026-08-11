import { useState } from 'react';
import Select from 'react-dropdown-select';
import { largeOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'height',
  title: 'Custom Height',
  description: 'Control the minimum dropdown height.',
  code: `<Select options={largeOptions} dropdownHeight="150px" />
<Select options={largeOptions} dropdownHeight="500px" />`,
};

export default function CustomHeightExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div className="space-y-3">
      <Select
        options={largeOptions}
        values={values}
        onChange={setValues}
        dropdownHeight="150px"
        placeholder="Short (150px)"
      />
      <Select
        options={largeOptions}
        values={values}
        onChange={setValues}
        dropdownHeight="500px"
        placeholder="Tall (500px)"
      />
    </div>
  );
}
