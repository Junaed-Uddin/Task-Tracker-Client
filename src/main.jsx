import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'; 
import 'tw-elements';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import AuthContext from './contexts/AuthContext';
import DarkModeContext from './contexts/DarkModeContext';
import { RouterProvider } from 'react-router-dom';
import { router } from './Router/Router.jsx';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContext>
      <DarkModeContext>
        <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
        <Toaster />
        </QueryClientProvider>
      </DarkModeContext>
    </AuthContext>
  </StrictMode>,
)
