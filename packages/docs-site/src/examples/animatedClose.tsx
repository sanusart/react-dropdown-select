import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'animatedClose',
  title: 'Animated Close',
  description: 'Custom close animation via onDropdownCloseRequest.',
  code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  searchable
  onDropdownCloseRequest={({ close }) => {
    setAnimating(true)
    setTimeout(() => { setAnimating(false); close() }, 300)
  }}
  style={animating ? { opacity: 0.5 } : {}}
/>`,
};

export default function AnimatedCloseExample() {
  const [values, setValues] = useState<Country[]>([]);
  const [animating, setAnimating] = useState(false);
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        searchable
        onDropdownCloseRequest={({ close }) => {
          setAnimating(true);
          setTimeout(() => {
            setAnimating(false);
            close();
          }, 300);
        }}
        style={
          animating ? { opacity: 0.5, transition: 'opacity 0.3s' } : { transition: 'opacity 0.3s' }
        }
        placeholder="Animated close..."
      />
    </div>
  );
}
