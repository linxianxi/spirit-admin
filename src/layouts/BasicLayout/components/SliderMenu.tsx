import { Menu } from "antd";
import { FC, useEffect, useState } from "react";
import { useAuthMenus } from "react-router-auth-plus";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { MetaRouterObject } from "../../../router";
import getMenuItems from "../utils/getMenuItems";

interface SlideMenuProps {
  routers: MetaRouterObject[];
}

const SlideMenu: FC<SlideMenuProps> = ({ routers }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const menuItems = getMenuItems(useAuthMenus(routers));

  const defaultOpenKey = menuItems.find((i) =>
    location.pathname.startsWith(i?.key as string)
  )?.key as string;

  useEffect(() => {
    setSelectedKeys([location.pathname]);
  }, [location.pathname]);

  return (
    <Menu
      style={{ borderRightColor: "white" }}
      className="h-full"
      mode="inline"
      selectedKeys={selectedKeys}
      defaultOpenKeys={defaultOpenKey ? [defaultOpenKey] : []}
      items={menuItems}
      onSelect={({ key }) => navigate(key)}
    />
  );
};

export default SlideMenu;
