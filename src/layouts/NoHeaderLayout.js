import React from 'react';
import { Outlet } from 'react-router-dom';

const NoHeaderLayout = () => {
  return (
    <div>
      <h2>헤더가 없는</h2>
      
      <Outlet />

      <h2>푸터가 있는</h2> 
    </div>
  );
};

export default NoHeaderLayout;