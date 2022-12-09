import { getAuthRouters } from "react-router-auth-plus";
import { routers } from "./routers/router";
import NotAuth from "./pages/403";
import { Suspense, useMemo } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Router } from "@remix-run/router";
import { useCurrentUserQuery } from "./hooks/query";

// use router outside react component
export let router: Router;

function App() {
  // enabled false here, enabled in Login page or BasicLayout
  const { data } = useCurrentUserQuery({
    enabled: false,
  });
  const _router = useMemo(() => {
    const result = createBrowserRouter(
      getAuthRouters({
        auth: data?.data.data.auth || [],
        noAuthElement: () => <NotAuth />,
        routers,
      })
    );

    router = result;

    return result;
  }, [data?.data.data.auth]);

  return (
    <Suspense>
      <RouterProvider router={_router} />
    </Suspense>
  );
}

export default App;
