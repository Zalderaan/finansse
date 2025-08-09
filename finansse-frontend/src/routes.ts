import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { NotFound } from "@/pages/NotFound";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";
import { ProfilePage } from "./pages/profile/ProfilePage";
import { ProtectedRoute } from "./features/auth/components/ProtectedRoute";


export const router = createBrowserRouter([
    { path: "/*", Component: NotFound },
    { path: "/", Component: LandingPage },
    { path: "/login", Component: LoginPage },
    { path: "/register", Component: RegisterPage },

    {
        Component: ProtectedRoute,
        children: [
            {
                path: "/dashboard",
                children: [
                    { index: true, Component: DashboardPage }, // Default dashboard view
                    { path: "test", Component: LandingPage },       // /dashboard/test
                ],
            },
            { path: "/me", Component: ProfilePage },
        ]
    },
]);