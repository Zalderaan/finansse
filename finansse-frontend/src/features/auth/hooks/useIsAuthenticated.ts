import { useAuthStore } from '../stores/auth.store';

export function useIsAuthenticated() {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    return { isAuthenticated, isLoading: false } // more updates on isLoading and other relevant uses of this hook
}
