import { create } from 'zustand'

interface AuthStore {
    token: string | null;
    isAuthenticated: boolean;
    setAuth: (token: string) => void;
    logout: () => void;
    getToken: () => string | null;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
    token: null,
    isAuthenticated: false,
    setAuth: (token: string) => {
        set({ token, isAuthenticated: true });
    },

    logout: () => {
        set({ token: null, isAuthenticated: false });
    },

    getToken: () => {
        console.log('token from store: ', get().token);
        return get().token
    },
}));