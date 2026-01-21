import React from 'react'
import { Link } from 'react-router-dom';
import './styles/header.css';
import { TbBell } from "react-icons/tb";
import { FaAngleLeft } from "react-icons/fa6";

function AllowHeader() {
  return (
    <div className="logoHeader">
      {/* 왼쪽: 로고 */}
      <div className="logoHeaderLeft">
        <Link className="logoHeaderBack">
          <FaAngleLeft />
        </Link>
      </div>

      {/* 오른쪽: 알림 아이콘 */}
      <div className="logoHeaderRight">
        <Link className="logoHeaderBell">
          <TbBell />
        </Link>
      </div>
    </div>
  );
}

export default AllowHeader