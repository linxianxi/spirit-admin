import { ItemType } from "antd/lib/menu/hooks/useItems";
import { MetaRouterObject } from "../../../router";

const getMenuItems = (routers: MetaRouterObject[]): ItemType[] => {
  const menuItems = routers.reduce((total: ItemType[], router) => {
    if (router.name && !router.hideInMenu) {
      total?.push({
        key: router.path as string,
        icon: router.icon,
        label: router.name,
        children:
          router.children &&
          router.children.length > 0 &&
          !router.hideChildrenInMenu
            ? getMenuItems(router.children)
            : undefined,
      });
    }
    return total;
  }, []);

  return menuItems;
};

export default getMenuItems;
