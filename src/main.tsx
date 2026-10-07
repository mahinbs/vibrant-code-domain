import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { captureAttribution } from './lib/attribution';

declare global {
  interface Window { __PRERENDERED_HTML__?: string }
}

captureAttribution();

const container = document.getElementById('root');

if (container) {
  const here = window.location.pathname.replace(/\/+$/, '') || '/';
  if (container.getAttribute('data-prerendered') === here) {
    // The page arrived pre-rendered (scripts/prerender.mjs). The app's first loading placeholder
    // is that same HTML (App.tsx), so the page stays exactly as it is until the route's code has
    // loaded — no blank flash, no layout jump — and then the live page takes its place.
    window.__PRERENDERED_HTML__ = container.innerHTML;
  } else if (container.hasAttribute('data-prerendered')) {
    container.innerHTML = '';
  }
  createRoot(container).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
