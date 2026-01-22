import React from 'react';
import { Outlet } from 'react-router-dom';

import AllowHeader from '../components/header/AllowHeader'

const NoTabsLayout = () => {
  return (
    <div className='bodyParent'>
      <div className='bodyChild'>
        <h2>헤더가 있는</h2> 
=======
    <div>
      {/* 뒤로가기버튼 헤더가 있는 */}
      <AllowHeader />
      
>>>>>>> 92ec50af7a65abd2e7839b4e1213122da025341a:src/layouts/NoTabsBackLayout.js
      <Outlet />
      </div>
    </div>
  );
};

export default NoTabsLayout;