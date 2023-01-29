import { FC, Suspense, useEffect, useState } from "react";
import { Layout } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { MetaMenuAuthRouteObject } from "../../routers/router";
import logo from "../../assets/spirit.png";
import UserMenu from "./components/UserMenu";
import SlideMenu from "./components/SliderMenu";
import { currentUserQueryKey, useCurrentUserQuery } from "../../hooks/query";
import Loading from "../../components/Loading";
import { useQueryClient } from "@tanstack/react-query";

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
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { isFetching } = useCurrentUserQuery({
    enabled:
      !queryClient.getQueryData(currentUserQueryKey) &&
      !!localStorage.getItem("token"),
  });

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFetching) {
    return <Loading />;
  }

  return (
    <Layout hasSider className="!bg-transparent !min-h-full">
      <Slider
        className="left-0 top-[64px] !fixed !bg-transparent h-[calc(100%-64px)]"
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
      <Layout className="!bg-transparent !min-h-[100vh]">
        <Layout.Header className="fixed right-0 top-0 flex justify-between !bg-white w-full z-10 !px-[16px] !py-0 border-0 border-b border-b-[black]/[0.06] border-solid">
          <div className="h-full">
            <a className="h-full flex items-center">
              <div className="flex items-center justify-center bg-white w-8 h-8 rounded">
                <img src={logo} className="w-5" />
              </div>
              <h1 className="m-0 ml-3 text-lg">Spirit Admin</h1>
            </a>
          </div>
          <UserMenu />
        </Layout.Header>
        <Layout.Content id="container" className="pt-[64px] pl-[200px] m-6">
          <Suspense>
            <Outlet context={{ routers: authRouters }} />
          </Suspense>
        </Layout.Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
