import routers from '@/router';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import '@/assets/globals.css';

function App() {
  const [queryClient] = React.useState(() => new QueryClient());

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
