import React from 'react';
import AdminSidebar from 'components/admin/AdminSidebar';
import AdminPage from 'components/admin/AdminPage';

const AdminIndex = () => {
  return (
    <div className='adminIndex'>
      <AdminSidebar />

      <AdminPage />

      {/* 테스트 */}
    </div>
  );
};

export default AdminIndex;