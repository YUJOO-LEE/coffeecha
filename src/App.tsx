import '@/assets/globals.css';
import routers from '@/router';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import React from 'react';
import { RouterProvider } from 'react-router-dom';

// eslint-disable-next-line react-refresh/only-export-components
export const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <RouterProvider router={routers} />
        </LocalizationProvider>
      </Provider>
    </QueryClientProvider>
  )
}

export default App
