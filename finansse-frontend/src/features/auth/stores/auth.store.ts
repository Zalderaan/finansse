import { create } from 'zustand'
import { persist } from 'zustand/middleware';
import { type User } from '../auth.types';

interface AuthStore {
    token: string | null;
    isAuthenticated: boolean;
    setAuth: (token: string) => void;
    user: User | null;
    setUser: (user: User) => void;
    logout: () => void;
    getToken: () => string | null;
}

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            token: null,
            isAuthenticated: false,
            user: null,
            setAuth: (token: string) => {
                set({ token, isAuthenticated: true });
            },
            setUser: (user: User) => {
                set({ user })
            },
            logout: () => {
                set({ token: null, user: null, isAuthenticated: false });
                localStorage.removeItem('auth-storage');
            },
            getToken: () => {
                console.log('token from store: ', get().token);
                return get().token;
            },
        }),
        {
            name: 'auth-storage',
        }
    )
);