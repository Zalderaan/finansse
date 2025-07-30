import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApiService } from '@/features/auth/api/authApi';
import type { LoginRequest, RegisterRequest, User } from '../auth.types';
import { isUint8Array } from 'util/types';

export function useAuth() {
    const queryClient = useQueryClient();
    const hasAuthCookie = () => {
        return document.cookie.includes('authToken') || document.cookie.includes('auth');
    };

    // query to get current user
    const {
        data: user,
        isLoading: isLoadingUser,
        error: userError,
    } = useQuery({
        queryKey: ['auth', 'user'],
        queryFn: authApiService.getCurrentUser,
        enabled: hasAuthCookie(), // Only run if auth cookie exists
        retry: false,
    });

    // login mutation
    const loginMutation = useMutation({
        mutationFn: authApiService.login,
        onSuccess: (data) => {
            queryClient.setQueryData(['auth', 'user'], data.user);
        },
    });

    // register mutation
    const registerMutation = useMutation({
        mutationFn: authApiService.register,
        onSuccess: (data) => {
            queryClient.setQueryData(['auth', 'user'], data.user);
        },
    });

    // logout mutation
    const logoutMutation = useMutation({
        mutationFn: authApiService.logout,
        onSuccess: () => {
            queryClient.setQueryData(['auth', 'user'], null);
            queryClient.clear();
        }
    })

    return {
        user,
        isLoadingUser,
        userError,

        // Login
        login: loginMutation.mutate,
        loginAsync: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,

        // Register
        register: registerMutation.mutate,
        registerAsync: registerMutation.mutateAsync,
        isRegistering: registerMutation.isPending,
        registerError: registerMutation.error,

        // Logout
        logout: logoutMutation.mutate,
        logoutAsync: logoutMutation.mutateAsync,
        isLoggingOut: logoutMutation.isPending,
        logoutError: logoutMutation.error,

        // Computed states
        isAuthenticated: !!user,
        isLoading: isLoadingUser || loginMutation.isPending || registerMutation.isPending || logoutMutation.isPending
    }
}