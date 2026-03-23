import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
        path: "/*",
        lazy: async () => {
            const { NotFound } = await import("@/pages/NotFound");
            return { Component: NotFound };
        },
    },
    {
        path: "/",
        lazy: async () => {
            const { LandingPage } = await import("@/pages/LandingPage");
            return { Component: LandingPage };
        },
    },
    {
        lazy: async () => {
            const { AuthRoute } = await import("@/features/auth/components/AuthRoute");
            return { Component: AuthRoute };
        },
        children: [
            {
                path: "/login",
                lazy: async () => {
                    const { LoginPage } = await import("@/pages/auth/LoginPage");
                    return { Component: LoginPage };
                },
            },
            {
                path: "/register",
                lazy: async () => {
                    const { RegisterPage } = await import("@/pages/auth/RegisterPage");
                    return { Component: RegisterPage };
                },
            },
        ],
    },
    {
        lazy: async () => {
            const { ProtectedRoute } = await import("@/features/auth/components/ProtectedRoute");
            return { Component: ProtectedRoute };
        },
        children: [
            {
                lazy: async () => {
                    const { DashboardLayout } = await import("@/pages/dashboard/DashboardLayout");
                    return { Component: DashboardLayout };
                },
                children: [
                    {
                        path: "/dashboard",
                        children: [
                            {
                                index: true,
                                lazy: async () => {
                                    const { DashboardPage } = await import("@/pages/dashboard/DashboardPage");
                                    return { Component: DashboardPage };
                                },
                            },
                            {
                                path: "accounts",
                                lazy: async () => {
                                    const { AccountPage } = await import("@/pages/accounts/AccountPage");
                                    return { Component: AccountPage };
                                },
                            },
                            {
                                path: "accounts/:accountId",
                                lazy: async () => {
                                    const { AccountDetails } = await import("@/pages/accounts/AccountDetails");
                                    return { Component: AccountDetails };
                                },
                            },
                            {
                                path: "budgets",
                                lazy: async () => {
                                    const { BudgetPage } = await import("@/pages/budgets/BudgetPage");
                                    return { Component: BudgetPage };
                                },
                            },
                            {
                                path: "categories",
                                lazy: async () => {
                                    const { CategoriesPage } = await import("@/pages/categories/CategoriesPage");
                                    return { Component: CategoriesPage };
                                },
                            },
                            {
                                path: "test",
                                lazy: async () => {
                                    const mod = await import("@/features/accounts/components/testpage");
                                    return { Component: mod.default };
                                },
                            },
                        ],
                    },
                    {
                        path: "/me",
                        lazy: async () => {
                            const { ProfilePage } = await import("@/pages/profile/ProfilePage");
                            return { Component: ProfilePage };
                        },
                    },
                ],
            },
        ],
    },
]);