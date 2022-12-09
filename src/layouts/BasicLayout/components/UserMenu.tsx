import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../hooks/query";
import { queryClient } from "../../../main";

const UserMenu: FC = () => {
  const navigate = useNavigate();

  const { username } = getCurrentUser();

  return (
    <div className="flex h-full">
      <Dropdown
        overlay={
          <Menu
            className="w-[150px]"
            items={[
              {
                label: "个人中心",
                key: "1",
                icon: <UserOutlined />,
                onClick: () => navigate("/account/center"),
              },
              {
                label: "个人设置",
                key: "2",
                icon: <SettingOutlined />,
                onClick: () => navigate("/account/setting"),
              },
              {
                type: "divider",
              },
              {
                label: "退出登录",
                key: "3",
                icon: <LogoutOutlined />,
                onClick: () => {
                  localStorage.removeItem("token");
                  queryClient.clear();
                  navigate("/login");
                },
              },
            ]}
          />
        }
      >
        <span className="flex items-center cursor-pointer px-3 hover:bg-gray-50">
          <Avatar
            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
            size="small"
          />
          <span className="ml-2 align-middle">{username}</span>
        </span>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
