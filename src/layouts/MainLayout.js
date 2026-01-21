import React from 'react';
import { Outlet } from 'react-router-dom';

import LogoHeader from '../components/header/LogoHeader'
import HaveNavi from '../components/nav/HaveNavi'

const MainLayout = () => {
  return (
    <div className='bodyParent'>
      <div className='bodyChild'>
      <LogoHeader />

        <Outlet />

      <HaveNavi />
      </div>
    </div>
  );
};

export default MainLayout;