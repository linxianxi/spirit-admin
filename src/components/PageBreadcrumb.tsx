import { Breadcrumb } from "antd";
import { FC } from "react";
import {
  Link,
  matchRoutes,
  useLocation,
  useOutletContext,
} from "react-router-dom";
import { MetaMenuAuthRouteObject } from "../routers/router";

const PageBreadcrumb: FC = () => {
  const location = useLocation();
  const { routers } = useOutletContext<{
    routers: MetaMenuAuthRouteObject[];
  }>();
  const match = matchRoutes(routers, location);

  const breadcrumbs = (match || []).reduce(
    (total: MetaMenuAuthRouteObject[], current) => {
      if ((current.route as MetaMenuAuthRouteObject).name) {
        total.push(current.route);
      }
      return total;
    },
    []
  );

  return (
    <Breadcrumb>
      {breadcrumbs.map((i, index) => (
        <Breadcrumb.Item key={i.path}>
          {index === breadcrumbs.length - 1 ? (
            i.name
          ) : (
            <Link to={i.path as string}>{i.name}</Link>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default PageBreadcrumb;
