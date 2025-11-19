// src/routes/ProtectedRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@store/useAuthStore";

const ProtectedRoute = () => {
  const { isLogged, user } = useAuthStore();

  if (!isLogged || user?.Role !== "Admin") {
    return <Navigate to="/auth" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
