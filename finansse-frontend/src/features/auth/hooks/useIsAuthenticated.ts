import { useCurrentUser } from './useCurrentUser';

export function useIsAuthenticated() {
    const { user, isLoading } = useCurrentUser();
    return {
        isAuthenticated: !!user,
        isLoading,
    };
}
