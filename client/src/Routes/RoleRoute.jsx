import { Navigate } from "react-router";
import useDbUser from "../hooks/useDbUser";
import LoadingSpinner from "../components/common/LoadingSpinner";

const RoleRoute = ({ children, allowedRoles = [] }) => {
  const { dbUser, isDbUserLoading } = useDbUser();

  if (isDbUserLoading) {
    return <LoadingSpinner />;
  }

  if (!dbUser) {
    return <Navigate to="/" replace />;
  }

  const userRoles = dbUser?.roles || [];

  // ============================================
  // User-এর অন্তত একটি required role আছে কি না
  // ============================================

  const hasPermission = allowedRoles.some((role) => userRoles.includes(role));

  if (!hasPermission) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default RoleRoute;
