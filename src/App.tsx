import { Suspense, useEffect, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Center, Loader } from '@mantine/core'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { PrivateRoute } from "./entities";
import { useDispatch } from "react-redux";
import { loginSuccess, userLoadFailed, userLoading } from "./store/actions/auth";
import { GetCookie } from "./utils/cookie";

// Container
const Layout = lazy(() => import("./layouts/Layout"));
const Login = lazy(() => import("./pages/login/index"));
const NotFound = lazy(() => import("./pages/404"));


const queryClient = new QueryClient();

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userLoading());
    let token = GetCookie("token-zehin");
    if (!token) {
      dispatch(userLoadFailed());
    } else {
      dispatch(loginSuccess(token));
    }
  }, []);

  

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <Suspense fallback={<Center className="h-screen"><Loader /></Center>}>
        <Routes>
        <Route path="auth/login"  element={<Login />} />
          <Route
            path="/*"
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </QueryClientProvider>
  )
}

export default App
