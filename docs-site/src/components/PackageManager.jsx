import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const managers = [
  { id: 'pnpm', label: 'pnpm', command: 'pnpm add react-dropdown-select' },
  { id: 'npm', label: 'npm', command: 'npm install react-dropdown-select' },
  { id: 'yarn', label: 'yarn', command: 'yarn add react-dropdown-select' },
];

export default function PackageManager() {
  const [active, setActive] = useState('pnpm');
  const [copied, setCopied] = useState(false);
  const current = managers.find((m) => m.id === active);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(current.command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 my-4">
      <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
        <div className="flex gap-1">
          {managers.map((m) => (
            <button
              key={m.id}
              onClick={() => {
                setActive(m.id);
                setCopied(false);
              }}
              className={`text-sm font-medium px-3 py-1 rounded-md transition-colors ${
                active === m.id ? 'bg-gray-900 text-white' : 'text-gray-500 hover:bg-gray-200'
              }`}>
              {m.label}
            </button>
          ))}
        </div>
        <button
          onClick={handleCopy}
          className="text-xs font-medium px-2.5 py-1 rounded-md hover:bg-gray-200 transition-colors text-gray-500">
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language="bash"
        style={oneDark}
        customStyle={{
          margin: 0,
          borderRadius: '0 0 0.75rem 0.75rem',
          fontSize: '0.875rem',
          lineHeight: '1.7',
          padding: '1.25rem',
        }}>
        {current.command}
      </SyntaxHighlighter>
    </div>
  );
}
