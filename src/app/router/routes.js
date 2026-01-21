// src/app/router/routes.js

// 고정할 헤더 푸터 (경우의 수)
import TabsLayout from "layouts/TabsLayout";
import NoTabsLayout from "layouts/NoTabsLayout";
import NoHeaderLayout from "layouts/NoHeaderLayout";
import AdminIndex from "pages/admin/AdminIndex";

// 하단탭 있는 화면들
import HomePage from "pages/home/HomePage";
import Login from "pages/auth/Login";
import Register from "pages/auth/Register";

export const routes = [
  // 1) 하단탭 있는 화면들 (TabsLayout)
  {
    element: <TabsLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
    ],
  },

  // 2) 하단탭 없는 화면들 (NoTabsLayout)
  {
    element: <NoTabsLayout />,
    children: [

    ],
  },

  // 3) 헤더도 없는 특수 화면 (NoHeaderLayout)
  {
    element: <NoHeaderLayout />,
    children: [
      
    ],
  },

  // 4) 관리자 페이지 (AdminPage)
  {
    path: "/admin",
    element: <AdminIndex />,
    children: [
      // /admin 접속 시 처음 보여줄 페이지 (index: true 사용)
      { index: true, element: <AdminDashboard /> }, 
    ],
  },

  // 4) 관리자 페이지 (AdminPage)

];