import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import DashboardLayout from "../layouts/DashboardLayout";
import { ProtectedLayout } from "../layouts/ProtectedLayout";
import PostList from "../pages/Post";
import PostCreate from "../pages/PostCreate";
import PostEdit from "../pages/PostEdit";
import PostDetail from "../pages/PostDetail";

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },

      {
        element: <ProtectedLayout />,
        children: [
          {
            element:<DashboardLayout/>,
            children:[
              {
                path:"/dashboard",
                element:<Dashboard/>
              },
              {
                path:"/post",
                element:<PostList/>
              },
              {
                path: "/post/create",
                element: <PostCreate />,
              },
              {
                path: "/post/:id/edit",
                element: <PostEdit />,
              },
              {
                path:"/post/:id",
                element:<PostDetail/>
              }
            ]
          },
        ],
      },

      {
        path: "/",
        element: <Navigate to="/login" replace />,
      },

      {
        path: "*",
        element: <Navigate to="/login" replace />,
      },
    ],
  },
]);
