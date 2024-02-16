import { Center, Loader } from "@mantine/core";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

export function PrivateRoute({ children }:any) {
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
