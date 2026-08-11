import { useState } from 'react';
import Select from 'react-dropdown-select';

interface Country {
  value: string;
  label: string;
}

const options: Country[] = [
  { value: 'au', label: 'Australia' },
  { value: 'br', label: 'Brazil' },
  { value: 'cn', label: 'China' },
  { value: 'fi', label: 'Finland' },
  { value: 'fr', label: 'France' },
  { value: 'de', label: 'Germany' },
  { value: 'in', label: 'India' },
  { value: 'it', label: 'Italy' },
  { value: 'jp', label: 'Japan' },
  { value: 'mx', label: 'Mexico' },
  { value: 'nl', label: 'Netherlands' },
  { value: 'nz', label: 'New Zealand' },
  { value: 'no', label: 'Norway' },
  { value: 'pl', label: 'Poland' },
  { value: 'pt', label: 'Portugal' },
  { value: 'es', label: 'Spain' },
  { value: 'se', label: 'Sweden' },
  { value: 'ch', label: 'Switzerland' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'us', label: 'United States' },
];

interface ToggleProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
}

function Toggle({ label, checked, onChange, description }: ToggleProps) {
  return (
    <label className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer group">
      <div className="mt-0.5">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="sr-only"
        />
        <div
          className={`w-9 h-5 rounded-full transition-colors relative ${checked ? 'bg-indigo-500' : 'bg-gray-300'}`}>
          <div
            className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-4' : ''}`}
          />
        </div>
      </div>
      <div className="min-w-0">
        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
          {label}
        </span>
        {description && <p className="text-xs text-gray-400 mt-0.5">{description}</p>}
      </div>
    </label>
  );
}

interface SliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  description?: string;
}

function Slider({ label, value, onChange, min, max, description }: SliderProps) {
  return (
    <label className="block p-3 rounded-xl hover:bg-gray-50 transition-colors">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-xs font-mono text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
          {value}
        </span>
      </div>
      {description && <p className="text-xs text-gray-400 mb-2">{description}</p>}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 rounded-full bg-gray-200 accent-indigo-500 cursor-pointer"
      />
    </label>
  );
}

