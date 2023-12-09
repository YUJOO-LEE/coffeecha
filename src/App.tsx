import { queryClient } from '@/apis/queries';
import '@/assets/globals.css';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { QueryClientProvider } from '@tanstack/react-query';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Provider as JotaiProvider } from 'jotai';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import routers from './router';

export const App = ():React.ReactNode => {
  return (
      <QueryClientProvider client={queryClient}>
        <SpeedInsights />
        <JotaiProvider>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <SnackbarProvider>
              <RouterProvider router={routers} />
            </SnackbarProvider>
          </LocalizationProvider>
        </JotaiProvider>
      </QueryClientProvider>
  )
}
