import React from 'react';
import { Outlet } from 'react-router-dom';

import HaveNavi from '../components/nav/HaveNavi'

const NoHeaderLayout = () => {
  return (
    <div>
      {/* 헤더가 없는 */}
      
      <Outlet />

      
      {/* 푸터가 있는 */}
      <HaveNavi />
    </div>
  );
};

export default NoHeaderLayout;