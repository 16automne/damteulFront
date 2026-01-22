import React from 'react';
import { Outlet } from 'react-router-dom';

import AllowHeader from '../components/header/AllowHeader'

const NoTabsLayout = () => {
  return (
    <div>
      {/* 뒤로가기버튼 헤더가 있는 */}
      <AllowHeader />
      
      <Outlet />

      <h2>푸터가 없는</h2>
    </div>
  );
};

export default NoTabsLayout;