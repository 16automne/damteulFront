import React from 'react';
import AdminSidebar from 'components/admin/AdminSidebar';
import AdminPage from 'components/admin/AdminPage';
import 'components/admin/css/AdminIndex.css'; // 위 CSS 임포트

const AdminIndex = () => {
  return (
    <div className='adminIndex'>
      <div className="adminSidebar">
        <AdminSidebar />
      </div>
      
      <div className="adminPage">
        <AdminPage />
      </div>
    </div>
  );
};

export default AdminIndex;

