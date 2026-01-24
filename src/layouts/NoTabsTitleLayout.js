import React from 'react';
import { Outlet } from 'react-router-dom';

import TitleHeader from '../components/header/TitleHeader'

const NoHeaderTitleLayout = () => {
  return (
    <div className='bodyParent'>
      <div className='bodyChild'>
      {/* 뒤로가기버튼+제목 헤더가 있는 */}
      <TitleHeader />
      
      <Outlet />

      {/* 푸터가 없는 */}
      </div>
    </div>
  );
};

export default NoHeaderTitleLayout;