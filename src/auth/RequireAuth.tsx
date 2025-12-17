import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth, type Role } from "./AuthProvider";

export function RequireAuth({
  role,
  children,
}: {
  role?: Role;
  children: React.ReactNode;
}) {
  const { user, isBootstrapping } = useAuth();
  const location = useLocation();

  if (isBootstrapping) return null;

  if (!user) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  if (role && user.role !== role) {
    return <Navigate to={`/${user.role}`} replace />;
  }

  return <>{children}</>;
}


