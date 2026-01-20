import React from 'react';
import { Outlet } from 'react-router-dom';

import LogoHeader from '../components/header/LogoHeader'
import HaveNavi from '../components/nav/HaveNavi'

const MainLayout = () => {
  return (
    <div>
      <LogoHeader />
      <main>
        <Outlet />
      </main> 
      <HaveNavi />
    </div>
  );
};

export default MainLayout;