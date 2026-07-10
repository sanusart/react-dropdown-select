import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

export default function CodeBlock({ code, language = 'jsx', title, showLineNumbers = false }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl overflow-hidden border border-gray-200 my-6">
      {title && (
        <div className="flex items-center justify-between px-4 py-2.5 bg-gray-50 border-b border-gray-200">
          <span className="text-sm font-medium text-gray-600">{title}</span>
          <button
            onClick={handleCopy}
            className="text-xs font-medium px-2.5 py-1 rounded-md hover:bg-gray-200 transition-colors text-gray-500"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      )}
      <SyntaxHighlighter
        language={language}
        style={oneDark}
        showLineNumbers={showLineNumbers}
        customStyle={{
          margin: 0,
          borderRadius: title ? '0 0 0.75rem 0.75rem' : '0.75rem',
          fontSize: '0.875rem',
          lineHeight: '1.7',
          padding: '1.25rem',
        }}
      >
        {code.trim()}
      </SyntaxHighlighter>
    </div>
  )
}
