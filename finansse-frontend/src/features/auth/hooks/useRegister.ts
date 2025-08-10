import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApiService } from '@/features/auth/api/authApi';
import type { RegisterRequest } from '../auth.types';

export function useRegister() {
    const queryClient = useQueryClient();

    // login mutation
    const registerMutation = useMutation({
        mutationFn: authApiService.register,
        onSuccess: (data) => {
            queryClient.setQueryData(['auth', 'user'], data.user);
        },
    });

    return {
        register: registerMutation.mutate,
        registerAsync: registerMutation.mutateAsync,
        isRegistering: registerMutation.isPending,
        registerError: registerMutation.error,
    }
}