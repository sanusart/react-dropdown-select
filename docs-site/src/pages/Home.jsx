import { Link } from 'react-router-dom';
import CodeBlock from '../components/CodeBlock';
import { version } from 'root-pkg';

const installCode = `npm install react-dropdown-select`;

const quickStartCode = `import Select from 'react-dropdown-select';

const options = [
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
];

function App() {
  const [values, setValues] = useState([]);

  return (
    <Select
      options={options}
      values={values}
      onChange={(values) => setValues(values)}
      multi
      searchable
      clearable
    />
  );
}`;

const features = [
  {
    title: 'Single & Multi Select',
    description:
      'Support for both single and multi-select modes with full control over selected values.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      </svg>
    )
  },
  {
    title: 'Full Render Overrides',
    description:
      'Replace any visual component with your own renderer. Content, dropdown, items, options, inputs — everything is customizable.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
        />
      </svg>
    )
  },
  {
    title: 'Portal Support',
    description:
      'Render the dropdown in any DOM node. Perfect for modals, iframes, or containers with overflow hidden.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
    )
  },
  {
    title: 'Auto Positioning',
    description:
      'Automatically flips the dropdown to open above when there is not enough space below. Works with portals too.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
        />
      </svg>
    )
  },
  {
    title: 'RTL Support',
    description:
      'Full right-to-left layout support with the direction prop. Works with Arabic, Hebrew, and other RTL languages.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
        />
      </svg>
    )
  },
  {
    title: 'Create New Entries',
    description:
      'Allow users to create custom options on the fly from search input. Perfect for tag inputs and freeform entry.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
      </svg>
    )
  },
  {
    title: 'Keyboard Navigation',
    description:
      'Full keyboard support with arrow keys, Enter to select, Escape to close, Tab navigation, and Backspace to delete.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
        />
      </svg>
    )
  },
  {
    title: 'Lightweight',
    description:
      'Only 2 runtime dependencies (Emotion for CSS-in-JS). Tree-shakable ESM and UMD builds under 20kB.',
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    )
  }
];

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <div className="text-center space-y-6 py-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-sm font-medium text-indigo-700">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />v{version}
        </div>
        <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
          A better dropdown
          <br />
          <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            for React
          </span>
        </h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed">
          Customizable, accessible, and performant. With full render-prop overrides, portal support,
          auto-positioning, and keyboard navigation.
        </p>
        <div className="flex items-center justify-center gap-4 pt-4">
          <Link
            to="/getting-started"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-500/25">
            Get Started
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </Link>
          <Link
            to="/demo"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition-colors">
            Live Demo
          </Link>
        </div>
      </div>

      {/* Install */}
      <div className="max-w-lg mx-auto">
        <CodeBlock code={installCode} language="bash" title="Install" />
      </div>

      {/* Quick Start */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Quick Start</h2>
          <p className="text-gray-500">Up and running in under a minute.</p>
        </div>
        <CodeBlock code={quickStartCode} language="jsx" title="App.jsx" showLineNumbers />
      </div>

      {/* Features Grid */}
      <div>
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Why react-dropdown-select?</h2>
          <p className="text-gray-500 max-w-lg mx-auto">
            Built for real-world applications that need more than a basic dropdown.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="p-6 rounded-2xl border border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/30 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4 group-hover:bg-indigo-200 transition-colors">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center py-10 rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-purple-50 border border-indigo-100">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to build?</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Explore the full API, try the interactive demo, or browse dozens of examples.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/demo"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition-colors">
            Interactive Demo
          </Link>
          <Link
            to="/examples"
            className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
            Examples
          </Link>
          <Link
            to="/api"
            className="px-5 py-2.5 rounded-xl bg-gray-100 text-gray-700 font-medium hover:bg-gray-200 transition-colors">
            API Reference
          </Link>
        </div>
      </div>
    </div>
  );
}
