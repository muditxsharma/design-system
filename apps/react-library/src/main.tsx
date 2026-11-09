import React from 'react';
import { createRoot } from 'react-dom/client';
import '@inverse_ratio/design-system/styles.css';
import './app.css';
import { App } from './App';
createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
