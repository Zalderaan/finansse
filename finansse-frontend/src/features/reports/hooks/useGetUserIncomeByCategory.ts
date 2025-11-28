import { useQuery } from "@tanstack/react-query";
import { type IncomeByCategoryResponse } from "@/features/reports/types/reports.types";
import { reportsApiService } from "@/features/reports/api/reportsApi"
import { useAuthStore } from "@/features/auth/stores/auth.store";

export function useGetUserIncomeByCategory() {
    const { user } = useAuthStore();
    const query = useQuery<IncomeByCategoryResponse>({
        queryKey: ['pie-charts', 'income-by-category', user?.uid],
        queryFn: () => reportsApiService.getUserIncomeByCategory(),
    })

    return {
        userIncomeByCategory: query.data?.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error
    }
}