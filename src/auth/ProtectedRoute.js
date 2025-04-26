import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from './AuthContext';

export const ProtectedRoute = ({ roles = [], redirectTo = '/login' }) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to={redirectTo} />;
  }

  if (roles.length > 0 && !roles.includes(user.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <Outlet />;
};