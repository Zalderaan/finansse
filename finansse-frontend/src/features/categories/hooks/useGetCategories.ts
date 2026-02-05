import { useQuery } from "@tanstack/react-query";
import { categoriesApiService } from "@/features/categories/api/categoriesApi";
import type { CategoriesResponse } from "@/features/categories/types/categories.types";

export function useGetCategories() {
    const query = useQuery<CategoriesResponse>({
        queryKey: ['categories'],
        queryFn: () => categoriesApiService.getCategories(),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000,
        refetchOnMount: "always",
        retry: 2,
    })

    return {
        categories: query.data?.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetech: query.refetch,
        isStale: query.isStale
    }
}