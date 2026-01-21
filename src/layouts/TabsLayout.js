import React from 'react';
import { Outlet } from 'react-router-dom';

const TabsLayout = () => {
  return (
    <div className='bodyParent'>
      <div className='bodyChild'>
      <h2>헤더가 있는</h2>

      <Outlet />
      
      <h2>푸터가 있는</h2>
      </div>
    </div>
  );
};

export default TabsLayout;