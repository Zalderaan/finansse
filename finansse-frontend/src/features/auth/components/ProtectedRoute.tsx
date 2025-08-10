import { Navigate, Outlet } from "react-router-dom";
import { useIsAuthenticated } from "../hooks/useIsAuthenticated";

export function ProtectedRoute() {
    const { isAuthenticated, isLoading } = useIsAuthenticated();
    if (!isAuthenticated) return <Navigate to="login" replace />
    console.log('is authenticated: ', isAuthenticated);

    return (
        <Outlet />
    );
}