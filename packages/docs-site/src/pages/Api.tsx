import { useState } from 'react';
import type { ReactNode } from 'react';
import CodeBlock from '../components/CodeBlock';
import { parseCssClasses, parseInterface, parseSelectProps } from '../lib/parseSelectProps';
import rawSelectProps from '../../../react-dropdown-select/src/select-types.ts?raw';
import rawStyles from '../../../react-dropdown-select/src/styles.ts?raw';

const selectProps = parseSelectProps(rawSelectProps);

const groupProps = (category: string): PropRow[] =>
  selectProps
    .filter((prop) => prop.category === category)
    .map((prop) => ({
      name: prop.name,
      type: prop.type,
      default: prop.default ?? null,
      description: prop.description,
      required: prop.required,
    }));

const rendererProps: RendererRow[] = selectProps
  .filter((prop) => prop.category === 'renderer')
  .map((prop) => ({
    name: prop.name,
    receives: prop.receives ?? '',
    replaces: prop.replaces ?? '',
  }));

const methods: MethodRow[] = parseInterface(rawSelectProps, 'SelectMethods').map((m) => ({
  name: m.name,
  signature: m.type
    .replace(/,\s*\)/g, ')')
    .replace(/\(\s+/g, '(')
    .replace(/\s+/g, ' ')
    .trim(),
  description: m.description,
}));

const internalState: PropRow[] = parseInterface(rawSelectProps, 'SelectState').map((s) => ({
  name: s.name,
  type: s.type,
  description: s.description,
}));

const cssClassDescriptions: Record<string, string> = {
  'react-dropdown-select-disabled': 'Applied when the select is disabled',
  'react-dropdown-select-content': 'Content wrapper (selected values + input)',
  'react-dropdown-select-clear': 'Clear button',
  'react-dropdown-select-separator': 'Separator line',
  'react-dropdown-select-loading': 'Loading spinner',
  'react-dropdown-select-input': 'Search input element',
  'react-dropdown-select-input-readonly': 'Search input in read-only mode',
  'react-dropdown-select-dropdown': 'Dropdown container',
  'react-dropdown-select-dropdown-top': 'Dropdown positioned above (offset helper)',
  'react-dropdown-select-dropdown-bottom': 'Dropdown positioned below (offset helper)',
  'react-dropdown-select-dropdown-portal': 'Dropdown rendered through a portal',
  'react-dropdown-select-dropdown-add-new': '"Add new" button',
  'react-dropdown-select-dropdown-select-all': 'Select/clear all button',
  'react-dropdown-select-dropdown-handle': 'Dropdown chevron handle',
  'react-dropdown-select-dropdown-handle-open': 'Handle state when the dropdown is open',
  'react-dropdown-select-dropdown-handle-closed': 'Handle state when the dropdown is closed',
  'react-dropdown-select-dropdown-handle-rotate': 'Handle rotation state',
  'react-dropdown-select-dropdown-handle-no-rotate-open':
    'Handle rotation when animations are disabled',
  'react-dropdown-select-no-data': 'No results container',
  'react-dropdown-select-option': 'Selected value pill/tag',
  'react-dropdown-select-option-remove': 'Selected value remove (x) button',
  'react-dropdown-select-item': 'Dropdown list item',
  'react-dropdown-select-item-active': 'Keyboard-cursor active item',
  'react-dropdown-select-item-selected': 'Currently selected item',
  'react-dropdown-select-item-selected-disabled': 'Selected item that is also disabled',
  'react-dropdown-select-item-disabled': 'Disabled item',
  'react-dropdown-select-hidden-input': 'Hidden input used for form integration',
};

const cssClasses = [
  { name: 'react-dropdown-select', description: 'Root element' },
  ...parseCssClasses(rawStyles).map((name) => ({
    name,
    description: cssClassDescriptions[name] ?? 'Styled element',
  })),
  { name: 'react-dropdown-select-type-multi', description: 'Multi-select mode modifier' },
  { name: 'react-dropdown-select-type-single', description: 'Single-select mode modifier' },
  { name: 'react-dropdown-select-option-label', description: 'Option label text' },
  {
    name: 'react-dropdown-select-dropdown-position-top',
    description: 'Dropdown positioned at top',
  },
  {
    name: 'react-dropdown-select-dropdown-position-bottom',
    description: 'Dropdown positioned at bottom',
  },
].map((c) => ({ name: `.${c.name}`, description: c.description }));

interface PropRow {
  name: string;
  type: string;
  default?: string | null;
  description: string;
  required?: boolean;
}

interface RendererRow {
  name: string;
  receives: string;
  replaces: string;
}

interface MethodRow {
  name: string;
  signature: string;
  description: string;
}

