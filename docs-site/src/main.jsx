import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

// GitHub Pages SPA redirect support
// 404.html redirects to /?/path — here we restore the real path
(function () {
  var redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  if (redirect && redirect !== location.href) {
    history.replaceState(null, null, redirect);
  }
})();

// Also handle the query-param based redirect from 404.html
(function () {
  var l = location;
  if (l.search && l.search.slice(1).includes('/')) {
    var path = l.search.slice(1).replace(/~and~/g, '&');
    history.replaceState(null, null, path);
  }
})();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
