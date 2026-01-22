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

// 관리자 페이지 레이아웃
import DashboardPage from "components/admin/DashboardPage";
import UserAdminPage from "components/admin/UserAdminPage";
import PostAdminPage from "components/admin/PostAdminPage";
import ReportAdminPage from "components/admin/ReportAdminPage";
import TradeAdminPage from "components/admin/TradeAdminPage";
import EventAdminPage from "components/admin/EventAdminPage";
import CommunityAdminPage from "components/admin/CommunityAdminPage";

import GoodsTrade from "pages/goods/GoodsTrade";

export const routes = [
  // 1) 상단헤더(로고) + 하단탭O (TabsLayout)
  {
    element: <TabsLayout />,
    children: [
      { path: "/", element: <HomePage /> },
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
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  // 5) 관리자 페이지 (AdminPage)
  {
    path: "/admin",
    element: <AdminIndex />,
    children: [
      // /admin 접속 시 처음 보여줄 페이지 (index: true 사용)
      // { index: true, element: <AdminDashboard /> }, 
      {index: true, element:<DashboardPage />},
      {path: "users", element:<UserAdminPage />},
      {path: "posts", element:<PostAdminPage />},
      {path: "reports", element:<ReportAdminPage />},
      {path: "trades", element:<TradeAdminPage />},
      {path: "events", element:<EventAdminPage />},
      {path: "community", element:<CommunityAdminPage />}
    ],
  },

];