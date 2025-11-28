import { useQuery, useQueryClient } from "@tanstack/react-query";
import { reportsApiService } from "@/features/reports/api/reportsApi";
import type { UserBalanceTrendResponse } from "@/features/reports/types/reports.types";
import { useAuthStore } from "@/features/auth/stores/auth.store";

export function useGetRunningBalance(period: string) {
    console.log("period: ", period);
    const { user } = useAuthStore();
    const query = useQuery<UserBalanceTrendResponse>({
        queryKey: ["balance-trend", user?.uid, period],
        queryFn: () => reportsApiService.getBalanceTrend(period)
    });


    return {
        balance_trend: query.data?.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error
    }
}

export function usePrefetchRunningBalance() {
    const queryClient = useQueryClient();
    const { user } = useAuthStore();

    return (period: string) => {
        queryClient.prefetchQuery({
            queryKey: ["balance-trend", user?.uid, period],
            queryFn: () => reportsApiService.getBalanceTrend(period),
            staleTime: 5 * 60 * 1000,
        });
    };
}