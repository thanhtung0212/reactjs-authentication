import React, { FC } from "react";
import { Navigate } from "react-router-dom";
import { RoutesNavigation } from "./navigations";
import { useAppSelector } from "./store/hooks";
import Storage, { StorageKeys } from "./utils/localStorage";

interface PrivateRouteProps {
  children?: React.ReactNode;
  fallbackPath?: RoutesNavigation;
}
const PrivateRoute: FC<PrivateRouteProps> = ({ children, fallbackPath }) => {
  const { user } = useAppSelector((state) => state.app);

  return user && Storage.getItem(StorageKeys.AccessToken) ? (
    <>{children}</>
  ) : (
    <Navigate to={fallbackPath || RoutesNavigation.Login} />
  );
};

export default PrivateRoute;
