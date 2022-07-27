import { FC, useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { MetaRouterObject } from "../../router";
import logo from "../../assets/spirit.png";
import UserMenu from "./components/UserMenu";
import SlideMenu from "./components/SliderMenu";

const Header = styled(Layout.Header)`
  height: 48px;
  line-height: 48px;
  padding: 0 16px;
`;

const Slider = styled(Layout.Sider)`
  .ant-layout-sider-children {
    display: flex;
    flex-direction: column;
  }
`;

interface BasicLayoutProps {
  routers?: MetaRouterObject[];
}

const BasicLayout: FC<BasicLayoutProps> = ({ routers }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="h-full">
      <Header className="flex justify-between">
        <div className="h-full">
          <a className="h-full flex items-center">
            <div className="flex items-center justify-center bg-white w-8 h-8 rounded">
              <img src={logo} className="w-5" />
            </div>
            <h1 className="text-white m-0 ml-3 text-lg">Spirit Admin</h1>
          </a>
        </div>
        <UserMenu />
      </Header>
      <Layout hasSider>
        <Slider collapsed={collapsed} collapsedWidth={50} width={200}>
          <div className="overflow-x-hidden overflow-y-auto flex-1">
            <SlideMenu routers={routers || []} />
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
        <Layout>
          <Layout.Content className="overflow-auto p-6">
            <Outlet context={{ routers }} />
          </Layout.Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
