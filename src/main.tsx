'use client';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthSessionProvider } from './auth/AuthSessionProvider';
import { ThemeProvider } from './theme/ThemeProvider';

console.log('[app] booting');
console.log('[app] DATABASE_URL configured', Boolean(import.meta.env.VITE_DATABASE_URL || import.meta.env.DATABASE_URL));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthSessionProvider>
        <App />
      </AuthSessionProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
