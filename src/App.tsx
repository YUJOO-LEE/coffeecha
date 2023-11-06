import '@/assets/globals.css';
import { queryClient } from '@/apis/queries';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'jotai';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routers from './router';

export const App = ():React.ReactNode => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <SnackbarProvider>
            <RouterProvider router={routers} />
          </SnackbarProvider>
        </LocalizationProvider>
      </Provider>
    </QueryClientProvider>
  )
}
