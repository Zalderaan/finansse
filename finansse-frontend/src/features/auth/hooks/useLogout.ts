import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApiService } from '@/features/auth/api/authApi';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/auth.store';

export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const logout = useAuthStore(state => state.logout);

    // login mutation
    const logoutMutation = useMutation({
        mutationFn: authApiService.logout,
        onSuccess: () => {
            logout();
            queryClient.clear();
            navigate('/', { replace: true })
        },
        onError: (error) => {
            console.error('Logout API failed:', error);
            logout();
            queryClient.clear();
            navigate('/', { replace: true });
        }
    });

    return {
        logout: logoutMutation.mutate,
        logoutAsync: logoutMutation.mutateAsync,
        isLoggingOut: logoutMutation.isPending,
        logoutError: logoutMutation.error,
    }
}