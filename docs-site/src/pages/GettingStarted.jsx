import CodeBlock from '../components/CodeBlock';
import PackageManager from '../components/PackageManager';

const basicSingle = `import Select from 'react-dropdown-select';

const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];

function App() {
  return (
    <Select
      options={options}
      onChange={(values) => console.log(values)}
      placeholder="Pick a flavor"
    />
  );
}`;

const controlledSingle = `import { useState } from 'react';
import Select from 'react-dropdown-select';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
  { value: 'svelte', label: 'Svelte' },
];

function App() {
  const [values, setValues] = useState([]);

  return (
    <>
      <Select
        options={options}
        values={values}
        onChange={(values) => setValues(values)}
        placeholder="Choose a framework"
      />
      <p>Selected: {values.map(v => v.label).join(', ') || 'None'}</p>
    </>
  );
}`;

const multiSelect = `import { useState } from 'react';
import Select from 'react-dropdown-select';

const colors = [
  { value: '#ef4444', label: 'Red' },
  { value: '#f59e0b', label: 'Amber' },
  { value: '#10b981', label: 'Emerald' },
  { value: '#3b82f6', label: 'Blue' },
  { value: '#8b5cf6', label: 'Violet' },
  { value: '#ec4899', label: 'Pink' },
];

function App() {
  const [values, setValues] = useState([]);

  return (
    <Select
      options={colors}
      values={values}
      onChange={(values) => setValues(values)}
      multi
      searchable
      clearable
      placeholder="Pick your favorite colors"
    />
  );
}`;

const nestedData = `import Select from 'react-dropdown-select';

const users = [
  {
    id: 1,
    name: 'John Doe',
    company: { name: 'Acme Inc', catchPhrase: 'Innovate' },
  },
  {
    id: 2,
    name: 'Jane Smith',
    company: { name: 'Globex', catchPhrase: 'Synergize' },
  },
];

function App() {
  return (
    <Select
      options={users}
      valueField="id"
      labelField="name"
      searchBy="company.name"
      onChange={(values) => console.log(values)}
      placeholder="Search by company name"
    />
  );
}`;

const createEntries = `import Select from 'react-dropdown-select';

function App() {
  const [options, setOptions] = useState([
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
  ]);

  return (
    <Select
      options={options}
      values={[]}
      onChange={(values) => console.log(values)}
      onCreateNew={(newItem) => {
        setOptions([...options, newItem]);
      }}
      create
      createNewLabel="add {search}"
      multi
      searchable
      placeholder="Type to add a framework"
    />
  );
}`;

const formIntegration = `import Select from 'react-dropdown-select';

function App() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log('Country:', formData.get('country'));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Country</label>
      <Select
        name="country"
        required
        options={[
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'ca', label: 'Canada' },
        ]}
        onChange={(values) => {
          // Update hidden input for form submission
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}`;

const withStyling = `import Select from 'react-dropdown-select';
import './CustomSelect.css';

function App() {
  return (
    <div className="custom-select-wrapper">
      <Select
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
          { value: 'c', label: 'Option C' },
        ]}
        onChange={(values) => console.log(values)}
      />
    </div>
  );
}

/* CustomSelect.css */
.custom-select-wrapper .react-dropdown-select {
  border-radius: 12px;
  border: 2px solid #e5e7eb;
  padding: 4px 8px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.custom-select-wrapper .react-dropdown-select:hover {
  border-color: #818cf8;
}

.custom-select-wrapper .react-dropdown-select:focus-within {
  border-color: #6366f1;
  box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
}

.custom-select-wrapper .react-dropdown-select-dropdown {
  border-radius: 12px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.custom-select-wrapper .react-dropdown-select-item {
  border-radius: 8px;
  margin: 2px 4px;
  padding: 8px 12px;
}

.custom-select-wrapper .react-dropdown-select-item:hover,
.custom-select-wrapper .react-dropdown-select-item-active {
  background-color: #eef2ff;
  color: #4f46e5;
}`;

const customRenderers = `import Select from 'react-dropdown-select';

function App() {
  return (
    <Select
      options={[
        { value: 'us', label: 'United States', emoji: '🇺🇸' },
        { value: 'uk', label: 'United Kingdom', emoji: '🇬🇧' },
        { value: 'jp', label: 'Japan', emoji: '🇯🇵' },
        { value: 'de', label: 'Germany', emoji: '🇩🇪' },
        { value: 'fr', label: 'France', emoji: '🇫🇷' },
      ]}
      onChange={(values) => console.log(values)}
      multi
      searchable
      itemRenderer={({ item, props, state, methods }) => (
        <div
          key={item.value}
          onClick={() => methods.addItem(item)}
          style={{
            padding: '8px 12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: state.values.includes(item) ? '#eef2ff' : 'transparent',
          }}
        >
          <span>{item.emoji}</span>
          <span>{item.label}</span>
          {state.values.includes(item) && <span style={{ marginLeft: 'auto' }}>✓</span>}
        </div>
      )}
      optionRenderer={({ item }) => (
        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>{item.emoji}</span>
          {item.label}
        </span>
      )}
    />
  );
}`;

