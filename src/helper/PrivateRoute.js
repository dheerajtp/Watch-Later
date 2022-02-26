import React from "react";
import { Outlet, Navigate } from "react-router-dom";

function PrivateRoute({ isAuthenticated }) {

  if (isAuthenticated) {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
}

export default PrivateRoute;
