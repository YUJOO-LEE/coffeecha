import { authAtom } from '@/atoms/auth';
import { Layout } from '@/pages';
import { LoginPage } from '@/pages/login';
import { useAtomValue } from 'jotai';
import React from 'react';

export const ProtectedPageWrapper = () => {
  const authData = useAtomValue(authAtom);

  if (authData.accessToken) {
    return <Layout />;
  }

  return <LoginPage />;
};