'use client';

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AuthSessionProvider } from './auth/AuthSessionProvider';

console.log('[app] booting');
console.log('[app] DATABASE_URL configured', Boolean(import.meta.env.VITE_DATABASE_URL || import.meta.env.DATABASE_URL));

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthSessionProvider>
      <App />
    </AuthSessionProvider>
  </React.StrictMode>,
);
