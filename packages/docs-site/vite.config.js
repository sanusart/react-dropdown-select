import crypto from 'node:crypto';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

const libSrc = path.resolve(__dirname, '../react-dropdown-select/src/index.tsx');
const rootPkg = path.resolve(__dirname, '../react-dropdown-select/package.json');

// Dev-only helper for testing the `styleNonce` prop against a strict CSP.
// Serves csp-test.html with `style-src 'self' 'nonce-…'` and exposes the same
// nonce to the page so a <Select styleNonce> can opt into it.
function cspTestPlugin() {
  const nonce = crypto.randomBytes(16).toString('base64');
  return {
    name: 'csp-test',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url && req.url.includes('csp-test.html')) {
          res.setHeader('Content-Security-Policy', `style-src 'self' 'nonce-${nonce}'`);
        }
        next();
      });
    },
    transformIndexHtml(html) {
      if (!html.includes('csp-test')) return null;
      return {
        html,
        tags: [
          {
            tag: 'script',
            children: `window.__CSP_NONCE__=${JSON.stringify(nonce)};`,
            injectTo: 'head',
          },
        ],
      };
    },
  };
}

export default defineConfig({
  base: '/react-dropdown-select/',
  plugins: [react(), tailwindcss(), cspTestPlugin()],
  resolve: {
    alias: {
      'react-dropdown-select': libSrc,
      'root-pkg': rootPkg,
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
});
