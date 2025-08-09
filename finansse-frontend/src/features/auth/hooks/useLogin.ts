import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApiService } from '@/features/auth/api/authApi';
import { useAuthStore } from '../stores/auth.store';

export function useLogin() {
    const queryClient = useQueryClient();
    const setAuth = useAuthStore(state => state.setAuth);

    // login mutation
    const loginMutation = useMutation({
        mutationFn: authApiService.login,
        onSuccess: (data) => {
            // console.log('🔍 Full API response:', data);
            // console.log('🔍 Access token:', data);
            setAuth(data.accessToken) // store auth token in zustand
            queryClient.setQueryData(['auth', 'user'], data.user_data); // store/cache user data
        },
    });

    return {
        login: loginMutation.mutate,
        loginAsync: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
    }
}