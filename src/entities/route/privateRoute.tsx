import { Center, Loader } from "@mantine/core";
import { ReactNode } from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
}

export function PrivateRoute({ children }: PrivateRouteProps) {
  const location = useLocation();
  const { isLogged, isLoading } = useSelector((state:any) => state.auth);
  if (isLoading) {
    return <Center className="h-screen"> <Loader /> </Center>;
  }
  if (!isLogged) {
    return <Navigate to="/auth/login" state={{ from: location }} />;
  }
  return children;
};
