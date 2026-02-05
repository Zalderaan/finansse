import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "../hooks/useIsAuthenticated";

export function AuthRoute() {
    const { isAuthenticated } = useIsAuthenticated();
    if (isAuthenticated) return <Navigate to="/dashboard" replace />
    return <Outlet />;
}