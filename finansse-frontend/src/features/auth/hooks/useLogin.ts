import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApiService } from '@/features/auth/api/authApi';
import { useAuthStore } from '../stores/auth.store';
import { toast } from 'sonner';
import { useNavigate } from "react-router-dom";

export function useLogin() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const setAuth = useAuthStore(state => state.setAuth);
    const setUser = useAuthStore(state => state.setUser);

    // login mutation
    const loginMutation = useMutation({
        mutationFn: authApiService.login,
        onSuccess: (data) => {
            // console.log('🔍 Full API response:', data);
            // console.log('🔍 Access token:', data);
            setAuth(data.accessToken); // store auth token in zustand
            setUser(data.user_data); // store user in zustand
            queryClient.setQueryData(['auth', 'user'], data.user_data); // store/cache user data
            toast.success("Login successful", {
                description: `Welcome back, ${data.user_data.username}!`,
                duration: 3000,
                classNames: {
                    title: "!text-green-900",
                    description: "!text-xs !text-green-700",
                    toast: "!bg-green-200 !border-green-300",
                }
            });
            console.log('🚀 About to navigate to /dashboard');
            // Delay navigation to allow toast to render
            setTimeout(() => {
                console.log('🚀 About to navigate to /dashboard');
                navigate('/dashboard');
            }, 100);
        },
        
        onError: (error: any) => {
            toast.error("Error logging in", {
                description: `${error.response.data.message}`,
                duration: 3000,
                classNames: {
                    title: "!text-red-900",
                    description: "!text-xs !text-red-700",
                    toast: "!bg-red-200 !border-red-300",
                }
            })
        }
    });

    return {
        login: loginMutation.mutate,
        loginAsync: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
    }
}