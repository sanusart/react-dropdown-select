import { useEffect, useState } from 'react';
import type { CSSProperties } from 'react';
import { createRoot } from 'react-dom/client';
import Select from 'react-dropdown-select';

declare global {
  interface Window {
    __CSP_NONCE__?: string;
  }
}

const nonce = window.__CSP_NONCE__;

const options = [
  { value: 1, label: 'One' },
  { value: 2, label: 'Two' },
  { value: 3, label: 'Three' },
];

const ROOT_MIN_HEIGHT = '36px';

const pageStyles: CSSProperties = {
  maxWidth: 720,
  margin: '40px auto',
  fontFamily: 'Inter, system-ui, sans-serif',
};

const codeStyles: CSSProperties = {
  background: '#f6f8fa',
  padding: '2px 6px',
  borderRadius: 4,
  fontSize: 13,
};

function CspTest() {
  const [withNonce, setWithNonce] = useState(true);
  const [stylesApplied, setStylesApplied] = useState<boolean | null>(null);

  useEffect(() => {
    const rootEl = document.querySelector<HTMLElement>('.react-dropdown-select');
    const minHeight = rootEl ? getComputedStyle(rootEl).minHeight : '';
    setStylesApplied(minHeight === ROOT_MIN_HEIGHT);
  }, [withNonce]);

  const blocked = stylesApplied === false;

  return (
    <div style={pageStyles}>
      <h1 style={{ fontSize: 24, margin: '0 0 4px' }}>react-dropdown-select — CSP test</h1>
      <p style={{ margin: '0 0 16px', color: '#57606a', fontSize: 14, lineHeight: 1.6 }}>
        This page is served with{' '}
        <code style={codeStyles}>Content-Security-Policy: style-src 'self' 'nonce-…'</code>. Without
        a nonce the injected <code style={codeStyles}>&lt;style&gt;</code> tag is blocked by the
        policy, so the dropdown renders unstyled. Toggle <code style={codeStyles}>styleNonce</code>{' '}
        and watch.
      </p>

      <div style={{ marginBottom: 16 }}>
        <button
          onClick={() => setWithNonce((v) => !v)}
          style={{ padding: '6px 12px', cursor: 'pointer', borderRadius: 4 }}>
          styleNonce: {withNonce ? 'provided' : 'not provided'}
        </button>
      </div>

      <Select
        key={withNonce ? 'with-nonce' : 'without-nonce'}
        styleNonce={withNonce ? nonce : undefined}
        options={options}
        values={[options[0]]}
        multi
        clearable
        placeholder="Pick some options…"
      />

      <p
        style={{
          marginTop: 24,
          fontSize: 14,
          color: blocked ? '#cf222e' : '#1a7f37',
          fontWeight: 600,
        }}>
        {stylesApplied === null
          ? 'Checking…'
          : blocked
            ? 'Styles blocked — the <style> tag has no matching nonce, so the dropdown is unstyled.'
            : 'Styles applied — the <style> tag carries the nonce and is allowed by the CSP.'}
      </p>
    </div>
  );
}

createRoot(document.getElementById('csp-root')!).render(<CspTest />);
