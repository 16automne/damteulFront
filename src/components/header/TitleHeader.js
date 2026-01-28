import React from 'react';
import './styles/header.css';
import { Link } from 'react-router-dom';
import { TbBell } from "react-icons/tb";
import { FaAngleLeft } from "react-icons/fa6";
import { useScrollDirection } from './hooks/useScrollDirection'; 

function TitleHeader() {
  const isVisible = useScrollDirection();
  
  return (
    <div className={`headerWrap ${isVisible ? '' : 'hide'}`}>
      {/* 왼쪽: 로고 */}
      <div className="headerLeft">
        <Link className="headerIcon">
          <FaAngleLeft />
        </Link>
      </div>
      
      {/* 제목 */}
      <div className='headerTitle'>
        <h2>title</h2>
      </div>

      {/* 오른쪽: 알림 아이콘 */}
      <div className="headerRight">
        <Link className="headerIcon">
          <TbBell />
        </Link>
      </div>
    </div>
  );
}

export default TitleHeader;