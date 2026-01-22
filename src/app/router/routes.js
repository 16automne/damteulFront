// src/app/router/routes.js

// 고정할 헤더 푸터 (경우의 수)
import TabsLayout from "layouts/TabsLogoLayout";
import NoTabsTitleLayout from "layouts/NoTabsTitleLayout";
import NoTabsBackLayout from "layouts/NoTabsBackLayout";
import NoHeaderLayout from "layouts/NoHeaderLayout";
import FullLayout from "layouts/FullLayout";
import AdminIndex from "pages/admin/AdminIndex";

// 하단탭 있는 화면들
import HomePage from "pages/home/HomePage";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";

// 하단탭 없는 화면들
import GoodsTrade from 'pages/goods/GoodsTrade';

export const routes = [
  // 1) 상단헤더(로고) + 하단탭O (TabsLayout)
  {
    element: <TabsLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  // 2) 상단헤더(뒤로가기+제목) + 하단탭X (NoTabsTitleLayout)
  {
    element: <NoTabsTitleLayout />,
    children: [
      {path:"/goodstrade", element: <GoodsTrade />}
    ],
  },

  // 3) 상단헤더(뒤로가기) + 하단탭X (NoTabsBackLayout)
  {
    element: <NoTabsBackLayout />,
    children: [
      
    ],
  },

  // 4) 상단헤더X + 하단탭O (NoHeaderLayout)
  {
    element: <NoHeaderLayout />,
    children: [
      
    ],
  },

  // 5) 상단헤더X + 하단탭X (FullLayout)
  {
    element: <FullLayout />,
    children: [
      
    ],
  },

  // 5) 관리자 페이지 (AdminPage)
  {
    path: "/admin",
    element: <AdminIndex />,
    children: [
      // /admin 접속 시 처음 보여줄 페이지 (index: true 사용)
      // { index: true, element: <AdminDashboard /> }, 
    ],
  },

];