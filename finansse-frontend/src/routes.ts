import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { NotFound } from "@/pages/NotFound";
import { DashboardPage } from "./pages/dashboard/DashboardPage";
import { LoginPage } from "./pages/auth/LoginPage";
import { RegisterPage } from "./pages/auth/RegisterPage";

export const router = createBrowserRouter([
    { path: "/*", Component: NotFound },
    { path: "/", Component: LandingPage },
    { path: "/login", Component: LoginPage },
    { path: "/register", Component: RegisterPage },

    // TODO: protect routes
    { path: "/dashboard", Component: DashboardPage },
]);