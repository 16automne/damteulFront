import React from 'react';
// import { useNavigate } from 'react-router-dom';
import './styles/header.css';
import { Link } from 'react-router-dom';
import { TbBell } from "react-icons/tb";
import { FaAngleLeft } from "react-icons/fa6";

// title: 헤더 제목, showBack: 뒤로가기 버튼 유무
const TitleHeader = ({ title, showBack = true, rightElement }) => {
  // const navigate = useNavigate();

  return (
    <div className="logoHeader">
      {/* 왼쪽: 로고 */}
      <div className="logoHeaderLeft">
        <Link className="logoHeaderBack">
          <FaAngleLeft />
        </Link>
      </div>
      
      {/* 제목 */}
      <div className='logoHeaderTitle'>
        <h2>title</h2>
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

export default TitleHeader;