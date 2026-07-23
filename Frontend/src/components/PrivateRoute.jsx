import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { authService } from '../services/authService';

const PrivateRoute = ({ children, allowedRoles }) => {
  const token = authService.getToken();
  const user = authService.getUser();

  if (!token || !user) {
    return <Navigate to="/" replace />;
  }

  const userRole = user.role || user.Role;

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;
