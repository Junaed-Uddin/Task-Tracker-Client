import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthContext from './contexts/AuthContext';
import DarkModeContext from './contexts/DarkModeContext';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContext>
      <DarkModeContext>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </DarkModeContext>
    </AuthContext>
  </React.StrictMode>
);

reportWebVitals();
