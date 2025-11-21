import { useQuery } from "@tanstack/react-query";
import { reportsApiService } from "@/features/reports/api/reportsApi";
import type { DashboardDataResponse } from "../types/reports.types";
import { useAuthStore } from "@/features/auth/stores/auth.store";

export function useGetDashboardData() {
    const { user } = useAuthStore();
    const query = useQuery<DashboardDataResponse>({
        queryKey: ['dashboard-card-data', user?.uid],
        queryFn: () => reportsApiService.getDashboardData(),
    });

    return {
        dashboard_card_data: query.data?.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error
    }
}