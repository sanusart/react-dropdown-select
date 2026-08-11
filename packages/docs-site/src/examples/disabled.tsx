import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'disabled',
  title: 'Disabled',
  description: 'Fully disabled or individual disabled items.',
  code: `<Select options={countryOptions} values={values} onChange={setValues} disabled />
<Select
  options={countryOptions.map((opt, i) => ({ ...opt, disabled: i === 2 }))}
  values={values}
  onChange={setValues}
  placeholder="With disabled items"
/>`,
};

export default function DisabledExample() {
  return (
    <div className="space-y-3">
      <Select options={countryOptions} values={[countryOptions[0]]} onChange={() => {}} disabled />
      <Select
        options={countryOptions.map((opt, i) => ({
          ...opt,
          disabled: i === 2,
        }))}
        values={[]}
        onChange={() => {}}
        placeholder="With disabled items"
      />
    </div>
  );
}
