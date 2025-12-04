import { useIsAuthenticated } from '@/features/auth/hooks/useIsAuthenticated';
import { Navigate } from 'react-router-dom';


/**
 * 
 * @param redirectTo - the page to navigate to (if the user is authenticated)
 * @returns A navigate component if authenticated, otherwise null.
 * @example example usage:
 * ```
 * const authRedirect = useAuthRedirect("/login");
 * if (authRedirect) return authRedirect;
 * ```
 */
export function useAuthRedirect(redirectTo: string = "/") {
    const { isAuthenticated } = useIsAuthenticated();
    return isAuthenticated ? <Navigate to={redirectTo} replace /> : null;
}