function PropTable({ title, props }: { title?: string; props: PropRow[] }) {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden">
      {title && (
        <div className="px-5 py-3 bg-gray-50 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-900">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Prop</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Type</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Default</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {props.map((prop) => (
              <tr key={prop.name} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3 font-mono text-sm font-medium text-indigo-700 whitespace-nowrap">
                  {prop.name}
                </td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500 break-words max-w-[18rem]">
                  {prop.type}
                </td>
                <td className="px-5 py-3 font-mono text-xs text-gray-400 whitespace-nowrap">
                  {prop.default || '-'}
                </td>
                <td className="px-5 py-3 text-gray-600 max-w-xs">
                  {prop.description}
                  {prop.required && (
                    <span className="ml-2 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-red-50 text-red-600 uppercase">
                      required
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function RendererTable({ renderers }: { renderers: RendererRow[] }) {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Renderer</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Receives</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Replaces</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {renderers.map((r) => (
              <tr key={r.name} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3 font-mono text-sm font-medium text-indigo-700 whitespace-nowrap">
                  {r.name}
                </td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">{r.receives}</td>
                <td className="px-5 py-3 text-gray-600">{r.replaces}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function MethodTable({ methods }: { methods: MethodRow[] }) {
  return (
    <div className="rounded-2xl border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/50">
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Method</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Signature</th>
              <th className="text-left px-5 py-3 font-semibold text-gray-600">Description</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {methods.map((m) => (
              <tr key={m.name} className="hover:bg-gray-50/50 transition-colors">
                <td className="px-5 py-3 font-mono text-sm font-medium text-indigo-700 whitespace-nowrap">
                  {m.name}
                </td>
                <td className="px-5 py-3 font-mono text-xs text-gray-500">{m.signature}</td>
                <td className="px-5 py-3 text-gray-600">{m.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="space-y-6 scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3">{title}</h2>
      {children}
    </section>
  );
}

export default function Api() {
  const [filter, setFilter] = useState('');

  const configurationProps = groupProps('configuration');
  const displayProps = groupProps('display');
  const behaviorProps = groupProps('behavior');
  const callbackProps = groupProps('callback');
  const functionOverrideProps = groupProps('override');

  const navItems = [
    { id: 'installation', label: 'Installation' },
    { id: 'basic-usage', label: 'Basic Usage' },
    { id: 'configuration-props', label: 'Configuration Props' },
    { id: 'display-props', label: 'Display Props' },
    { id: 'behavior-props', label: 'Behavior Props' },
    { id: 'callback-props', label: 'Callback Props' },
    { id: 'function-overrides', label: 'Function Overrides' },
    { id: 'renderer-props', label: 'Renderer Props' },
    { id: 'internal-state', label: 'Internal State' },
    { id: 'internal-methods', label: 'Internal Methods' },
    { id: 'css-classes', label: 'CSS Classes' },
    { id: 'typescript', label: 'TypeScript' },
  ];

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">API Reference</h1>
        <p className="text-lg text-gray-500">
          Complete documentation for every prop, renderer, method, and CSS class.
        </p>
      </div>

      {/* Filter */}
      <div className="sticky top-16 z-30 bg-white/80 backdrop-blur-xl py-4 -mx-6 px-6 border-b border-gray-100">
        <input
          type="text"
          value={filter}
          onChange={(e) => setFilter(e.target.value.toLowerCase())}
          placeholder="Search props, methods, renderers..."
          className="w-full max-w-md px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-400 transition-all"
        />
      </div>

      {/* Quick Nav */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors">
            {item.label}
          </a>
        ))}
      </div>

      {/* Installation */}
      <Section id="installation" title="Installation">
        <CodeBlock code={`npm install react-dropdown-select`} language="bash" />
      </Section>

      {/* Basic Usage */}
      <Section id="basic-usage" title="Basic Usage">
        <CodeBlock
          code={`import Select from 'react-dropdown-select';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'angular', label: 'Angular' },
];

<Select
  options={options}
  onChange={(values) => console.log(values)}
  multi
  searchable
  clearable
/>`}
          language="jsx"
          showLineNumbers
        />
      </Section>

      {/* Configuration Props */}
      <Section id="configuration-props" title="Configuration Props">
        <PropTable
          props={
            filter
              ? configurationProps.filter(
                  (p) => p.name.includes(filter) || p.description.toLowerCase().includes(filter),
                )
              : configurationProps
          }
        />
      </Section>

      {/* Display Props */}
      <Section id="display-props" title="Display & Styling Props">
        <PropTable
          props={
            filter
              ? displayProps.filter(
                  (p) => p.name.includes(filter) || p.description.toLowerCase().includes(filter),
                )
              : displayProps
          }
        />
      </Section>

      {/* Behavior Props */}
      <Section id="behavior-props" title="Behavior Props">
        <PropTable
          props={
            filter
              ? behaviorProps.filter(
                  (p) => p.name.includes(filter) || p.description.toLowerCase().includes(filter),
                )
              : behaviorProps
          }
        />
      </Section>

      {/* Callback Props */}
      <Section id="callback-props" title="Callback Props">
        <PropTable
          props={
            filter
              ? callbackProps.filter(
                  (p) => p.name.includes(filter) || p.description.toLowerCase().includes(filter),
                )
              : callbackProps
          }
        />
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong>{' '}
            <code className="font-mono text-xs bg-blue-100 px-1.5 py-0.5 rounded">
              onDropdownCloseRequest
            </code>{' '}
            is special - it intercepts the close action and provides a{' '}
            <code className="font-mono text-xs bg-blue-100 px-1.5 py-0.5 rounded">close()</code>{' '}
            callback. Use this for animated dropdown close behavior.
          </p>
        </div>
      </Section>

      {/* Function Overrides */}
      <Section id="function-overrides" title="Function Overrides">
        <PropTable
          props={
            filter
              ? functionOverrideProps.filter(
                  (p) => p.name.includes(filter) || p.description.toLowerCase().includes(filter),
                )
              : functionOverrideProps
          }
        />
        <CodeBlock
          code={`// Custom search function
<Select
  searchFn={({ state, props, methods }) => {
    // Custom fuzzy search logic
    return props.options.filter(opt =>
      opt.label.toLowerCase().includes(state.search.toLowerCase())
    );
  }}
/>

// Custom keyboard handler
<Select
  handleKeyDownFn={({ event, state, props, methods, setState }) => {
    if (event.key === 'Home') {
      methods.dropDown('open', event);
      setState({ cursor: 0 });
    }
  }}
/>`}
          language="jsx"
          title="Function override examples"
        />
      </Section>

      {/* Renderer Props */}
      <Section id="renderer-props" title="Renderer Props">
        <p className="text-gray-500 mb-4">
          Every renderer receives the{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            {'{ props, state, methods }'}
          </code>{' '}
          interface, giving you full access to the component's internals.
        </p>
        <RendererTable
          renderers={
            filter
              ? rendererProps.filter(
                  (r) => r.name.includes(filter) || r.replaces.toLowerCase().includes(filter),
                )
              : rendererProps
          }
        />
        <CodeBlock
          code={`// Example: Custom item renderer with checkbox
<Select
  itemRenderer={({ item, itemIndex, props, state, methods }) => {
    const isSelected = methods.isSelected(item);
    return (
      <div
        key={item.value}
        onClick={() => methods.addItem(item)}
        className={\`flex items-center gap-2 px-3 py-2 cursor-pointer \${
          isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
        }\`}
      >
        <input
          type="checkbox"
          checked={isSelected}
          readOnly
          className="rounded"
        />
        <span>{item.label}</span>
      </div>
    );
  }}
/>`}
          language="jsx"
          title="Custom renderer example"
        />
      </Section>

      {/* Internal State */}
      <Section id="internal-state" title="Internal State">
        <p className="text-gray-500 mb-4">
          The state object is available in all renderers and the{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            methods
          </code>{' '}
          callback.
        </p>
        <PropTable
          props={
            filter
              ? internalState.filter(
                  (s) => s.name.includes(filter) || s.description.toLowerCase().includes(filter),
                )
              : internalState
          }
        />
      </Section>

      {/* Internal Methods */}
      <Section id="internal-methods" title="Internal Methods">
        <p className="text-gray-500 mb-4">
          Available via the{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            methods
          </code>{' '}
          object in renderers and callbacks.
        </p>
        <MethodTable
          methods={
            filter
              ? methods.filter(
                  (m) => m.name.includes(filter) || m.description.toLowerCase().includes(filter),
                )
              : methods
          }
        />
      </Section>

      {/* CSS Classes */}
      <Section id="css-classes" title="CSS Classes">
        <p className="text-gray-500 mb-4">
          All classes are prefixed with{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            react-dropdown-select
          </code>
          . Use these to target specific elements with CSS or Emotion's{' '}
          <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">
            styled()
          </code>
          .
        </p>
        <div className="rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/50">
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Class</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-600">Element</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {(filter
                  ? cssClasses.filter(
                      (c) =>
                        c.name.includes(filter) || c.description.toLowerCase().includes(filter),
                    )
                  : cssClasses
                ).map((cls) => (
                  <tr key={cls.name} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-2.5 font-mono text-sm text-indigo-700">{cls.name}</td>
                    <td className="px-5 py-2.5 text-gray-600">{cls.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      {/* TypeScript */}
      <Section id="typescript" title="TypeScript">
        <p className="text-gray-500 mb-4">
          TypeScript type definitions are included in the package. Import the component and types as
          needed:
        </p>
        <CodeBlock
          code={`import Select from 'react-dropdown-select';
import type { SelectProps } from 'react-dropdown-select/types';

// All props are fully typed
const MySelect: React.FC<SelectProps> = (props) => (
  <Select {...props} />
);`}
          language="tsx"
          title="TypeScript usage"
        />
        <div className="p-4 rounded-xl bg-green-50 border border-green-200">
          <p className="text-sm text-green-800">
            <strong>Tip:</strong> The component ships with generated{' '}
            <code className="font-mono text-xs bg-green-100 px-1.5 py-0.5 rounded">
              types/select-types.d.ts
            </code>{' '}
            declaration files. No additional @types package is needed.
          </p>
        </div>
      </Section>
    </div>
  );
}
