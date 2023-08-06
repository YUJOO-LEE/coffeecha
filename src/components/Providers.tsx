import routers from '@/router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Provider } from 'jotai';
import React from 'react';
import { RouterProvider } from 'react-router-dom';

export default function Providers() {
  const [queryClient] = React.useState(() => new QueryClient())

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
