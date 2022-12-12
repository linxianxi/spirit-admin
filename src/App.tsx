import { getAuthRouters } from "react-router-auth-plus";
import { routers } from "./routers/router";
import NotAuth from "./pages/403";
import { Suspense, useEffect, useMemo, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Router } from "@remix-run/router";
import { useCurrentUserQuery } from "./hooks/query";
import Loading from "./components/Loading";

// use router outside react component
export let router: Router;

function App() {
  const [loading, setLoading] = useState(false);
  const { data } = useCurrentUserQuery({
    enabled: !!localStorage.getItem("token"),
    onSuccess: () => {
      setLoading(false);
    },
  });

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoading(true);
    }
  }, []);

  const _router = useMemo(() => {
    const result = createBrowserRouter(
      getAuthRouters({
        auth: data?.data.data.auth || [],
        noAuthElement: () => <NotAuth />,
        // should not use isFetching here, because Login page fetch it too.
        render: (element) => (loading ? <Loading /> : element),
        routers,
      })
    );

    router = result;

    return result;
  }, [data?.data.data.auth, loading]);

  useEffect(() => {
    if (
      _router.state.location.pathname !== "/login" &&
      !localStorage.getItem("token")
    ) {
      _router.navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Suspense>
      <RouterProvider router={_router} />
    </Suspense>
  );
}

export default App;
