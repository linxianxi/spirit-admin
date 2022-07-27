import { useAuthRouters } from "react-router-auth-plus";
import { routers } from "./router";
import NotAuth from "./pages/403";
import { Spin } from "antd";
import { useEffect, useLayoutEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCurrentUserQuery } from "./hooks/query";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const { data, isFetching } = useCurrentUserQuery();

  useEffect(() => {
    if (!localStorage.getItem("token") && location.pathname !== "/login") {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    if (location.pathname === "/login" && data?.data.code === 0) {
      navigate("/home");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.data.code]);

  return useAuthRouters({
    auth: data?.data.data.auth || [],
    render: (element) =>
      isFetching ? (
        <div className="flex justify-center items-center h-full">
          <Spin size="large" />
        </div>
      ) : (
        element
      ),
    noAuthElement: () => <NotAuth />,
    routers,
  });
}

export default App;
