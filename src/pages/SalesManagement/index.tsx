import ClientList from '@/pages/SalesManagement/components/ClientList';
import Layout from '@/components/Layout';
import React from 'react';

const SalesManagementPage = (): React.ReactNode => {
  return (
    <Layout>
      <ClientList />
    </Layout>
  );
}

export default SalesManagementPage;