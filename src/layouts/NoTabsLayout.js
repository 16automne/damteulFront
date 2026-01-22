import React from 'react';
import { Outlet } from 'react-router-dom';

const NoTabsLayout = () => {
  return (
    <div className='bodyParent'>
      <div className='bodyChild'>
        <h2>헤더가 있는</h2> 
      <Outlet />
      </div>
    </div>
  );
};

export default NoTabsLayout;