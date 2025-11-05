// import { useQuery } from "@tanstack/react-query";
// import { categoriesApiService } from "@/features/categories/api/categoriesApi";
// import type { DefaultCategoriesResponse } from '@/features/categories/types/categories.types'

// export function useGetDefaultCategories() {
//     const query = useQuery<DefaultCategoriesResponse>({
//         queryKey: ['categories', 'default'],
//         queryFn: () => categoriesApiService.getDefaultCategories(),
//         staleTime: 5 * 60 * 1000, // 5 minutes
//         gcTime: 10 * 60 * 1000,
//         refetchOnMount: "always",
//         retry: 2,
//     });

//     return {
//         /*
//          * first data: object returned by React/Tanstack Query's useQuery hook (cannot be changed)
//          * second data: property of the API response (coincidence that our API has a 'data' property)
//          */
//         default_categories: query.data?.data,
//         isLoading: query.isLoading,
//         isError: query.isError,
//         error: query.error,
//         refetch: query.refetch,
//         isStale: query.isStale
//     }
// }