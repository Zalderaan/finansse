import { useAuthStore } from "@/features/auth/stores/auth.store";
import { DashboardCard } from "@/features/reports/components/DashboardCard";
import { BalanceChart } from "@/features/reports/components/BalanceCharts";
import { useGetDashboardData } from "@/features/reports/hooks/useGetDashboardData";
import { SpendingByCategory } from "@/features/reports/components/SpendingByCategory";
import { IncomeByCategory } from "@/features/reports/components/IncomeByCategory";
import { RecentTransactions } from "@/features/reports/components/RecentTransactions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { DashboardQuickActions } from "@/features/dashboard/components/DashboardQuickActions";
import { CreateAccountDialog } from "@/features/accounts/components/CreateAccountDialog";
import { AddCategoryDialog } from "@/features/categories/components/AddCategoryDialog";
import { AddTransactionDialog } from "@/features/transactions/components/AddTransactionDialog";

export function DashboardPage() {

    const user = useAuthStore(state => state.user);

    const { dashboard_card_data, isLoading, isError, error } = useGetDashboardData();
    const { totalIncome = 0, totalExpense = 0, currentBalance = 0 } = dashboard_card_data ?? {};
    const netSavings = totalIncome - totalExpense;
    return (
        <div className="grid grid-cols-1 gap-8">
            <header className="grid grid-cols-1 gap-2">
                <h1 className="font-normal text-2xl">Hello, {user?.username}!</h1>
                <p>Keep tracking your finances today</p>
            </header>

            {isError && (
                <Alert variant="destructive">
                    <AlertDescription>
                        Failed to load dashboard data: {error?.message || "Please try again."}
                    </AlertDescription>
                </Alert>
            )}

            {/* Quick Actions */}
            <DashboardQuickActions />

            {/* Dialog Render Area so that Quick Actions can access it*/}
            <CreateAccountDialog showTrigger={false} />
            <AddCategoryDialog showTrigger={false} />
            <AddTransactionDialog showTrigger={false} />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <DashboardCard color="green" title="Your income this month" value={totalIncome!} isLoading={isLoading} />
                <DashboardCard color="red" title="Your expenses this month" value={totalExpense!} isLoading={isLoading} />
                <DashboardCard color="blue" title="Current Balance" value={currentBalance!} isLoading={isLoading} />
                <DashboardCard color={netSavings >= 0 ? "green" : "red"} title="Net Savings This Month" value={netSavings} isLoading={isLoading} />
            </div>

            <div className="grid grid-cols-1 gap-4">
                <span className="font-normal text-2xl">Graphs</span>
                <RecentTransactions />
                <BalanceChart />
                <div className="flex flex-col sm:flex-row items-center justify-between space-x-3">
                    <SpendingByCategory />
                    <IncomeByCategory />
                </div>
            </div>
        </div>
    )
}