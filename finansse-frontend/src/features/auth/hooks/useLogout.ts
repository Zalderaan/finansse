import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApiService } from '@/features/auth/api/authApi';

export function useLogin() {
    const queryClient = useQueryClient();

    // login mutation
    const logoutMutation = useMutation({
        mutationFn: authApiService.login,
        onSuccess: (data) => {
            queryClient.setQueryData(['auth', 'user'], data.user);
        },
    });

    return {
        logout: logoutMutation.mutate,
        logoutAsync: logoutMutation.mutateAsync,
        isLoggingOut: logoutMutation.isPending,
        logoutError: logoutMutation.error,
    }
}