import type { FormEvent } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'form',
  title: 'Form Integration',
  description: 'Hidden input with name and required for HTML forms.',
  code: `<form onSubmit={handleSubmit}>
  <label>Country (required)</label>
  <Select name="country" required options={countryOptions} onChange={...} />
  <button type="submit">Submit</button>
</form>`,
};

export default function FormExample() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert('Form submitted! Check console for data.');
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Country (required)
          </label>
          <Select
            name="country"
            required
            options={countryOptions}
            onChange={(v) => console.log(v)}
            placeholder="Select a country..."
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors">
          Submit
        </button>
      </form>
    </div>
  );
}
