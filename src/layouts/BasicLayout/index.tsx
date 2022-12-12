import { FC, Suspense, useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { MetaMenuAuthRouteObject } from "../../routers/router";
import logo from "../../assets/spirit.png";
import UserMenu from "./components/UserMenu";
import SlideMenu from "./components/SliderMenu";

const Header = styled(Layout.Header)`
  height: 56px;
  line-height: 56px;
  padding: 0 16px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
`;

const Slider = styled(Layout.Sider)`
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
    border-right: 1px solid rgba(0, 0, 0, 0.06);
  }
`;

interface BasicLayoutProps {
  authRouters?: MetaMenuAuthRouteObject[];
}

const BasicLayout: FC<BasicLayoutProps> = ({ authRouters = [] }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider style={{ background: "transparent", minHeight: "100%" }}>
      <Slider
        className="left-0 top-[56px]"
        style={{
          position: "fixed",
          height: "calc(100% - 56px)",
          background: "transparent",
        }}
        collapsed={collapsed}
        collapsedWidth={50}
        width={200}
      >
        <div className="overflow-x-hidden overflow-y-auto flex-1">
          <SlideMenu routers={authRouters} />
        </div>
        <div className="bg-white h-10 flex items-center pl-4 border-0 border-t border-solid border-t-gray-100">
          {!collapsed && (
            <MenuFoldOutlined
              className="text-lg"
              onClick={() => setCollapsed((prev) => !prev)}
            />
          )}
          {collapsed && (
            <MenuUnfoldOutlined
              className="text-lg"
              onClick={() => setCollapsed((prev) => !prev)}
            />
          )}
        </div>
      </Slider>
      <Layout style={{ background: "transparent", minHeight: "100vh" }}>
        <Header
          className="fixed flex justify-between top-0 w-full z-10"
          style={{ background: "white", right: 0 }}
        >
          <div className="h-full">
            <a className="h-full flex items-center">
              <div className="flex items-center justify-center bg-white w-8 h-8 rounded">
                <img src={logo} className="w-5" />
              </div>
              <h1 className="m-0 ml-3 text-lg">Spirit Admin</h1>
            </a>
          </div>
          <UserMenu />
        </Header>
        <Layout.Content id="container" className="pt-[56px] pl-[200px] m-6">
          <Suspense>
            <Outlet context={{ routers: authRouters }} />
          </Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
