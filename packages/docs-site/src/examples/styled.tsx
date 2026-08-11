import { useState } from 'react';
import Select from 'react-dropdown-select';
import { countryOptions } from './data';
import type { Country } from './types';
import type { ExampleMeta } from './meta';

export const meta: ExampleMeta = {
  id: 'styled',
  title: 'Styled Override',
  description: 'Full CSS override with a wrapper class.',
  code: `// Add a wrapper class and override styles:
<style>{\`
  .styled-demo .react-dropdown-select {
    border-radius: 16px;
    border: 2px solid #e5e7eb;
    padding: 6px 10px;
    font-size: 14px;
  }
  .styled-demo .react-dropdown-select-dropdown {
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }
  .styled-demo .react-dropdown-select-item:hover {
    background: linear-gradient(135deg, #eef2ff, #e0e7ff);
    color: #4f46e5;
  }
\`}</style>

<div className="styled-demo">
  <Select options={options} values={values} onChange={setValues} multi searchable />
</div>`,
};

export default function StyledExample() {
  const [values, setValues] = useState<Country[]>([]);
  return (
    <div>
      <style>{`
        .styled-demo .react-dropdown-select {
          border-radius: 16px;
          border: 2px solid #e5e7eb;
          padding: 6px 10px;
          font-size: 14px;
          transition: all 0.2s;
        }
        .styled-demo .react-dropdown-select:hover { border-color: #818cf8; }
        .styled-demo .react-dropdown-select:focus-within {
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
        }
        .styled-demo .react-dropdown-select-dropdown {
          border-radius: 16px;
          border: 1px solid #e5e7eb;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
          overflow: hidden;
          margin-top: 6px;
        }
        .styled-demo .react-dropdown-select-item {
          padding: 10px 16px;
          margin: 2px 6px;
          border-radius: 8px;
        }
        .styled-demo .react-dropdown-select-item:hover,
        .styled-demo .react-dropdown-select-item-active {
          background: linear-gradient(135deg, #eef2ff, #e0e7ff);
          color: #4f46e5;
        }
      `}</style>
      <div className="styled-demo">
        <Select
          options={countryOptions}
          values={values}
          onChange={setValues}
          multi
          searchable
          placeholder="Custom styled..."
        />
      </div>
    </div>
  );
}
