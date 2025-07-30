import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApiService } from '@/features/auth/api/authApi';
import type { LoginRequest, RegisterRequest, User } from '../auth.types';
import { isUint8Array } from 'util/types';

export function useAuth() {
    const queryClient = useQueryClient();
    // query to get current user
    const {
        data: user,
        isLoading: isLoadingUser,
        error: userError,
    } = useQuery({
        queryKey: ['auth', 'user'],
        queryFn: authApiService.getCurrentUser,
        retry: false,
    });

    // login mutation
    const loginMutation = useMutation({
        mutationFn: authApiService.login,
        onSuccess: (data) => {
            queryClient.setQueryData(['auth', 'user'], null);
            queryClient.clear();
        },
    });

    return {
        user,
        isLoadingUser,
        userError,

        // Login
        login: loginMutation.mutate,
        loginAsync: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,

        // Computed states
        isAuthenticated: !!user,
        isLoading: isLoadingUser || loginMutation.isPending
    }
}