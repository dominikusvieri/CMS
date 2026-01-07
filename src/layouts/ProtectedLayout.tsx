import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";


export function ProtectedLayout() {
  const token = useAuthStore((s) => s.token);

  if (!token) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}
