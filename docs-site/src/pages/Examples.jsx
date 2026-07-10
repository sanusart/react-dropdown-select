import { useState } from 'react'
import Select from 'react-dropdown-select'
import styled from '@emotion/styled'
import CodeBlock from '../components/CodeBlock'

const countryOptions = [
  { value: 'au', label: 'Australia' },
  { value: 'br', label: 'Brazil' },
  { value: 'cn', label: 'China' },
  { value: 'fi', label: 'Finland' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'in', label: 'India' },
  { value: 'jp', label: 'Japan' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'us', label: 'United States' },
]

const colorOptions = [
  { value: '#ef4444', label: 'Red' },
  { value: '#f59e0b', label: 'Amber' },
  { value: '#10b981', label: 'Emerald' },
  { value: '#3b82f6', label: 'Blue' },
  { value: '#8b5cf6', label: 'Violet' },
  { value: '#ec4899', label: 'Pink' },
]

const userOptions = [
  { id: 1, name: 'John Doe', email: 'john@example.com', company: { name: 'Acme Inc' }, role: 'admin' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', company: { name: 'Globex' }, role: 'editor' },
  { id: 3, name: 'Bob Wilson', email: 'bob@example.com', company: { name: 'Initech' }, role: 'viewer' },
  { id: 4, name: 'Alice Brown', email: 'alice@example.com', company: { name: 'Umbrella Corp' }, role: 'admin' },
  { id: 5, name: 'Charlie Davis', email: 'charlie@example.com', company: { name: 'Stark Industries' }, role: 'editor' },
]

const tagOptions = [
  { value: 'react', label: 'React', group: 'Frontend' },
  { value: 'vue', label: 'Vue', group: 'Frontend' },
  { value: 'angular', label: 'Angular', group: 'Frontend' },
  { value: 'svelte', label: 'Svelte', group: 'Frontend' },
  { value: 'node', label: 'Node.js', group: 'Backend' },
  { value: 'express', label: 'Express', group: 'Backend' },
  { value: 'django', label: 'Django', group: 'Backend' },
  { value: 'rails', label: 'Rails', group: 'Backend' },
  { value: 'postgres', label: 'PostgreSQL', group: 'Database' },
  { value: 'mongo', label: 'MongoDB', group: 'Database' },
  { value: 'redis', label: 'Redis', group: 'Database' },
]

const largeOptions = Array.from({ length: 1000 }, (_, i) => ({
  value: `item-${i}`,
  label: `Item ${i + 1}`,
}))

const emojiOptions = [
  { value: 'us', label: 'United States', emoji: '🇺🇸' },
  { value: 'uk', label: 'United Kingdom', emoji: '🇬🇧' },
  { value: 'jp', label: 'Japan', emoji: '🇯🇵' },
  { value: 'de', label: 'Germany', emoji: '🇩🇪' },
  { value: 'fr', label: 'France', emoji: '🇫🇷' },
  { value: 'br', label: 'Brazil', emoji: '🇧🇷' },
  { value: 'au', label: 'Australia', emoji: '🇦🇺' },
  { value: 'ca', label: 'Canada', emoji: '🇨🇦' },
]

function Example({ title, description, children, code }) {
  const [showCode, setShowCode] = useState(false)
  return (
    <div className="rounded-2xl border border-gray-200">
      <div className="px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      <div className="docs-demo px-6 pb-6 bg-white">
        {children}
      </div>
      {code && (
        <div className="border-t border-gray-100">
          <button
            onClick={() => setShowCode(!showCode)}
            className="w-full flex items-center justify-between px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <span>{showCode ? 'Hide code' : 'Show code'}</span>
            <svg
              className={`w-4 h-4 transition-transform ${showCode ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {showCode && (
            <div className="border-t border-gray-100">
              <CodeBlock code={code} language="jsx" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

// ============================================================
// EXAMPLES
// ============================================================

function BasicExample() {
  const [values, setValues] = useState([])
  return (
    <Select
      options={countryOptions}
      values={values}
      onChange={setValues}
      placeholder="Pick a country..."
    />
  )
}

function MultiExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={colorOptions}
        values={values}
        onChange={setValues}
        multi
        searchable
        clearable
        placeholder="Pick colors..."
      />
    </div>
  )
}

function ClearableExample() {
  const [values, setValues] = useState([countryOptions[2]])
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        clearable
      />
    </div>
  )
}

function SeparatorExample() {
  const [values, setValues] = useState([countryOptions[0]])
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        separator
        clearable
        dropdownHandle
      />
    </div>
  )
}

function NonSearchableExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        searchable={false}
        placeholder="Click to open..."
      />
    </div>
  )
}

function DisabledExample() {
  return (
    <div className="space-y-3">
      <Select
        options={countryOptions}
        values={[countryOptions[0]]}
        onChange={() => {}}
        disabled
      />
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
  )
}

function LoadingExample() {
  return (
    <div>
      <Select
        options={countryOptions}
        values={[]}
        onChange={() => {}}
        loading
      />
    </div>
  )
}

function AddPlaceholderExample() {
  const [values, setValues] = useState([countryOptions[0], countryOptions[3]])
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        multi
        searchable
        addPlaceholder="+ search more..."
      />
    </div>
  )
}

function CreateExample() {
  const [options, setOptions] = useState([
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
  ])
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={options}
        values={values}
        onChange={setValues}
        onCreateNew={(newItem) => setOptions([...options, newItem])}
        create
        createNewLabel="add {search}"
        multi
        searchable
        placeholder="Type to add a framework..."
      />
    </div>
  )
}

function SelectAllExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={colorOptions}
        values={values}
        onChange={setValues}
        multi
        selectAll
        selectAllLabel="Select all colors"
        clearAllLabel="Clear all colors"
        placeholder="Pick colors..."
      />
    </div>
  )
}

function CloseOnSelectExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        closeOnSelect
        multi
        searchable
        placeholder="Closes after each pick..."
      />
    </div>
  )
}

function CloseOnClickInputExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        closeOnClickInput
        searchable
        placeholder="Click input to toggle..."
      />
    </div>
  )
}

function CloseOnScrollExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        closeOnScroll
        searchable
        placeholder="Closes on scroll..."
      />
    </div>
  )
}

function AutoPositionExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        dropdownPosition="auto"
        placeholder="Auto position..."
      />
    </div>
  )
}

function PositionTopExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        dropdownPosition="top"
        placeholder="Opens upward..."
      />
    </div>
  )
}

function KeyboardExample() {
  const [values, setValues] = useState([])
  return (
    <div className="space-y-3">
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        multi
        searchable
        placeholder="Use keyboard to navigate..."
      />
      <div className="p-3 rounded-lg bg-gray-50 text-xs text-gray-500 space-y-1">
        <p><kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono text-xs">↑</kbd> <kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono text-xs">↓</kbd> Navigate</p>
        <p><kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono text-xs">Enter</kbd> Select item</p>
        <p><kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono text-xs">Backspace</kbd> Delete last</p>
        <p><kbd className="px-1.5 py-0.5 rounded bg-white border border-gray-200 font-mono text-xs">Escape</kbd> Close</p>
      </div>
    </div>
  )
}

function BackspaceDeleteExample() {
  const [values, setValues] = useState([countryOptions[0], countryOptions[1], countryOptions[2]])
  return (
    <div className="space-y-3">
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        multi
        backspaceDelete
        searchable
      />
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        multi
        backspaceDelete={false}
        searchable
        placeholder="Backspace disabled..."
      />
    </div>
  )
}

function KeepSelectedInListExample() {
  const [values, setValues] = useState([countryOptions[1], countryOptions[3]])
  return (
    <div className="space-y-3">
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        multi searchable
        keepSelectedInList
      />
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        multi searchable
        keepSelectedInList={false}
        placeholder="Selected hidden from list..."
      />
    </div>
  )
}

function DropdownGapExample() {
  const [values, setValues] = useState([])
  return (
    <div className="space-y-3">
      <Select options={countryOptions} values={values} onChange={setValues} dropdownGap={0} placeholder="No gap (0px)" />
      <Select options={countryOptions} values={values} onChange={setValues} dropdownGap={20} placeholder="Large gap (20px)" />
    </div>
  )
}

function PortalExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        portal={document.body}
        searchable
        placeholder="Renders in body..."
      />
    </div>
  )
}



function CallbacksExample() {
  const [events, setEvents] = useState([])
  const log = (msg) => setEvents((prev) => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev].slice(0, 8))
  const [values, setValues] = useState([])
  return (
    <div className="space-y-4">
      <Select
        options={countryOptions}
        values={values}
        onChange={(v) => { setValues(v); log(`onChange: ${v.length} selected`) }}
        onSelect={(v) => log(`onSelect: ${v[v.length - 1]?.label}`)}
        onDeselect={() => log(`onDeselect: removed`)}
        onDropdownOpen={() => log('onDropdownOpen')}
        onDropdownClose={() => log('onDropdownClose')}
        onClearAll={() => log('onClearAll')}
        multi searchable clearable
        placeholder="Pick countries..."
      />
      <div className="p-3 rounded-lg bg-gray-900 font-mono text-xs text-green-400 space-y-1 max-h-40 overflow-y-auto">
        {events.length === 0 && <span className="text-gray-500">Events appear here...</span>}
        {events.map((e, i) => <div key={i}>{e}</div>)}
      </div>
    </div>
  )
}

function AnimatedCloseExample() {
  const [values, setValues] = useState([])
  const [animating, setAnimating] = useState(false)
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        searchable
        onDropdownCloseRequest={({ close }) => {
          setAnimating(true)
          setTimeout(() => { setAnimating(false); close() }, 300)
        }}
        style={animating ? { opacity: 0.5, transition: 'opacity 0.3s' } : { transition: 'opacity 0.3s' }}
        placeholder="Animated close..."
      />
    </div>
  )
}

function SearchFnExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        searchable
        searchFn={({ state, props }) => {
          const search = state.search.toLowerCase()
          if (!search) return props.options
          return props.options.filter((opt) =>
            opt.label.toLowerCase().split(' ').some((word) => word.includes(search))
          )
        }}
        placeholder="Custom search..."
      />
    </div>
  )
}

function NestedDataExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={userOptions}
        valueField="id"
        labelField="name"
        searchBy="name"
        values={values}
        onChange={setValues}
        multi searchable
        placeholder="Search by name..."
      />
    </div>
  )
}

function SearchByFieldExample() {
  const [values, setValues] = useState([])
  return (
    <div className="space-y-3">
      <Select options={userOptions} valueField="id" labelField="name" searchBy="name" values={values} onChange={setValues} searchable placeholder="Search by name..." />
      <Select options={userOptions} valueField="id" labelField="email" searchBy="email" values={values} onChange={setValues} searchable placeholder="Search by email..." />
      <Select options={userOptions} valueField="id" labelField="name" searchBy="role" values={values} onChange={setValues} searchable placeholder="Search by role..." />
    </div>
  )
}

function SortByExample() {
  const [values, setValues] = useState([])
  return (
    <div className="space-y-3">
      <Select options={userOptions} valueField="id" labelField="name" sortBy="name" values={values} onChange={setValues} searchable placeholder="Sorted by name..." />
      <Select options={userOptions} valueField="id" labelField="name" sortBy="role" values={values} onChange={setValues} searchable placeholder="Sorted by role..." />
    </div>
  )
}

function ControlledExample() {
  const [values, setValues] = useState([countryOptions[0]])
  return (
    <div className="space-y-4">
      <Select options={countryOptions} values={values} onChange={setValues} multi searchable placeholder="Select countries..." />
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setValues(countryOptions.slice(0, 3))} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors">
          Select first 3
        </button>
        <button onClick={() => setValues([])} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
          Clear all
        </button>
        <button onClick={() => setValues(countryOptions)} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">
          Select all
        </button>
      </div>
      <p className="text-xs text-gray-400">
        Selected: {values.length > 0 ? values.map((v) => v.label).join(', ') : 'None'}
      </p>
    </div>
  )
}

function ExternalClearAddExample() {
  const [values, setValues] = useState([countryOptions[0]])
  return (
    <div className="space-y-4">
      <Select options={countryOptions} values={values} onChange={setValues} multi searchable placeholder="Select countries..." />
      <div className="flex gap-2 flex-wrap">
        <button onClick={() => { const avail = countryOptions.filter((o) => !values.some((v) => v.value === o.value)); if (avail.length > 0) setValues([...values, avail[0]]) }} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-green-100 text-green-700 hover:bg-green-200 transition-colors">
          + Add next
        </button>
        <button onClick={() => setValues(values.slice(0, -1))} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors">
          - Remove last
        </button>
        <button onClick={() => setValues([])} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-red-100 text-red-700 hover:bg-red-200 transition-colors">
          Clear all
        </button>
        <button onClick={() => setValues([...countryOptions])} className="px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors">
          Select all
        </button>
      </div>
    </div>
  )
}

function FormExample() {
  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Form submitted! Check console for data.')
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">Country (required)</label>
          <Select name="country" required options={countryOptions} onChange={(v) => console.log(v)} placeholder="Select a country..." />
        </div>
        <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors">
          Submit
        </button>
      </form>
    </div>
  )
}

function CustomColorExample() {
  const [values, setValues] = useState([])
  return (
    <div className="space-y-3">
      <Select options={countryOptions} values={values} onChange={setValues} color="#10b981" placeholder="Emerald" />
      <Select options={countryOptions} values={values} onChange={setValues} color="#f59e0b" placeholder="Amber" />
      <Select options={countryOptions} values={values} onChange={setValues} color="#ec4899" placeholder="Pink" />
      <Select options={countryOptions} values={values} onChange={setValues} color="#000" placeholder="Black" />
    </div>
  )
}

function CustomHeightExample() {
  const [values, setValues] = useState([])
  return (
    <div className="space-y-3">
      <Select options={largeOptions} values={values} onChange={setValues} dropdownHeight="150px" placeholder="Short (150px)" />
      <Select options={largeOptions} values={values} onChange={setValues} dropdownHeight="500px" placeholder="Tall (500px)" />
    </div>
  )
}

function DirectionExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select options={countryOptions} values={values} onChange={setValues} direction="rtl" placeholder="RTL direction..." />
    </div>
  )
}

function StyledExample() {
  const StyledSelect = styled(Select)`
    .react-dropdown-select {
      border-radius: 16px;
      border: 2px solid #e5e7eb;
      padding: 6px 10px;
      font-size: 14px;
      transition: all 0.2s;
    }
    .react-dropdown-select:hover { border-color: #818cf8; }
    .react-dropdown-select:focus-within {
      border-color: #6366f1;
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.15);
    }
    .react-dropdown-select-dropdown {
      border-radius: 16px;
      border: 1px solid #e5e7eb;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
      overflow: hidden;
      margin-top: 6px;
    }
    .react-dropdown-select-item {
      padding: 10px 16px;
      margin: 2px 6px;
      border-radius: 8px;
    }
    .react-dropdown-select-item:hover,
    .react-dropdown-select-item-active {
      background: linear-gradient(135deg, #eef2ff, #e0e7ff);
      color: #4f46e5;
    }
  `
  const [values, setValues] = useState([])
  return (
    <div>
      <StyledSelect options={countryOptions} values={values} onChange={setValues} multi searchable placeholder="Custom styled..." />
    </div>
  )
}

function CustomItemRendererExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={emojiOptions}
        values={values}
        onChange={setValues}
        multi searchable
        placeholder="Countries with flags..."
        itemRenderer={({ item, state, methods }) => (
          <div
            key={item.value}
            onClick={() => methods.addItem(item)}
            className={`flex items-center gap-3 px-4 py-2.5 cursor-pointer transition-colors ${
              state.values.find((v) => v.value === item.value) ? 'bg-indigo-50' : 'hover:bg-gray-50'
            }`}
          >
            <span className="text-xl">{item.emoji}</span>
            <div>
              <div className="text-sm font-medium text-gray-900">{item.label}</div>
              <div className="text-xs text-gray-400">{item.value.toUpperCase()}</div>
            </div>
            {state.values.find((v) => v.value === item.value) && (
              <svg className="w-4 h-4 text-indigo-500 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        )}
        optionRenderer={({ item }) => (
          <span className="flex items-center gap-1.5">
            <span>{item.emoji}</span>
            {item.label}
          </span>
        )}
      />
    </div>
  )
}

function CustomDropdownHandleExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        dropdownHandleRenderer={({ state, methods }) => (
          <div
            onClick={() => methods.dropDown(state.dropdown ? 'close' : 'open', event)}
            className="flex items-center justify-center w-8 h-full cursor-pointer text-gray-400 hover:text-indigo-600 transition-colors"
          >
            {state.dropdown ? (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>
            ) : (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            )}
          </div>
        )}
        placeholder="Custom handle..."
      />
    </div>
  )
}

function CustomContentRendererExample() {
  const [values, setValues] = useState([countryOptions[0], countryOptions[3]])
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        multi searchable
        contentRenderer={({ state }) => (
          <div className="flex items-center gap-2 flex-wrap p-1">
            {state.values.length === 0 && <span className="text-gray-400 text-sm px-2">Nothing selected</span>}
            {state.values.map((v) => (
              <span key={v.value} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                {v.label}
              </span>
            ))}
          </div>
        )}
      />
    </div>
  )
}

function CustomDropdownRendererExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={tagOptions}
        values={values}
        onChange={setValues}
        multi searchable
        placeholder="Grouped dropdown..."
        dropdownRenderer={({ props, state, methods }) => {
          const groups = {}
          state.searchResults.forEach((item) => {
            const g = item.group || 'Other'
            if (!groups[g]) groups[g] = []
            groups[g].push(item)
          })
          return (
            <div className="py-2">
              {Object.entries(groups).map(([group, items]) => (
                <div key={group}>
                  <div className="px-4 py-1.5 text-xs font-semibold text-gray-400 uppercase tracking-wider bg-gray-50">{group}</div>
                  {items.map((item) => (
                    <div
                      key={item[props.valueField]}
                      onClick={() => methods.addItem(item)}
                      className={`px-4 py-2 cursor-pointer text-sm transition-colors ${
                        state.values.find((v) => v[props.valueField] === item[props.valueField])
                          ? 'bg-indigo-50 text-indigo-700 font-medium'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {item[props.labelField]}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )
        }}
      />
    </div>
  )
}

function AvatarDropdownExample() {
  const people = [
    { id: 1, name: 'John Doe', role: 'Engineer', color: '#6366f1' },
    { id: 2, name: 'Jane Smith', role: 'Designer', color: '#ec4899' },
    { id: 3, name: 'Bob Wilson', role: 'PM', color: '#10b981' },
    { id: 4, name: 'Alice Brown', role: 'DevOps', color: '#f59e0b' },
  ]
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={people}
        valueField="id"
        labelField="name"
        values={values}
        onChange={setValues}
        multi searchable
        placeholder="Select team members..."
        itemRenderer={({ item, state, methods }) => (
          <div
            key={item.id}
            onClick={() => methods.addItem(item)}
            className={`flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors ${
              state.values.some((v) => v.id === item.id) ? 'bg-indigo-50' : 'hover:bg-gray-50'
            }`}
          >
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0" style={{ backgroundColor: item.color }}>
              {item.name.charAt(0)}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-medium text-gray-900">{item.name}</div>
              <div className="text-xs text-gray-400">{item.role}</div>
            </div>
          </div>
        )}
        optionRenderer={({ item }) => (
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0" style={{ backgroundColor: item.color }}>
              {item.name.charAt(0)}
            </div>
            {item.name}
          </div>
        )}
      />
    </div>
  )
}

function CustomClearRendererExample() {
  const [values, setValues] = useState([countryOptions[0], countryOptions[3]])
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        clearable
        clearRenderer={({ state, methods }) => (
          state.values.length > 0 ? (
            <button onClick={() => methods.clearAll()} className="ml-1 px-2 py-0.5 rounded-md text-xs font-medium bg-red-50 text-red-600 hover:bg-red-100 transition-colors border border-red-200">
              Reset
            </button>
          ) : null
        )}
      />
    </div>
  )
}

function CustomInputRendererExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        multi searchable
        inputRenderer={({ state, methods, inputRef }) => (
          <input
            ref={inputRef}
            type="text"
            value={state.search}
            onChange={methods.setSearch}
            placeholder={values.length > 0 ? `${values.length} selected...` : '🔍 Search countries...'}
            className="flex-1 min-w-0 bg-transparent outline-none text-sm px-2 py-1.5 placeholder-gray-400"
          />
        )}
      />
    </div>
  )
}

function CustomNoDataRendererExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        searchable
        noDataRenderer={({ state }) => (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <svg className="w-10 h-10 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-sm font-medium text-gray-500">No results for "{state.search}"</p>
            <p className="text-xs text-gray-400 mt-1">Try a different search term</p>
          </div>
        )}
        placeholder="Type something missing..."
      />
    </div>
  )
}

function CustomLoadingRendererExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        loading
        loadingRenderer={() => (
          <div className="flex items-center justify-center py-4 gap-2">
            <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm text-gray-500 font-medium">Fetching data...</span>
          </div>
        )}
      />
    </div>
  )
}

function CustomSeparatorRendererExample() {
  const [values, setValues] = useState([countryOptions[0]])
  return (
    <div>
      <Select
        options={countryOptions}
        values={values}
        onChange={setValues}
        separator clearable
        separatorRenderer={() => (
          <div className="flex items-center px-1">
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-indigo-300 to-transparent" />
          </div>
        )}
      />
    </div>
  )
}

function GroupedDropdownExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={tagOptions}
        values={values}
        onChange={setValues}
        multi searchable
        placeholder="Select technologies..."
        dropdownRenderer={({ props, state, methods }) => {
          const groups = {}
          state.searchResults.forEach((item) => {
            const g = item.group || 'Other'
            if (!groups[g]) groups[g] = []
            groups[g].push(item)
          })
          return (
            <div className="py-2 max-h-72 overflow-y-auto">
              {Object.entries(groups).map(([group, items]) => (
                <div key={group}>
                  <div className="px-4 py-2 text-[11px] font-bold text-indigo-500 uppercase tracking-widest bg-gray-50 sticky top-0">{group}</div>
                  {items.map((item) => {
                    const isSelected = state.values.some((v) => v[props.valueField] === item[props.valueField])
                    return (
                      <div
                        key={item[props.valueField]}
                        onClick={() => methods.addItem(item)}
                        className={`flex items-center gap-2 px-4 py-2 cursor-pointer text-sm transition-all ${
                          isSelected ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors ${
                          isSelected ? 'bg-indigo-500 border-indigo-500' : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        {item.label}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          )
        }}
      />
    </div>
  )
}

function TagsWithCreateExample() {
  const [options, setOptions] = useState([
    { value: 'react', label: 'React' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'tailwind', label: 'Tailwind CSS' },
  ])
  const [values, setValues] = useState([])
  return (
    <div>
      <Select
        options={options}
        values={values}
        onChange={setValues}
        onCreateNew={(newItem) => setOptions([...options, newItem])}
        create
        createNewLabel='+ add "{search}"'
        multi searchable clearable
        placeholder="Type a skill and press Enter..."
        optionRenderer={({ item, state, methods }) => {
          const isSelected = state.values.some((v) => v.value === item.value)
          return (
            <div
              key={item.value}
              onClick={() => methods.addItem(item)}
              className={`flex items-center justify-between px-3 py-2 mx-2 my-0.5 rounded-lg cursor-pointer text-sm transition-colors ${
                isSelected ? 'bg-indigo-100 text-indigo-700' : 'hover:bg-gray-50'
              }`}
            >
              <span>{item.label}</span>
              {isSelected && <span className="text-indigo-400 text-xs">selected</span>}
            </div>
          )
        }}
      />
    </div>
  )
}

function DisabledLabelExample() {
  const options = [
    { value: 'a', label: 'Available' },
    { value: 'b', label: 'Taken', disabled: true },
    { value: 'c', label: 'Available' },
    { value: 'd', label: 'Reserved', disabled: true },
  ]
  const [values, setValues] = useState([])
  return (
    <div>
      <Select options={options} values={values} onChange={setValues} disabledLabel="(unavailable)" placeholder="Disabled items show label..." />
    </div>
  )
}

function NoDataLabelExample() {
  const [values, setValues] = useState([])
  return (
    <div>
      <Select options={countryOptions} values={values} onChange={setValues} searchable noDataLabel="Nothing found, try again!" placeholder="Search for something missing..." />
    </div>
  )
}

// ============================================================
// ALL EXAMPLES - GROUPED BY SECTION
// ============================================================

const sections = [
  {
    title: 'Basic',
    examples: [
      { id: 'basic', title: 'Basic', description: 'Simple single-select dropdown.', Component: BasicExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  placeholder="Pick a country..."
/>` },
      { id: 'multi', title: 'Multi Select', description: 'Select multiple values with search and clear.', Component: MultiExample,
        code: `<Select
  options={colorOptions}
  values={values}
  onChange={setValues}
  multi
  searchable
  clearable
  placeholder="Pick colors..."
/>` },
      { id: 'clearable', title: 'Clearable', description: 'Show a clear button to reset the selection.', Component: ClearableExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  clearable
/>` },
      { id: 'separator', title: 'Separator', description: 'Vertical separator between clear button and dropdown handle.', Component: SeparatorExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  separator
  clearable
  dropdownHandle
/>` },
      { id: 'nonSearchable', title: 'Non-Searchable', description: 'Dropdown without search input.', Component: NonSearchableExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  searchable={false}
  placeholder="Click to open..."
/>` },
      { id: 'disabled', title: 'Disabled', description: 'Fully disabled or individual disabled items.', Component: DisabledExample,
        code: `<Select options={countryOptions} values={values} onChange={setValues} disabled />
<Select
  options={countryOptions.map((opt, i) => ({ ...opt, disabled: i === 2 }))}
  values={values}
  onChange={setValues}
  placeholder="With disabled items"
/>` },
      { id: 'loading', title: 'Loading', description: 'Show a loading indicator.', Component: LoadingExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  loading
/>` },
      { id: 'addPlaceholder', title: 'Add Placeholder', description: 'Secondary placeholder when values already exist.', Component: AddPlaceholderExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  multi
  searchable
  addPlaceholder="+ search more..."
/>` },
    ],
  },
  {
    title: 'Features',
    examples: [
      { id: 'create', title: 'Create New Entries', description: 'Type and press Enter to create custom options.', Component: CreateExample,
        code: `<Select
  options={options}
  values={values}
  onChange={setValues}
  onCreateNew={(newItem) => setOptions([...options, newItem])}
  create
  createNewLabel="add {search}"
  multi
  searchable
  placeholder="Type to add a framework..."
/>` },
      { id: 'selectAll', title: 'Select All / Clear All', description: 'Buttons to select or clear all values at once.', Component: SelectAllExample,
        code: `<Select
  options={colorOptions}
  values={values}
  onChange={setValues}
  multi
  selectAll
  selectAllLabel="Select all colors"
  clearAllLabel="Clear all colors"
  placeholder="Pick colors..."
/>` },
      { id: 'closeOnSelect', title: 'Close on Select', description: 'Close the dropdown after selecting an item.', Component: CloseOnSelectExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  closeOnSelect
  multi
  searchable
  placeholder="Closes after each pick..."
/>` },
      { id: 'closeOnClickInput', title: 'Close on Click Input', description: 'Toggle dropdown by clicking the input area.', Component: CloseOnClickInputExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  closeOnClickInput
  searchable
  placeholder="Click input to toggle..."
/>` },
      { id: 'closeOnScroll', title: 'Close on Scroll', description: 'Close the dropdown when the page scrolls.', Component: CloseOnScrollExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  closeOnScroll
  searchable
  placeholder="Closes on scroll..."
/>` },
      { id: 'autoPosition', title: 'Auto Position', description: 'Automatically flip upward when there is not enough space below.', Component: AutoPositionExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  dropdownPosition="auto"
  placeholder="Auto position..."
/>` },
      { id: 'positionTop', title: 'Position Top', description: 'Force the dropdown to always open upward.', Component: PositionTopExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  dropdownPosition="top"
  placeholder="Opens upward..."
/>` },
      { id: 'keyboard', title: 'Keyboard Navigation', description: 'Full keyboard support with arrow keys, Enter, Escape, and Backspace.', Component: KeyboardExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  multi
  searchable
  placeholder="Use keyboard to navigate..."
/>
// Keys: ↑↓ Navigate | Enter Select | Backspace Delete | Escape Close` },
      { id: 'backspaceDelete', title: 'Backspace Delete', description: 'Toggle backspace to delete the last selected value.', Component: BackspaceDeleteExample,
        code: `// Enabled (default)
<Select options={countryOptions} values={values} onChange={setValues} multi backspaceDelete searchable />
// Disabled
<Select options={countryOptions} values={values} onChange={setValues} multi backspaceDelete={false} searchable />` },
      { id: 'keepSelectedInList', title: 'Keep Selected in List', description: 'Toggle showing selected items in the dropdown.', Component: KeepSelectedInListExample,
        code: `// Shown (default)
<Select options={countryOptions} values={values} onChange={setValues} multi searchable keepSelectedInList />
// Hidden
<Select options={countryOptions} values={values} onChange={setValues} multi searchable keepSelectedInList={false} />` },
      { id: 'dropdownGap', title: 'Dropdown Gap', description: 'Control the gap between the select and the dropdown.', Component: DropdownGapExample,
        code: `<Select options={countryOptions} values={values} onChange={setValues} dropdownGap={0} />
<Select options={countryOptions} values={values} onChange={setValues} dropdownGap={20} />` },
      { id: 'portal', title: 'Portal', description: 'Render the dropdown inside document.body.', Component: PortalExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  portal={document.body}
  searchable
  placeholder="Renders in body..."
/>` },
      { id: 'callbacks', title: 'Event Callbacks', description: 'Monitor all events: onChange, onSelect, onDeselect, onDropdownOpen, onDropdownClose.', Component: CallbacksExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={(v) => setValues(v)}
  onSelect={(v) => log('selected', v)}
  onDeselect={() => log('deselected')}
  onDropdownOpen={() => log('opened')}
  onDropdownClose={() => log('closed')}
  onClearAll={() => log('cleared')}
  multi searchable clearable
/>` },
      { id: 'animatedClose', title: 'Animated Close', description: 'Custom close animation via onDropdownCloseRequest.', Component: AnimatedCloseExample,
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
/>` },
      { id: 'searchFn', title: 'Custom Search Function', description: 'Override the internal search logic.', Component: SearchFnExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  searchable
  searchFn={({ state, props }) => {
    const search = state.search.toLowerCase()
    if (!search) return props.options
    return props.options.filter((opt) =>
      opt.label.toLowerCase().split(' ').some((word) => word.includes(search))
    )
  }}
/>` },
    ],
  },
  {
    title: 'Data',
    examples: [
      { id: 'nested', title: 'Nested Data', description: 'Access deeply nested properties with dot notation.', Component: NestedDataExample,
        code: `<Select
  options={userOptions}
  valueField="id"
  labelField="name"
  searchBy="name"
  values={values}
  onChange={setValues}
  multi searchable
/>` },
      { id: 'searchBy', title: 'Search by Field', description: 'Search by different fields: name, email, or role.', Component: SearchByFieldExample,
        code: `<Select options={userOptions} valueField="id" labelField="name" searchBy="name" />
<Select options={userOptions} valueField="id" labelField="email" searchBy="email" />
<Select options={userOptions} valueField="id" labelField="name" searchBy="role" />` },
      { id: 'sortBy', title: 'Sort By', description: 'Sort options by different fields.', Component: SortByExample,
        code: `<Select options={userOptions} valueField="id" labelField="name" sortBy="name" />
<Select options={userOptions} valueField="id" labelField="name" sortBy="role" />` },
      { id: 'controlled', title: 'Controlled Mode', description: 'External buttons to add, remove, clear, and select all.', Component: ControlledExample,
        code: `const [values, setValues] = useState([])

<Select options={countryOptions} values={values} onChange={setValues} multi searchable />
<button onClick={() => setValues(countryOptions.slice(0, 3))}>Select first 3</button>
<button onClick={() => setValues([])}>Clear all</button>
<button onClick={() => setValues(countryOptions)}>Select all</button>` },
      { id: 'externalControl', title: 'External Controls', description: 'Programmatic add, remove, clear, and select all.', Component: ExternalClearAddExample,
        code: `// Add next unselected
const avail = options.filter((o) => !values.some((v) => v.value === o.value))
if (avail.length > 0) setValues([...values, avail[0]])

// Remove last
setValues(values.slice(0, -1))` },
      { id: 'form', title: 'Form Integration', description: 'Hidden input with name and required for HTML forms.', Component: FormExample,
        code: `<form onSubmit={handleSubmit}>
  <label>Country (required)</label>
  <Select name="country" required options={countryOptions} onChange={...} />
  <button type="submit">Submit</button>
</form>` },
      { id: 'disabledLabel', title: 'Disabled Label', description: 'Custom label suffix for disabled items.', Component: DisabledLabelExample,
        code: `<Select
  options={options}
  values={values}
  onChange={setValues}
  disabledLabel="(unavailable)"
/>` },
      { id: 'noDataLabel', title: 'Custom No Data Label', description: 'Custom text when search returns no results.', Component: NoDataLabelExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  searchable
  noDataLabel="Nothing found, try again!"
/>` },
    ],
  },
  {
    title: 'Customization',
    examples: [
      { id: 'colors', title: 'Custom Colors', description: 'Change the accent color with the color prop.', Component: CustomColorExample,
        code: `<Select color="#10b981" placeholder="Emerald" />
<Select color="#f59e0b" placeholder="Amber" />
<Select color="#ec4899" placeholder="Pink" />
<Select color="#000" placeholder="Black" />` },
      { id: 'height', title: 'Custom Height', description: 'Control the minimum dropdown height.', Component: CustomHeightExample,
        code: `<Select options={largeOptions} dropdownHeight="150px" />
<Select options={largeOptions} dropdownHeight="500px" />` },
      { id: 'rtl', title: 'RTL Support', description: 'Right-to-left layout for Arabic, Hebrew, etc.', Component: DirectionExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  direction="rtl"
/>` },
      { id: 'styled', title: 'Styled with Emotion', description: 'Full CSS override with styled() wrapper.', Component: StyledExample,
        code: `const StyledSelect = styled(Select)\`
  .react-dropdown-select {
    border-radius: 16px;
    border: 2px solid #e5e7eb;
    padding: 6px 10px;
    font-size: 14px;
  }
  .react-dropdown-select-dropdown {
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.12);
  }
  .react-dropdown-select-item:hover {
    background: linear-gradient(135deg, #eef2ff, #e0e7ff);
    color: #4f46e5;
  }
\`

<StyledSelect options={options} values={values} onChange={setValues} multi searchable />` },
      { id: 'customItem', title: 'Custom Item Renderer', description: 'Replace the dropdown item with a custom component.', Component: CustomItemRendererExample,
        code: `<Select
  options={emojiOptions}
  values={values}
  onChange={setValues}
  multi searchable
  itemRenderer={({ item, state, methods }) => (
    <div onClick={() => methods.addItem(item)}>
      <span>{item.emoji}</span>
      <span>{item.label}</span>
      {state.values.find((v) => v.value === item.value) && <span>✓</span>}
    </div>
  )}
  optionRenderer={({ item }) => (
    <span>{item.emoji} {item.label}</span>
  )}
/>` },
      { id: 'customHandle', title: 'Custom Dropdown Handle', description: 'Replace the chevron with a custom handle.', Component: CustomDropdownHandleExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  dropdownHandleRenderer={({ state, methods }) => (
    <div onClick={() => methods.dropDown(state.dropdown ? 'close' : 'open')}>
      {state.dropdown ? '▲' : '▼'}
    </div>
  )}
/>` },
      { id: 'customContent', title: 'Custom Content Renderer', description: 'Replace the entire content area with gradient pills.', Component: CustomContentRendererExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  multi searchable
  contentRenderer={({ state }) => (
    <div>
      {state.values.map((v) => (
        <span key={v.value} style={{
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          color: 'white',
          borderRadius: '9999px',
          padding: '2px 10px',
          fontSize: '12px'
        }}>
          {v.label}
        </span>
      ))}
    </div>
  )}
/>` },
      { id: 'customDropdown', title: 'Custom Dropdown Renderer', description: 'Replace the dropdown with grouped sections.', Component: CustomDropdownRendererExample,
        code: `<Select
  options={tagOptions}
  values={values}
  onChange={setValues}
  multi searchable
  dropdownRenderer={({ props, state, methods }) => {
    const groups = {}
    state.searchResults.forEach((item) => {
      const g = item.group || 'Other'
      if (!groups[g]) groups[g] = []
      groups[g].push(item)
    })
    return (
      <div>
        {Object.entries(groups).map(([group, items]) => (
          <div key={group}>
            <div style={{ padding: '4px 16px', fontSize: '11px', fontWeight: 600 }}>{group}</div>
            {items.map((item) => (
              <div key={item[props.valueField]} onClick={() => methods.addItem(item)}>
                {item[props.labelField]}
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }}
/>` },
      { id: 'groupedDropdown', title: 'Grouped Dropdown', description: 'Grouped items with sticky headers and checkboxes.', Component: GroupedDropdownExample,
        code: `<Select
  options={tagOptions}
  values={values}
  onChange={setValues}
  multi searchable
  dropdownRenderer={({ props, state, methods }) => {
    // Group items by group field, render with sticky headers + checkboxes
  }}
/>` },
      { id: 'avatarDropdown', title: 'Avatar Dropdown', description: 'Rich dropdown with avatars and descriptions.', Component: AvatarDropdownExample,
        code: `<Select
  options={people}
  valueField="id"
  labelField="name"
  values={values}
  onChange={setValues}
  multi searchable
  itemRenderer={({ item, state, methods }) => (
    <div onClick={() => methods.addItem(item)}>
      <Avatar color={item.color}>{item.name[0]}</Avatar>
      <div>{item.name}</div>
      <div>{item.role}</div>
    </div>
  )}
/>` },
      { id: 'customClear', title: 'Custom Clear Renderer', description: 'Replace the clear button with a styled Reset button.', Component: CustomClearRendererExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  clearable
  clearRenderer={({ state, methods }) => (
    state.values.length > 0 ? (
      <button onClick={() => methods.clearAll()}>Reset</button>
    ) : null
  )}
/>` },
      { id: 'customInput', title: 'Custom Input Renderer', description: 'Replace the search input with a custom one.', Component: CustomInputRendererExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  multi searchable
  inputRenderer={({ state, methods, inputRef }) => (
    <input
      ref={inputRef}
      type="text"
      value={state.search}
      onChange={methods.setSearch}
      placeholder="Search..."
    />
  )}
/>` },
      { id: 'customNoData', title: 'Custom No Data Renderer', description: 'Illustrated no-results state.', Component: CustomNoDataRendererExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  searchable
  noDataRenderer={({ state }) => (
    <div style={{ textAlign: 'center', padding: '32px' }}>
      <svg><!-- search icon --></svg>
      <p>No results for "{state.search}"</p>
    </div>
  )}
/>` },
      { id: 'customLoading', title: 'Custom Loading Renderer', description: 'Custom spinner with text.', Component: CustomLoadingRendererExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  loading
  loadingRenderer={() => (
    <div>
      <div className="spinner" />
      <span>Fetching data...</span>
    </div>
  )}
/>` },
      { id: 'customSeparator', title: 'Custom Separator Renderer', description: 'Gradient vertical separator line.', Component: CustomSeparatorRendererExample,
        code: `<Select
  options={countryOptions}
  values={values}
  onChange={setValues}
  separator clearable
  separatorRenderer={() => (
    <div style={{ width: '1px', height: '24px', background: 'linear-gradient(to bottom, transparent, #818cf8, transparent)' }} />
  )}
/>` },
      { id: 'tagsCreate', title: 'Tags with Create', description: 'Tag input: create new tags with custom styled pills.', Component: TagsWithCreateExample,
        code: `<Select
  options={options}
  values={values}
  onChange={setValues}
  onCreateNew={(newItem) => setOptions([...options, newItem])}
  create
  createNewLabel='+ add "{search}"'
  multi searchable clearable
  optionRenderer={({ item, state, methods }) => (
    <div onClick={() => methods.addItem(item)}>
      {item.label}
      {state.values.some((v) => v.value === item.value) && <span>selected</span>}
    </div>
  )}
/>` },
    ],
  },
]

export default function Examples() {
  return (
    <div className="space-y-12">
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Examples
        </h1>
        <p className="text-lg text-gray-500">
          Live, working examples grouped by category. Expand the code to copy it.
        </p>
      </div>

      {sections.map((section) => (
        <Section key={section.title} title={section.title}>
          {section.examples.map((ex) => (
            <Example key={ex.id} title={ex.title} description={ex.description} code={ex.code}>
              <ex.Component />
            </Example>
          ))}
        </Section>
      ))}
    </div>
  )
}
