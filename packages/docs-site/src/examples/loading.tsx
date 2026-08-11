import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'loading',
  title: 'Loading',
  description: 'Show a loading indicator.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  loading
/>`,
};

export default function LoadingExample() {
  return (
    <div>
      <Select options={countryOptions} values={[]} onChange={() => {}} loading />
    </div>
  );
}
