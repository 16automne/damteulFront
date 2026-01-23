// src/app/router/routes.js

// 고정할 헤더 푸터 (경우의 수)
import TabsLayout from "layouts/TabsLogoLayout";
import NoTabsTitleLayout from "layouts/NoTabsTitleLayout";
import NoTabsBackLayout from "layouts/NoTabsBackLayout";
import NoHeaderLayout from "layouts/NoHeaderLayout";
import FullLayout from "layouts/FullLayout";
import AdminIndex from "pages/admin/AdminIndex";


// path모음
  // 1) 상단헤더(로고) + 하단탭O (TabsLayout)
  import HomePage from "pages/home/HomePage";
  import Community from "pages/community/Community";
  import Event from "pages/event/Event";
  import Nanum from "pages/nanum/Nanum";
  import Chat from "pages/chat/Chat";
  import MyPage from "pages/my/MyPage";
  // 2) 상단헤더(뒤로가기+제목) + 하단탭X (NoTabsTitleLayout)
  // 3) 상단헤더(뒤로가기) + 하단탭X (NoTabsBackLayout)
  import GoodsTrade from "pages/goods/GoodsTrade";
  import GoodsDetail from 'pages/goods/GoodsDetail';
  // 4) 상단헤더X + 하단탭O (NoHeaderLayout)
  // 5) 상단헤더X + 하단탭X (FullLayout)
  import Login from "pages/auth/Login";
  import Register from "pages/auth/Register";
  // 6) 관리자 페이지 (AdminPage)
  import DashboardPage from "components/admin/DashboardPage"
  import UserAdminPage from "components/admin/UserAdminPage"
  import PostAdminPage from "components/admin/PostAdminPage"
  import ReportAdminPage from "components/admin/ReportAdminPage"
  import TradeAdminPage from "components/admin/TradeAdminPage"
  import EventAdminPage from "components/admin/EventAdminPage"
  import CommunityAdminPage from "components/admin/CommunityAdminPage"

export const routes = [
  // 1) 상단헤더(로고) + 하단탭O (TabsLayout)
  {
    element: <TabsLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/community", element: <Community /> }, 
      { path: "/nanum", element: <Nanum /> },  
      { path: "/event", element: <Event /> },  
      { path: "/chat", element: <Chat /> }, 
      { path: "/mypage", element: <MyPage /> }, 
    ],
  },

  // 2) 상단헤더(뒤로가기+제목) + 하단탭X (NoTabsTitleLayout)
  {
    element: <NoTabsTitleLayout />,
    children: [
    ],
  },
  
  // 3) 상단헤더(뒤로가기) + 하단탭X (NoTabsBackLayout)
  {
    element: <NoTabsBackLayout />,
    children: [
      {path:"/goodstrade", element: <GoodsTrade />},
      {path:"/goodsdetail", element: <GoodsDetail />}
      
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

  // 6) 관리자 페이지 (AdminPage)
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