import { useQuery } from "@tanstack/react-query";
import { reportsApiService } from "@/features/reports/api/reportsApi";
import type { UserBalanceTrendResponse } from "@/features/reports/types/reports.types";
import { useAuthStore } from "@/features/auth/stores/auth.store";

export function useGetRunningBalance(period: string) {

    const { user } = useAuthStore();
    const query = useQuery<UserBalanceTrendResponse>({
        queryKey: ["balance-trend", user?.uid],
        queryFn: () => reportsApiService.getBalanceTrend(period)
    });


    return {
        balance_trend: query.data?.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error
    }
}