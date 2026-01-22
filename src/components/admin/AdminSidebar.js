import React from "react";
import { NavLink } from "react-router-dom";
import '../admin/styles/AdminSidebar1.css';

function AdminSidebar() {
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/login";
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src={`${process.env.PUBLIC_URL}/images/logo1.png`} alt="Logo" />
      </div>

      <div className="sidebar-profile">
        <img src={`${process.env.PUBLIC_URL}/images/admin.png`} alt="admin" className="profile-img" />
        <div className="profile-info">
          <p className="name">관리자 이름</p>
          <p className="role">관리자</p>
        </div>
      </div>

      <nav className="sidebar-menu">
  <ul>
    {/* NavLink: 클릭 시 해당 페이지로 이동, isActive: 현재 선택된 링크 표시 */}
    <li>
      <NavLink 
        to="dashboard" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        대시보드
      </NavLink>
    </li>

    <li>
      <NavLink 
        to="users" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        사용자 관리
      </NavLink>
    </li>

    <li>
      <NavLink 
        to="posts" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        게시글 관리
      </NavLink>
    </li>

    <li>
      <NavLink 
        to="reports" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        신고 관리
      </NavLink>
    </li>

    <li>
      <NavLink 
        to="trades" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        거래 관리
      </NavLink>
    </li>

    <li>
      <NavLink 
        to="events" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        이벤트 관리 / 공지사항
      </NavLink>
    </li>

    <li>
      <NavLink 
        to="community" 
        className={({ isActive }) => isActive ? 'active' : ''}
      >
        커뮤니티 관리
      </NavLink>
    </li>
  </ul>
</nav>


      <div className="sidebar-bottom">
        <ul>
          <li className="settings">⚙️ 환경설정</li>
          <li>
            <button className="logout" onClick={handleLogout}>로그아웃</button>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default AdminSidebar;
