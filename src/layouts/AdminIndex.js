import React from 'react';
import { Outlet } from 'react-router-dom';

function AdminIndex() {
  return (
    <div>
      {/* 왼쪽 사이드 메뉴 */}
      <aside className="admin-sidebar">
        <div className="admin-logo">DAM TTEUL 관리자</div>
        <nav className="admin-menu">
          {/* 여기에 메뉴 리스트(Link)들이 들어갑니다 */}
          <ul>
            <li>대시보드</li>
            <li>회원 관리</li>
            <li>게시물 관리</li>
          </ul>
        </nav>
        <button className="logout-btn">로그아웃</button>
      </aside>
      
      
      {/* 오른쪽 메인 콘텐츠 */}
      <main>
      </main>
    </div>
  );
}

export default AdminIndex;
