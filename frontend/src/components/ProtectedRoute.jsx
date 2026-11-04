import { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getUser } from "../function/user.js";
import { PageSkeleton } from "./Skeleton.jsx";

const ProtectedRoute = ({ role }) => {
  const location = useLocation();
  const [session, setSession] = useState({ loading: true, user: null });

  useEffect(() => {
    let active = true;
    getUser()
      .then(({ data }) => {
        if (active) setSession({ loading: false, user: data });
      })
      .catch(() => {
        if (active) setSession({ loading: false, user: null });
      });
    return () => {
      active = false;
    };
  }, []);

  if (session.loading) {
    return <PageSkeleton />;
  }
  if (!session.user?.login) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }
  if (role && session.user.role !== role) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
