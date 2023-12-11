import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UsernameProvider } from './components';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <UsernameProvider>
      <App />
    </UsernameProvider>
  </React.StrictMode>
);
