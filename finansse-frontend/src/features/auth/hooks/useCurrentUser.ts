import { useQuery } from '@tanstack/react-query';
import { authApiService } from '@/features/auth/api/authApi';
import { useAuthStore } from '../stores/auth.store';
import type { User } from '../auth.types';

export function useCurrentUser() {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const {
        data: user,
        isLoading,
        error,
    } = useQuery<User | null>({
        queryKey: ['auth', 'user'],
        queryFn: authApiService.getCurrentUser,
        enabled: isAuthenticated,
        retry: false,
    });

    return {
        user,
        isLoading,
        error,
    };
}
