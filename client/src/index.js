import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from '../src/components/App'
import { ViewProvider } from './contexts/ViewContext';
import { BrowserRouter } from 'react-router-dom';
import { CustomerProvider } from './contexts/CustomerContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ViewProvider>
      <CustomerProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CustomerProvider>
    </ViewProvider>
  </React.StrictMode>
);
