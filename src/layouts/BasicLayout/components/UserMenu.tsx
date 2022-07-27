import {
  LogoutOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Dropdown, Menu } from "antd";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../../hooks/query";

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
                  navigate("/login");
                },
              },
            ]}
          />
        }
      >
        <span className="flex items-center cursor-pointer px-3 hover:bg-[#252a3d]">
          <Avatar src="https://joeschmoe.io/api/v1/random" size="small" />
          <span className="text-white ml-2 align-middle">{username}</span>
        </span>
      </Dropdown>
    </div>
  );
};

export default UserMenu;
