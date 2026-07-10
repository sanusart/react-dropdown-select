import { useState } from 'react'
import CodeBlock from '../components/CodeBlock'

function PropTable({ title, props }) {
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
                <td className="px-5 py-3 font-mono text-xs text-gray-500 whitespace-nowrap">
                  {prop.type}
                </td>
                <td className="px-5 py-3 font-mono text-xs text-gray-400 whitespace-nowrap">
                  {prop.default || '—'}
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
  )
}

function RendererTable({ renderers }) {
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
                <td className="px-5 py-3 font-mono text-xs text-gray-500">
                  {r.receives}
                </td>
                <td className="px-5 py-3 text-gray-600">
                  {r.replaces}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function MethodTable({ methods }) {
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
                <td className="px-5 py-3 font-mono text-xs text-gray-500">
                  {m.signature}
                </td>
                <td className="px-5 py-3 text-gray-600">
                  {m.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Section({ id, title, children }) {
  return (
    <section id={id} className="space-y-6 scroll-mt-24">
      <h2 className="text-2xl font-bold text-gray-900 border-b border-gray-200 pb-3">{title}</h2>
      {children}
    </section>
  )
}

export default function Api() {
  const [filter, setFilter] = useState('')

  const configurationProps = [
    { name: 'options', type: 'array', default: '[]', description: 'Available options. Items with disabled: true are disabled.', required: true },
    { name: 'values', type: 'array', default: '[]', description: 'Controlled selected values.' },
    { name: 'multi', type: 'boolean', default: 'false', description: 'Enable multi-select mode.' },
    { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable all interactions.' },
    { name: 'searchable', type: 'boolean', default: 'true', description: 'Show search input.' },
    { name: 'clearable', type: 'boolean', default: 'false', description: 'Show clear-all button.' },
    { name: 'separator', type: 'boolean', default: 'false', description: 'Show vertical separator line.' },
    { name: 'dropdownHandle', type: 'boolean', default: 'true', description: 'Show dropdown open/close chevron handle.' },
    { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading indicator.' },
    { name: 'keepOpen', type: 'boolean', default: 'false', description: 'Force dropdown to stay open (useful for debugging).' },
    { name: 'defaultMenuIsOpen', type: 'boolean', default: 'false', description: 'Open dropdown by default on mount.' },
    { name: 'create', type: 'boolean', default: 'false', description: 'Allow creating new entries from search text.' },
    { name: 'selectAll', type: 'boolean', default: 'false', description: 'Show select-all / clear-all buttons in dropdown (multi mode only).' },
    { name: 'portal', type: 'DOMElement', default: 'null', description: 'Render dropdown inside specified DOM element (e.g., document.body).' },
    { name: 'required', type: 'boolean', default: 'false', description: 'Add hidden input with required attribute for form validation.' },
    { name: 'autoFocus', type: 'boolean', default: 'false', description: 'Auto-focus the search input on mount.' },
    { name: 'backspaceDelete', type: 'boolean', default: 'true', description: 'Backspace removes last selected value when search is empty.' },
    { name: 'keepSelectedInList', type: 'boolean', default: 'true', description: 'Show selected items in the dropdown list.' },
  ]

  const displayProps = [
    { name: 'color', type: 'string', default: '"#0074D9"', description: 'Base accent color. Accepts any CSS color value.' },
    { name: 'style', type: 'object', default: '{}', description: 'Style object applied to root element.' },
    { name: 'className', type: 'string', default: '""', description: 'CSS class applied to root element.' },
    { name: 'direction', type: '"ltr" | "rtl" | "auto"', default: '"ltr"', description: 'Text direction for RTL language support.' },
    { name: 'placeholder', type: 'string', default: '"Select..."', description: 'Placeholder text when nothing is selected.' },
    { name: 'addPlaceholder', type: 'string', default: '""', description: 'Secondary placeholder on search input when values exist.' },
    { name: 'disabledLabel', type: 'string', default: '"disabled"', description: 'Label suffix for disabled items.' },
    { name: 'noDataLabel', type: 'string', default: '"No data"', description: 'Text displayed when no search results.' },
    { name: 'createNewLabel', type: 'string', default: '"add {search}"', description: 'Label for the "add new" button. {search} is replaced with input value.' },
    { name: 'selectAllLabel', type: 'string', default: '"Select all"', description: 'Label for select-all button.' },
    { name: 'clearAllLabel', type: 'string', default: '"Clear all"', description: 'Label for clear-all button.' },
    { name: 'dropdownHeight', type: 'string', default: '"300px"', description: 'Minimum dropdown height.' },
    { name: 'dropdownGap', type: 'number', default: '5', description: 'Gap in pixels between select and dropdown.' },
  ]

  const behaviorProps = [
    { name: 'dropdownPosition', type: '"top" | "bottom" | "auto"', default: '"bottom"', description: 'Dropdown position. Auto adjusts based on viewport.' },
    { name: 'closeOnScroll', type: 'boolean', default: 'false', description: 'Close dropdown when page scrolls.' },
    { name: 'closeOnSelect', type: 'boolean', default: 'false', description: 'Close dropdown after selecting an item.' },
    { name: 'closeOnClickInput', type: 'boolean', default: 'false', description: 'Close dropdown when clicking input area (if not searching).' },
    { name: 'clearOnBlur', type: 'boolean', default: 'true', description: 'Clear search text when input loses focus.' },
    { name: 'clearOnSelect', type: 'boolean', default: 'true', description: 'Clear search text on item select/deselect.' },
    { name: 'debounceDelay', type: 'number', default: '0', description: 'Debounce delay in ms for resize/scroll handlers.' },
    { name: 'labelField', type: 'string', default: '"label"', description: 'Field name for display label. Supports dot notation.' },
    { name: 'valueField', type: 'string', default: '"value"', description: 'Field name for value. Supports dot notation.' },
    { name: 'searchBy', type: 'string', default: '"label"', description: 'Field to search by. Supports dot notation.' },
    { name: 'sortBy', type: 'string', default: 'null', description: 'Field to sort options by. Supports dot notation.' },
    { name: 'name', type: 'string', default: 'null', description: 'Hidden input name for form integration.' },
    { name: 'pattern', type: 'string', default: 'undefined', description: 'Hidden input pattern (regex) for form validation.' },
    { name: 'additionalProps', type: 'object', default: 'null', description: 'Additional HTML attributes passed to root div.' },
    { name: 'compareValuesFunc', type: 'function', default: 'JSON.stringify', description: 'Custom comparison function for controlled mode value syncing.' },
  ]

  const callbackProps = [
    { name: 'onChange', type: 'function(values)', default: '—', description: 'Fires on any values change. Returns array of value objects.', required: true },
    { name: 'onSelect', type: 'function(values)', default: null, description: 'Fires on user-triggered value add.' },
    { name: 'onDeselect', type: 'function(values)', default: null, description: 'Fires on user-triggered value remove.' },
    { name: 'onDropdownOpen', type: 'function()', default: null, description: 'Fires when dropdown opens.' },
    { name: 'onDropdownClose', type: 'function()', default: null, description: 'Fires when dropdown closes.' },
    { name: 'onCreateNew', type: 'function(newItem)', default: null, description: 'Fires when creating a new entry. Requires create: true.' },
    { name: 'onClearAll', type: 'function()', default: null, description: 'Fires on clear all.' },
    { name: 'onSelectAll', type: 'function()', default: null, description: 'Fires on select all.' },
    { name: 'onDropdownCloseRequest', type: 'function({ props, state, methods, close })', default: null, description: 'Intercepts dropdown close. Call close() to actually close. Used for animations.' },
  ]

  const functionOverrideProps = [
    { name: 'searchFn', type: 'function({ state, props, methods })', default: null, description: 'Override default search logic. Must return filtered array.' },
    { name: 'handleKeyDownFn', type: 'function({ event, state, props, methods, setState })', default: null, description: 'Override keyboard event handling.' },
  ]

  const rendererProps = [
    { name: 'contentRenderer', receives: '{ props, state, methods }', replaces: 'Entire content area (selected values + input)' },
    { name: 'dropdownRenderer', receives: '{ props, state, methods }', replaces: 'Entire dropdown container' },
    { name: 'itemRenderer', receives: '{ item, itemIndex, props, state, methods }', replaces: 'Individual dropdown list item' },
    { name: 'optionRenderer', receives: '{ item, props, state, methods }', replaces: 'Selected value pill/tag' },
    { name: 'inputRenderer', receives: '{ props, state, methods, inputRef }', replaces: 'Search input element' },
    { name: 'noDataRenderer', receives: '{ props, state, methods }', replaces: '"No data" message' },
    { name: 'loadingRenderer', receives: '{ props }', replaces: 'Loading indicator' },
    { name: 'clearRenderer', receives: '{ props, state, methods }', replaces: 'Clear button' },
    { name: 'separatorRenderer', receives: '{ props, state, methods }', replaces: 'Separator line' },
    { name: 'dropdownHandleRenderer', receives: '{ props, state, methods }', replaces: 'Dropdown arrow handle' },
  ]

  const methods = [
    { name: 'addItem', signature: '(item) => true', description: 'Add item to selection (or toggle in multi mode).' },
    { name: 'removeItem', signature: '(event, item, close) => void', description: 'Remove item from selection.' },
    { name: 'clearAll', signature: '() => void', description: 'Clear all selected values.' },
    { name: 'selectAll', signature: '(valuesList?) => void', description: 'Select all items, or a specific list of values.' },
    { name: 'toggleSelectAll', signature: '() => void', description: 'Toggle between select all / clear all.' },
    { name: 'areAllSelected', signature: '() => boolean', description: 'Check if all non-disabled items are selected.' },
    { name: 'isSelected', signature: '(item) => boolean', description: 'Check if a specific item is selected.' },
    { name: 'dropDown', signature: '(action, event?, force?) => void', description: 'Open ("open"), close ("close"), or toggle ("toggle") the dropdown.' },
    { name: 'setSearch', signature: '(event) => void', description: 'Update the search text.' },
    { name: 'searchResults', signature: '() => array', description: 'Get filtered items based on current search.' },
    { name: 'getInputSize', signature: '() => number', description: 'Get current input character count.' },
    { name: 'getSelectBounds', signature: '() => object', description: 'Get the bounding rectangle of the select.' },
    { name: 'getSelectRef', signature: '() => DOMElement', description: 'Get the select DOM reference.' },
    { name: 'handleKeyDown', signature: '(event) => void', description: 'Process a keyboard event.' },
    { name: 'sortBy', signature: '() => array', description: 'Get options sorted by sortBy field.' },
    { name: 'safeString', signature: '(string) => string', description: 'Escape regex special characters in a string.' },
    { name: 'createNew', signature: '(item) => void', description: 'Create a new entry from search text.' },
    { name: 'activeCursorItem', signature: '(item) => void', description: 'Set the active cursor item.' },
  ]

  const internalState = [
    { name: 'dropdown', type: 'boolean', description: 'Whether the dropdown is open.' },
    { name: 'values', type: 'array', description: 'Currently selected values.' },
    { name: 'search', type: 'string', description: 'Current search text.' },
    { name: 'selectBounds', type: 'object', description: 'getBoundingClientRect() result for the select.' },
    { name: 'cursor', type: 'number', description: 'Keyboard cursor position in the dropdown list.' },
    { name: 'searchResults', type: 'array', description: 'Filtered items from the current search.' },
  ]

  const cssClasses = [
    { name: '.react-dropdown-select', description: 'Root element' },
    { name: '.react-dropdown-select-content', description: 'Content wrapper (selected values + input)' },
    { name: '.react-dropdown-select-type-multi', description: 'Multi-select mode modifier' },
    { name: '.react-dropdown-select-type-single', description: 'Single-select mode modifier' },
    { name: '.react-dropdown-select-input', description: 'Search input element' },
    { name: '.react-dropdown-select-option', description: 'Selected value pill/tag' },
    { name: '.react-dropdown-select-option-label', description: 'Option label text' },
    { name: '.react-dropdown-select-option-remove', description: 'Option remove (x) button' },
    { name: '.react-dropdown-select-dropdown', description: 'Dropdown container' },
    { name: '.react-dropdown-select-dropdown-position-top', description: 'Dropdown positioned at top' },
    { name: '.react-dropdown-select-dropdown-position-bottom', description: 'Dropdown positioned at bottom' },
    { name: '.react-dropdown-select-item', description: 'Dropdown list item' },
    { name: '.react-dropdown-select-item-selected', description: 'Currently selected item' },
    { name: '.react-dropdown-select-item-active', description: 'Keyboard-cursor active item' },
    { name: '.react-dropdown-select-item-disabled', description: 'Disabled item' },
    { name: '.react-dropdown-select-no-data', description: 'No results container' },
    { name: '.react-dropdown-select-clear', description: 'Clear button' },
    { name: '.react-dropdown-select-loading', description: 'Loading spinner' },
    { name: '.react-dropdown-select-separator', description: 'Separator line' },
    { name: '.react-dropdown-select-dropdown-handle', description: 'Dropdown chevron handle' },
    { name: '.react-dropdown-select-dropdown-add-new', description: '"Add new" button' },
    { name: '.react-dropdown-select-dropdown-select-all', description: 'Select/clear all button' },
  ]

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
  ]

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          API Reference
        </h1>
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
            className="px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-indigo-700 hover:bg-indigo-50 transition-colors"
          >
            {item.label}
          </a>
        ))}
      </div>

      {/* Installation */}
      <Section id="installation" title="Installation">
        <CodeBlock
          code={`npm install react-dropdown-select`}
          language="bash"
        />
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
          props={filter ? configurationProps.filter(
            (p) => p.name.includes(filter) || p.description.toLowerCase().includes(filter)
          ) : configurationProps}
        />
      </Section>

      {/* Display Props */}
      <Section id="display-props" title="Display & Styling Props">
        <PropTable
          props={filter ? displayProps.filter(
            (p) => p.name.includes(filter) || p.description.toLowerCase().includes(filter)
          ) : displayProps}
        />
      </Section>

      {/* Behavior Props */}
      <Section id="behavior-props" title="Behavior Props">
        <PropTable
          props={filter ? behaviorProps.filter(
            (p) => p.name.includes(filter) || p.description.toLowerCase().includes(filter)
          ) : behaviorProps}
        />
      </Section>

      {/* Callback Props */}
      <Section id="callback-props" title="Callback Props">
        <PropTable
          props={filter ? callbackProps.filter(
            (p) => p.name.includes(filter) || p.description.toLowerCase().includes(filter)
          ) : callbackProps}
        />
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> <code className="font-mono text-xs bg-blue-100 px-1.5 py-0.5 rounded">onDropdownCloseRequest</code> is
            special — it intercepts the close action and provides a <code className="font-mono text-xs bg-blue-100 px-1.5 py-0.5 rounded">close()</code> callback.
            Use this for animated dropdown close behavior.
          </p>
        </div>
      </Section>

      {/* Function Overrides */}
      <Section id="function-overrides" title="Function Overrides">
        <PropTable
          props={filter ? functionOverrideProps.filter(
            (p) => p.name.includes(filter) || p.description.toLowerCase().includes(filter)
          ) : functionOverrideProps}
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
          Every renderer receives the <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">{'{ props, state, methods }'}</code> interface,
          giving you full access to the component's internals.
        </p>
        <RendererTable renderers={filter ? rendererProps.filter(
          (r) => r.name.includes(filter) || r.replaces.toLowerCase().includes(filter)
        ) : rendererProps} />
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
          The state object is available in all renderers and the <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">methods</code> callback.
        </p>
        <PropTable
          props={filter ? internalState.filter(
            (s) => s.name.includes(filter) || s.description.toLowerCase().includes(filter)
          ) : internalState}
        />
      </Section>

      {/* Internal Methods */}
      <Section id="internal-methods" title="Internal Methods">
        <p className="text-gray-500 mb-4">
          Available via the <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">methods</code> object in renderers and callbacks.
        </p>
        <MethodTable methods={filter ? methods.filter(
          (m) => m.name.includes(filter) || m.description.toLowerCase().includes(filter)
        ) : methods} />
      </Section>

      {/* CSS Classes */}
      <Section id="css-classes" title="CSS Classes">
        <p className="text-gray-500 mb-4">
          All classes are prefixed with <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">react-dropdown-select</code>.
          Use these to target specific elements with CSS or Emotion's <code className="px-1.5 py-0.5 rounded bg-gray-100 text-sm font-medium text-gray-800">styled()</code>.
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
                {(filter ? cssClasses.filter(
                  (c) => c.name.includes(filter) || c.description.toLowerCase().includes(filter)
                ) : cssClasses).map((cls) => (
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
          TypeScript type definitions are included in the package. Import the component and types as needed:
        </p>
        <CodeBlock
          code={`import Select from 'react-dropdown-select';
import type { TProps as SelectProps } from 'react-dropdown-select/types';

// All props are fully typed
const MySelect: React.FC<SelectProps> = (props) => (
  <Select {...props} />
);`}
          language="tsx"
          title="TypeScript usage"
        />
        <div className="p-4 rounded-xl bg-green-50 border border-green-200">
          <p className="text-sm text-green-800">
            <strong>Tip:</strong> The component ships with{' '}
            <code className="font-mono text-xs bg-green-100 px-1.5 py-0.5 rounded">types.d.ts</code> in
            the package root. No additional @types package is needed.
          </p>
        </div>
      </Section>
    </div>
  )
}
