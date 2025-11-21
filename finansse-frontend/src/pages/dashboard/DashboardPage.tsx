import { useAuthStore } from "@/features/auth/stores/auth.store";
import { DashboardCard } from "./DashboardCard";
import { BalanceChart } from "@/features/reports/components/BalanceCharts";
import { useGetDashboardData } from "@/features/reports/hooks/useGetDashboardData";

export function DashboardPage() {

    const user = useAuthStore(state => state.user);

    const { dashboard_card_data, isLoading, isError, error } = useGetDashboardData();
    const { totalIncome = 0, totalExpense = 0, currentBalance = 0 } = dashboard_card_data ?? {};
    return (
        <div className="grid grid-cols-1 gap-8">
            <header className="grid grid-cols-1 gap-2">
                <h1 className="font-normal text-2xl">Hello, {user?.username}!</h1>
                <p>Continue managing your finances today</p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <DashboardCard color="green" title="Total Income" value={totalIncome!} isLoading={isLoading}/>
                <DashboardCard color="red" title="Total Expenses" value={totalExpense!} isLoading={isLoading}/>
                <DashboardCard color="blue" title="Current Balance" value={currentBalance!} isLoading={isLoading}/>
                <DashboardCard color="yellow" title="Total Income" value={1234} isLoading={isLoading}/>
            </div>

            <div className="grid grid-cols-1 gap-4">
                <span className="font-normal text-2xl">Graphs</span>
                <BalanceChart />
            </div>
        </div>
    )
}