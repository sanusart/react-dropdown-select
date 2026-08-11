import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// GitHub Pages SPA redirect support
// 404.html saves the full URL in sessionStorage, then redirects here.
// We restore the original URL so BrowserRouter sees the correct path.
(function () {
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect !== location.href) {
    history.replaceState(null, '', redirect);
  }
})();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/react-dropdown-select">
      <App />
    </BrowserRouter>
  </StrictMode>,
);
