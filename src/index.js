import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from '../src/components/App'
import { ViewProvider } from './contexts/ViewContext';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ViewProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ViewProvider>
  </React.StrictMode>
);
