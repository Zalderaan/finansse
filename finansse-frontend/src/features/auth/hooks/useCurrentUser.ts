import { useQuery } from "@tanstack/react-query";
import { authApiService } from "../api/authApi";
import { useAuthStore } from "../stores/auth.store";
import type { User } from "../auth.types";

export function useCurrentUser(options?: { 
    enabled?: boolean; 
    refetchOnMount?: boolean;
}) {
    const storedUser = useAuthStore(state => state.user);
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    const query = useQuery<User>({
        queryKey: ['auth', 'currentUser'],
        queryFn: authApiService.getCurrentUser,
        initialData: storedUser || undefined,
        enabled: isAuthenticated && (options?.enabled ?? true),
        staleTime: 5 * 60 * 1000, // 5 minutes
        gcTime: 10 * 60 * 1000, // 10 minutes
        refetchOnMount: options?.refetchOnMount ?? 'always',
        retry: (failureCount, error: any) => {
            // Don't retry on auth errors
            if (error?.response?.status === 401) return false;
            return failureCount < 2;
        },
    });

    return {
        user: query.data || storedUser,
        isLoading: query.isLoading && !storedUser, // Don't show loading if we have cached data
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
        isStale: query.isStale,
        isFetching: query.isFetching,
    };
}