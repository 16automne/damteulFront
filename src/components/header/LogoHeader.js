import React from 'react'
import './styles/header.css';
import { Link } from 'react-router-dom';
import { TbBell } from "react-icons/tb";

const LogoHeader = () => {
  return (
    <div className="logoHeader">
      {/* 왼쪽: 로고 */}
      <div className="headerLeft">
        <Link className="headerIcon">
          <img src={`${process.env.PUBLIC_URL}/images/logo1.png`} alt="로고" />
        </Link>
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

export default LogoHeader