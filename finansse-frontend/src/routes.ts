import { createBrowserRouter } from "react-router-dom";
import { LandingPage } from "@/pages/LandingPage";
import { NotFound } from "@/pages/NotFound";
import { DashboardPage } from "@/pages/dashboard/DashboardPage";
import { DashboardLayout } from "@/pages/dashboard/DashboardLayout";
import { LoginPage } from "@/pages/auth/LoginPage";
import { RegisterPage } from "@/pages/auth/RegisterPage";
import { ProfilePage } from "@/pages/profile/ProfilePage";
import { ProtectedRoute } from "@/features/auth/components/ProtectedRoute";
import { AccountPage } from "@/pages/accounts/AccountPage";
import { BudgetPage } from "@/pages/budgets/BudgetPage";
import { AccountDetails } from "@/features/accounts/components/AccountDetails";
import TestPage from "@/features/accounts/components/testpage";


export const router = createBrowserRouter([
    { path: "/*", Component: NotFound },
    { path: "/", Component: LandingPage },
    { path: "/login", Component: LoginPage },
    { path: "/register", Component: RegisterPage },

    {
        Component: ProtectedRoute,
        children: [
            {
                Component: DashboardLayout,
                children: [
                    {
                        path: "/dashboard",
                        children: [
                            { index: true, Component: DashboardPage },
                            { path: "accounts", Component: AccountPage },
                            { path: "accounts/:accountId", Component: AccountDetails},
                            { path: "budgets", Component: BudgetPage },
                            { path: "test", Component: TestPage },
                        ]
                    },

                    { path: "/me", Component: ProfilePage },
                ]
            },
        ]
    },
]);

