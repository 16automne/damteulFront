import React from 'react'
import { Link } from 'react-router-dom';
import './styles/header.css';
import { TbBell } from "react-icons/tb";
import { FaAngleLeft } from "react-icons/fa6";
import { useScrollDirection } from './hooks/useScrollDirection'; 

function AllowHeader() {
  const isVisible = useScrollDirection();
  
  return (
    <div className={`headerWrap ${isVisible ? '' : 'hide'}`}>
      <div className="headerInner">
        {/* 왼쪽: 전페이지 */}
        <div className="headerLeft">
          <Link className="headerIcon">
            <FaAngleLeft />
          </Link>
        </div>
        
        {/* 오른쪽: 알림 아이콘 */}
        <div className="headerRight">
          <Link className="headerIcon">
            <TbBell />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AllowHeader