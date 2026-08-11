import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'dropdownGap',
  title: 'Dropdown Gap',
  description: 'Control the gap between the select and the dropdown.',
  code: `<Select options={countryOptions} values={values} onChange={setValues} dropdownGap={0} />
<Select options={countryOptions} values={values} onChange={setValues} dropdownGap={20} />`,
};

export default function DropdownGapExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div className="space-y-3">
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        dropdownGap={0}
        placeholder="No gap (0px)"
      />
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        dropdownGap={20}
        placeholder="Large gap (20px)"
      />
    </div>
  );
}
