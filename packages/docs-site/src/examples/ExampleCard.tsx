import { useState } from 'react';
import type { ReactNode } from 'react';
import CodeBlock from '../components/CodeBlock';

interface ExampleCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  code: string;
  source?: string;
}

export function ExampleCard({ title, description, children, code, source }: ExampleCardProps) {
  const [showCode, setShowCode] = useState(false);
  return (
    <div className="rounded-2xl border border-gray-200">
      <div className="px-6 py-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
        </div>
        {source && (
          <a
            href={source}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 shrink-0 text-xs font-medium text-gray-400 hover:text-indigo-600 transition-colors">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            View source
          </a>
        )}
      </div>
      <div className="docs-demo px-6 pb-6 bg-white">{children}</div>
      {code && (
        <div className="border-t border-gray-100">
          <button
            onClick={() => setShowCode(!showCode)}
            className="w-full flex items-center justify-between px-6 py-3 text-sm font-medium text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors">
            <span>{showCode ? 'Hide code' : 'Show code'}</span>
            <svg
              className={`w-4 h-4 transition-transform ${showCode ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
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
  );
}

export function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}
