import {
  AppstoreOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React, { lazy } from "react";
import { AuthRouteObject } from "react-router-auth-plus";
import { Navigate } from "react-router-dom";

const BasicLayout = lazy(() => import("../layouts/BasicLayout"));
const Application = lazy(() => import("../pages/application"));
const Home = lazy(() => import("../pages/home"));
const Login = lazy(() => import("../pages/login"));
const NotFound = lazy(() => import("../pages/404"));
const Setting = lazy(() => import("../pages/account/setting"));
const Center = lazy(() => import("../pages/account/center"));

type MetaMenu = {
  name?: string;
  icon?: React.ReactNode;
  hideInMenu?: boolean;
  hideChildrenInMenu?: boolean;
};

export type MetaMenuAuthRouteObject = AuthRouteObject<MetaMenu>;

export const routers: MetaMenuAuthRouteObject[] = [
  { path: "/", element: <Navigate to="/home" replace /> },
  { path: "/login", element: <Login /> },
  {
    element: <BasicLayout />,
    genAuthRoutersProp: true,
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
