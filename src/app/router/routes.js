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
  import MyProfile from 'pages/my/MyProfile';

  // 2) 상단헤더(뒤로가기+제목) + 하단탭X (NoTabsTitleLayout)
  import Support from 'pages/my/Support';
  import Faq from 'pages/my/Faq';
  import ContactUs from 'pages/my/ContactUs';
  import Reports from 'pages/my/Reports';
  import Notice from 'pages/my/Notice';
  import NoticeDetail from 'pages/my/NoticeDetail';
  import Setting from 'pages/my/Setting';
  import ChatDetail from "pages/chat/ChatDetail";

  // 3) 상단헤더(뒤로가기) + 하단탭X (NoTabsBackLayout)
  import CommWrite from "pages/community/CommWrite";
  import GoodsTrade from "pages/goods/GoodsTrade";
  import GoodsDetail from 'pages/goods/GoodsDetail';
  import NanumPost from 'pages/nanum/NanumPost';
  import NanumDetail from 'pages/nanum/NanumDetail';
  import MyProfileEdit from 'pages/my/MyProfileEdit';
  import MyBuynSell from 'pages/my/MyBuynSell';
  import MyHistory from 'pages/my/MyHistory';
  import MyWishlist from 'pages/my/MyWishlist';

  // 4) 상단헤더X + 하단탭O (NoHeaderLayout)

  // 5) 상단헤더X + 하단탭X (FullLayout)
  import FirstPage from "pages/intro/FirstPage";
  import Login from "pages/auth/Login";
  import Register from "pages/auth/Register";
  import AddressSearch from "pages/auth/AddressSearch";
  
  // 6) 관리자 페이지 (AdminPage)
  import DashboardPage from "components/admin/DashboardPage"
  import UserAdminPage from "components/admin/UserAdminPage"
  import PostAdminPage from "components/admin/PostAdminPage"
  import ReportAdminPage from "components/admin/ReportAdminPage"
  import TradeAdminPage from "components/admin/TradeAdminPage"
  import NoticeEventAdminPage from "components/admin/NoticeEventAdminPage"
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
      { path: "/myprofile", element: <MyProfile />},
    ],
  },

  // 2) 상단헤더(뒤로가기+제목) + 하단탭X (NoTabsTitleLayout)
  {
    element: <NoTabsTitleLayout />,
    children: [
      {path: "/mypage/support", element:<Support/>},
      {path:"/mypage/support/faq", element:<Faq/>},
      {path:"/mypage/support/contactus", element:<ContactUs />},
      {path:"/mypage/support/reports", element:<Reports />},
      {path:"/mypage/support/notice", element:<Notice />},
      {path:"/mypage/support/notice/noticedetail", element:<NoticeDetail />},
      {path:"/mypage/setting", element:<Setting />},
      {path:"/chat/chatdetail", element:<ChatDetail />}
    ],
  },
  
  // 3) 상단헤더(뒤로가기) + 하단탭X (NoTabsBackLayout)
  {
    element: <NoTabsBackLayout />,
    children: [
      {path:"/community/write", element: <CommWrite />},
      {path:"/goodstrade", element: <GoodsTrade />},
      {path:"/goodsdetail", element: <GoodsDetail />},
      {path:"/nanumpost", element:<NanumPost />},
      {path:"/nanumdetail", element:<NanumDetail />},
      {path:"/myprofileedit", element:<MyProfileEdit/>},
      {path:'/mypage/mybuynsell', element:<MyBuynSell/>},
      {path:"/mypage/myhistory", element:<MyHistory/>},
      {path:"/mypage/mywishlist", element:<MyWishlist/>}
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
      { path: "/intro", element: <FirstPage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/address", element: <AddressSearch /> },
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
      {path: "events", element:<NoticeEventAdminPage />},
      {path: "community", element:<CommunityAdminPage />}
    ],
  },

];