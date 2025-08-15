import React from 'react';
import ReactDOM from 'react-dom/client';
import './global.css';
import App from '../src/components/App'
import { ViewProvider } from './contexts/ViewContext';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ViewProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ViewProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
