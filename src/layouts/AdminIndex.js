// import React, { useState } from "react";
// import { Outlet } from "react-router-dom";
// import '../styles/Admin.css';

// function AdminIndex() {
//   const [openMenu, setOpenMenu] = useState(null);

//   const toggleMenu = (menu) => {
//     setOpenMenu(openMenu === menu ? null : menu);
//   };

//   return (
//     <aside className="sidebar">
//       {/* 상단 로고 */}
//       <div className="sidebar-logo">
//         <img src="/images/logo.png" alt="Logo" />
//       </div>

//       {/* 관리자 프로필 */}
//       <div className="sidebar-profile">
//         <img src="/images/admin-profile.jpg" alt="Admin" className="profile-img" />
//         <div className="profile-info">
//           <p className="name">관리자 이름</p>
//           <p className="role">관리자</p>
//         </div>
//       </div>

//       {/* 메뉴 */}
//       <nav className="sidebar-menu">
//         <ul>
//           <li>
//             <Link to="/">대시보드</Link>
//           </li>
//           <li>
//             <Link to="/users">사용자 관리</Link>
//           </li>
//           <li>
//             <Link to="/posts">게시글 관리</Link>
//           </li>
//           <li>
//             <Link to="/reports">신고 관리</Link>
//           </li>
//           <li>
//             <Link to="/trades">거래 관리</Link>
//           </li>

//           {/* 이벤트 관리 서브 메뉴 */}
//           <li>
//             <div
//               className="submenu-title"
//               onClick={() => toggleMenu("events")}
//             >
//               이벤트 관리
//             </div>
//             {openMenu === "events" && (
//               <ul className="submenu">
//                 <li>
//                   <Link to="/events/list">이벤트 목록</Link>
//                 </li>
//                 <li>
//                   <Link to="/events/add">이벤트 추가</Link>
//                 </li>
//               </ul>
//             )}
//           </li>

//           {/* 공지사항 관리 서브 메뉴 */}
//           <li>
//             <div
//               className="submenu-title"
//               onClick={() => toggleMenu("notices")}
//             >
//               공지사항 관리
//             </div>
//             {openMenu === "notices" && (
//               <ul className="submenu">
//                 <li>
//                   <Link to="/notices/list">공지사항 목록</Link>
//                 </li>
//                 <li>
//                   <Link to="/notices/add">공지사항 추가</Link>
//                 </li>
//               </ul>
//             )}
//           </li>

//           <li>
//             <Link to="/community">커뮤니티 관리</Link>
//           </li>
//         </ul>
//       </nav>
//     </aside>
//   );
// }

// export default AdminIndex;

import React, { useState } from "react";
import '../styles/Admin.css';

function AdminIndex() {
  const [openMenu, setOpenMenu] = useState(null);

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <aside className="sidebar">
      {/* 상단 로고 */}
      <div className="sidebar-logo">
        <img src={`${process.env.PUBLIC_URL}/images/logo1.png`} alt="Logo" />
      </div>W

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

          {/* 이벤트 관리 서브 메뉴 */}
          <li>
            <div
              className="submenu-title"
              onClick={() => toggleMenu("events")}
            >
              이벤트 관리
            </div>
            {openMenu === "events" && (
              <ul className="submenu">
                <li>이벤트 목록</li>
                <li>이벤트 추가</li>
              </ul>
            )}
          </li>

          {/* 공지사항 관리 서브 메뉴 */}
          <li>
            <div
              className="submenu-title"
              onClick={() => toggleMenu("notices")}
            >
              공지사항 관리
            </div>
            {openMenu === "notices" && (
              <ul className="submenu">
                <li>공지사항 목록</li>
                <li>공지사항 추가</li>
              </ul>
            )}
          </li>

          <li>커뮤니티 관리</li>
        </ul>
      </nav>

      {/* 하단 메뉴 */}
      <div className="sidebar-bottom">
        <ul>
          <li className="settings">⚙️ 환경설정</li>
          <li class="logout"><span class="logout-text">로그아웃</span></li>
        </ul>
      </div>
    </aside>
  );
}

export default AdminIndex;

