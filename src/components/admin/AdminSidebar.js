import React, { useState } from "react";
// import { Outlet } from "react-router-dom";

import '../admin/css/AdminSidebar1.css';

function AdminSidebar() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const handleLogout = () => {
    // 예시: 토큰 삭제
    localStorage.removeItem("accessToken");
  
    // 로그인 페이지로 이동 (react-router)
    window.location.href = "/login";
  };
  

  return (
    <>
    <aside className="sidebar">
      {/* 상단 로고 */}
      <div className="sidebar-logo">
        <img src={`${process.env.PUBLIC_URL}/images/logo1.png`} alt="Logo" />
      </div>

      {/* 관리자 프로필 */}
      <div className="sidebar-profile">
        <img src={`${process.env.PUBLIC_URL}/images/admin.png`} alt="admin" className="profile-img" />
        <div className="profile-info">
          <p className="name">관리자 이름</p>
          <p className="role">관리자</p>
        </div>
      </div>

      {/* 메뉴 */}
      <nav className="sidebar-menu">
        <ul>
          <li>대시보드</li>
          <li>사용자 관리</li>
          <li>게시글 관리</li>
          <li>신고 관리</li>
          <li>거래 관리</li>
          <li>이벤트 관리 / 공지사항</li>
          <li>커뮤니티 관리</li>
        </ul>
      </nav>

      {/* 하단 메뉴 */}
      <div className="sidebar-bottom">
        <ul>
          <li className="settings">⚙️ 환경설정</li>
          <li>
            <button className="logout" onClick={handleLogout}>
              로그아웃
            </button>
          </li>
        </ul>
      </div>
    </aside>
    </>
  );
}

export default AdminSidebar;