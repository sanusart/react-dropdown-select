# React dropdown select site

## CSP test page

`pnpm --filter docs-site dev` also serves a self-contained test for the `styleNonce` prop at
`http://localhost:5173/react-dropdown-select/csp-test.html`. It applies a strict
`style-src 'self' 'nonce-…'` header and verifies the component still renders. Dev-only; not part of
the static build.