export default function Demo() {
  const [multi, setMulti] = useState(false);
  const [searchable, setSearchable] = useState(true);
  const [clearable, setClearable] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [separator, setSeparator] = useState(false);
  const [dropdownHandle, setDropdownHandle] = useState(true);
  const [create, setCreate] = useState(false);
  const [selectAll, setSelectAll] = useState(false);
  const [keepOpen, setKeepOpen] = useState(false);
  const [autoFocus, setAutoFocus] = useState(false);
  const [backspaceDelete, setBackspaceDelete] = useState(true);
  const [closeOnSelect, setCloseOnSelect] = useState(false);
  const [keepSelectedInList, setKeepSelectedInList] = useState(true);
  const [defaultMenuIsOpen, setDefaultMenuIsOpen] = useState(false);
  const [color, setColor] = useState('#6366f1');
  const [dropdownHeight, setDropdownHeight] = useState(300);
  const [dropdownPosition, setDropdownPosition] = useState<'bottom' | 'top' | 'auto'>('bottom');
  const [direction, setDirection] = useState<'ltr' | 'rtl' | 'auto'>('ltr');
  const [values, setValues] = useState<Country[]>([]);

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
          Interactive Demo
        </h1>
        <p className="text-lg text-gray-500">
          Toggle every feature and see the component update in real time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls Panel */}
        <div className="lg:col-span-1 space-y-6">
          {/* Toggles */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700">Features</h3>
            </div>
            <div className="p-2 divide-y divide-gray-100">
              <Toggle
                label="Multi-select"
                checked={multi}
                onChange={setMulti}
                description="Allow selecting multiple values"
              />
              <Toggle
                label="Searchable"
                checked={searchable}
                onChange={setSearchable}
                description="Show search input"
              />
              <Toggle
                label="Clearable"
                checked={clearable}
                onChange={setClearable}
                description="Show clear all button"
              />
              <Toggle
                label="Disabled"
                checked={disabled}
                onChange={setDisabled}
                description="Disable all interactions"
              />
              <Toggle
                label="Loading"
                checked={loading}
                onChange={setLoading}
                description="Show loading indicator"
              />
              <Toggle
                label="Separator"
                checked={separator}
                onChange={setSeparator}
                description="Show vertical separator"
              />
              <Toggle
                label="Dropdown handle"
                checked={dropdownHandle}
                onChange={setDropdownHandle}
                description="Show chevron icon"
              />
              <Toggle
                label="Create new"
                checked={create}
                onChange={setCreate}
                description="Allow creating new entries"
              />
              <Toggle
                label="Select all"
                checked={selectAll}
                onChange={setSelectAll}
                description="Show select/clear all buttons"
              />
              <Toggle
                label="Keep open"
                checked={keepOpen}
                onChange={setKeepOpen}
                description="Force dropdown open"
              />
              <Toggle
                label="Auto focus"
                checked={autoFocus}
                onChange={setAutoFocus}
                description="Focus input on mount"
              />
              <Toggle
                label="Backspace delete"
                checked={backspaceDelete}
                onChange={setBackspaceDelete}
                description="Remove last value with backspace"
              />
              <Toggle
                label="Close on select"
                checked={closeOnSelect}
                onChange={setCloseOnSelect}
                description="Close dropdown after selecting"
              />
              <Toggle
                label="Keep selected in list"
                checked={keepSelectedInList}
                onChange={setKeepSelectedInList}
                description="Show selected items in dropdown"
              />
              <Toggle
                label="Default menu open"
                checked={defaultMenuIsOpen}
                onChange={setDefaultMenuIsOpen}
                description="Open dropdown on mount"
              />
            </div>
          </div>

          {/* Sliders & Selects */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700">Configuration</h3>
            </div>
            <div className="p-2 divide-y divide-gray-100">
              <div className="p-3">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Color</label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-8 h-8 rounded-lg border border-gray-200 cursor-pointer"
                  />
                  <span className="text-xs font-mono text-gray-500">{color}</span>
                </div>
              </div>

              <Slider
                label="Dropdown height"
                value={dropdownHeight}
                onChange={setDropdownHeight}
                min={100}
                max={600}
                description="Minimum height in pixels"
              />

              <div className="p-3">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Dropdown position
                </label>
                <div className="flex gap-2">
                  {(['bottom', 'top', 'auto'] as const).map((pos) => (
                    <button
                      key={pos}
                      onClick={() => setDropdownPosition(pos)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-colors ${
                        dropdownPosition === pos
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}>
                      {pos}
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-3">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Direction</label>
                <div className="flex gap-2">
                  {(['ltr', 'rtl', 'auto'] as const).map((dir) => (
                    <button
                      key={dir}
                      onClick={() => setDirection(dir)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium uppercase transition-colors ${
                        direction === dir
                          ? 'bg-indigo-100 text-indigo-700'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}>
                      {dir}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Live Demo */}
        <div className="lg:col-span-2 space-y-6">
          <div className="docs-demo rounded-2xl border border-gray-200 p-8 bg-white min-h-[400px]">
            <div className="max-w-md mx-auto">
              <Select
                options={options}
                values={values}
                multi={multi}
                searchable={searchable}
                clearable={clearable}
                disabled={disabled}
                loading={loading}
                separator={separator}
                dropdownHandle={dropdownHandle}
                create={create}
                selectAll={selectAll}
                keepOpen={keepOpen}
                autoFocus={autoFocus}
                backspaceDelete={backspaceDelete}
                closeOnSelect={closeOnSelect}
                keepSelectedInList={keepSelectedInList}
                defaultMenuIsOpen={defaultMenuIsOpen}
                color={color}
                dropdownHeight={`${dropdownHeight}px`}
                dropdownPosition={dropdownPosition}
                direction={direction as 'ltr' | 'rtl'}
                placeholder="Select a country..."
                labelField="label"
                valueField="value"
                onCreateNew={(item) => console.log('Created:', item)}
                onDropdownOpen={() => console.log('Dropdown opened')}
                onDropdownClose={() => console.log('Dropdown closed')}
                onChange={(values) => {
                  setValues(values);
                  console.log('Values changed:', values);
                }}
              />
            </div>
          </div>

          {/* Selected Values Display */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-700">Selected Values</h3>
              <span className="text-xs font-mono text-gray-400">{values.length} selected</span>
            </div>
            <div className="p-4">
              {values.length === 0 ? (
                <p className="text-sm text-gray-400 italic">No values selected</p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {values.map((v) => (
                    <span
                      key={v.value}
                      className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                      {v.label}
                      <button
                        onClick={() => setValues(values.filter((x) => x.value !== v.value))}
                        className="ml-0.5 hover:text-indigo-900 transition-colors">
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Quick Config Code */}
          <div className="rounded-2xl border border-gray-200 overflow-hidden">
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700">Current Configuration</h3>
            </div>
            <div className="p-4 bg-gray-900 rounded-b-2xl">
              <pre className="text-sm text-gray-300 overflow-x-auto font-mono leading-relaxed">
                {`<Select
  options={options}
  values={values}
  onChange={setValues}
${multi ? '  multi\n' : ''}${!searchable ? '  searchable={false}\n' : ''}${clearable ? '  clearable\n' : ''}${disabled ? '  disabled\n' : ''}${loading ? '  loading\n' : ''}${separator ? '  separator\n' : ''}${!dropdownHandle ? '  dropdownHandle={false}\n' : ''}${create ? '  create\n' : ''}${selectAll ? '  selectAll\n' : ''}${keepOpen ? '  keepOpen\n' : ''}${autoFocus ? '  autoFocus\n' : ''}${!backspaceDelete ? '  backspaceDelete={false}\n' : ''}${closeOnSelect ? '  closeOnSelect\n' : ''}${!keepSelectedInList ? '  keepSelectedInList={false}\n' : ''}${defaultMenuIsOpen ? '  defaultMenuIsOpen\n' : ''}  color="${color}"
  dropdownHeight="${dropdownHeight}px"
  dropdownPosition="${dropdownPosition}"
  direction="${direction}"
/>`}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
