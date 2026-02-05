import { useQuery } from "@tanstack/react-query";
import { type SpendingByCategoryResponse } from "@/features/reports/types/reports.types";
import { reportsApiService } from "@/features/reports/api/reportsApi"
import { useAuthStore } from "@/features/auth/stores/auth.store";

export function useGetUserSpendingByCategory() {
    const { user } = useAuthStore();
    const query = useQuery<SpendingByCategoryResponse>({
        queryKey: ['pie-charts', 'spending-by-category', user?.uid],
        queryFn: () => reportsApiService.getUserSpendingByCategory(),
    })

    return {
        userSpendByCategory: query.data?.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error
    }
}