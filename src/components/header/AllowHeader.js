import React from 'react'
import { Link } from 'react-router-dom';
import './styles/header.css';
import { TbBell } from "react-icons/tb";
import { FaAngleLeft } from "react-icons/fa6";

function AllowHeader() {
  return (
    <div className="logoHeader">
      {/* 왼쪽: 로고 */}
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
  );
}

export default AllowHeader