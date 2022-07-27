import {
  AppstoreOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { AuthRouterObject } from "react-router-auth-plus";
import { Navigate } from "react-router-dom";
import BasicLayout from "./layouts/BasicLayout";
import Application from "./pages/application";
import Home from "./pages/home";
import Login from "./pages/login";
import NotFound from "./pages/404";
import Setting from "./pages/account/setting";
import Center from "./pages/account/center";

export interface MetaRouterObject extends AuthRouterObject {
  name?: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
  hideChildrenInMenu?: boolean;
  children?: MetaRouterObject[];
}

export const routers: MetaRouterObject[] = [
  { path: "/", element: <Navigate to="/home" replace /> },
  { path: "/login", element: <Login /> },
  {
    element: <BasicLayout />,
    children: [
      {
        path: "/home",
        element: <Home />,
        name: "主页",
        icon: <HomeOutlined />,
      },
      {
        path: "/account",
        name: "个人",
        icon: <UserOutlined />,
        children: [
          {
            path: "/account",
            element: <Navigate to="/account/center" replace />,
          },
          {
            path: "/account/center",
            name: "个人中心",
            element: <Center />,
          },
          {
            path: "/account/setting",
            name: "个人设置",
            element: <Setting />,
            auth: ["setting"],
          },
        ],
      },
      {
        path: "/application",
        element: <Application />,
        auth: ["application"],
        name: "应用",
        icon: <AppstoreOutlined />,
      },
    ],
  },
  { path: "*", element: <NotFound /> },
];
