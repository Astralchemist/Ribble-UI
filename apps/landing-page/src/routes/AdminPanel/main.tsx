import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/admin.css';

// Import KansoUI core styles
import '@kanso-ui/core/dist/styles.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
