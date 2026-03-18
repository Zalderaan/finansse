import { useEffect, useState } from 'react';
import { useAuthStore } from '../stores/auth.store';

export function useIsAuthenticated() {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);
    const [hasHydrated, setHasHydrated] = useState(
        useAuthStore.persist.hasHydrated()
    );

    useEffect(() => {
        const unsub = useAuthStore.persist.onHydrate(() => setHasHydrated(false));
        const unsubFinish = useAuthStore.persist.onFinishHydration(() => setHasHydrated(true));
        return () => { unsub(); unsubFinish(); };
    }, []);

    return { isAuthenticated, isLoading: !hasHydrated }
}