export default function GettingStarted() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Getting Started
        </h1>
        <p className="text-lg text-gray-500">
          Everything you need to install, configure, and start using react-dropdown-select.
        </p>
      </div>

      {/* Installation */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Installation</h2>
        <p className="text-gray-600">
          Install the package using your preferred package manager. The only peer dependencies are{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            react
          </code>{' '}
          and{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            react-dom
          </code>
          .
        </p>

        <PackageManager />

        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
          <p className="text-sm text-amber-800">
            <strong>Requirements:</strong> React 16.x or higher. The component supports both
            CommonJS and ESM, and works with TypeScript out of the box.
          </p>
        </div>
      </section>

      {/* Basic Usage */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Basic Single Select</h2>
        <p className="text-gray-600">
          The simplest usage - pass an array of{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            {'{ value, label }'}
          </code>{' '}
          objects and an{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            onChange
          </code>{' '}
          handler.
        </p>
        <CodeBlock code={basicSingle} language="jsx" title="Basic single select" showLineNumbers />
      </section>

      {/* Controlled */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Controlled Mode</h2>
        <p className="text-gray-600">
          Pass the{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            values
          </code>{' '}
          prop for full control over the selected state. This is the recommended pattern for most
          applications.
        </p>
        <CodeBlock
          code={controlledSingle}
          language="jsx"
          title="Controlled single select"
          showLineNumbers
        />
      </section>

      {/* Multi Select */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Multi Select</h2>
        <p className="text-gray-600">
          Add the{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            multi
          </code>{' '}
          prop to enable selecting multiple values. Combine with{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            searchable
          </code>{' '}
          and{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            clearable
          </code>{' '}
          for a full experience.
        </p>
        <CodeBlock code={multiSelect} language="jsx" title="Multi select" showLineNumbers />
      </section>

      {/* Nested Data */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Working with Nested Data</h2>
        <p className="text-gray-600">
          Use dot notation in{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            labelField
          </code>
          ,{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            valueField
          </code>
          , and{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            searchBy
          </code>{' '}
          to access deeply nested properties.
        </p>
        <CodeBlock code={nestedData} language="jsx" title="Nested data access" showLineNumbers />
      </section>

      {/* Create */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Create New Entries</h2>
        <p className="text-gray-600">
          Enable the{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            create
          </code>{' '}
          prop to let users type and add new options. Use{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            onCreateNew
          </code>{' '}
          to handle the new entry.
        </p>
        <CodeBlock code={createEntries} language="jsx" title="Create new entries" showLineNumbers />
      </section>

      {/* Form */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Form Integration</h2>
        <p className="text-gray-600">
          Pass the{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            name
          </code>
          ,{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            required
          </code>
          , and{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            pattern
          </code>{' '}
          props to create a hidden input for standard HTML form submission.
        </p>
        <CodeBlock code={formIntegration} language="jsx" title="Form integration" showLineNumbers />
      </section>

      {/* Styled */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Custom Styling</h2>
        <p className="text-gray-600">
          Wrap with Emotion's{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            styled()
          </code>{' '}
          to override any internal class. Every element has a predictable{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            .react-dropdown-select-*
          </code>{' '}
          class name.
        </p>
        <CodeBlock
          code={withStyling}
          language="jsx"
          title="Custom styling with Emotion"
          showLineNumbers
        />
      </section>

      {/* Custom Renderers */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900">Custom Renderers</h2>
        <p className="text-gray-600">
          Use render props to completely replace any visual component. Every renderer receives{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            {'{ props, state, methods }'}
          </code>{' '}
          giving you full access to the component's internals.
        </p>
        <CodeBlock code={customRenderers} language="jsx" title="Custom renderers" showLineNumbers />
      </section>

      {/* Next Steps */}
      <section className="p-8 rounded-2xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
        <h2 className="text-2xl font-bold text-gray-900 mb-3">What's next?</h2>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-indigo-500 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Try the interactive <strong>Demo</strong> to toggle every feature
          </li>
          <li className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-indigo-500 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Browse the <strong>Examples</strong> for real-world patterns
          </li>
          <li className="flex items-center gap-2">
            <svg
              className="w-5 h-5 text-indigo-500 shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Read the full <strong>API Reference</strong> for every prop and method
          </li>
        </ul>
      </section>
    </div>
  );
}
