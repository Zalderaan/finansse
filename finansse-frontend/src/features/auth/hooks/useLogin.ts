import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApiService } from '@/features/auth/api/authApi';
import { useAuthStore } from '../stores/auth.store';
import { toast } from 'sonner';

export function useLogin() {
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

            // show success toast
            // toast.success("Login successful", {
            //     description: `Welcome back, ${data.user_data.username}!`,
            //     style: {
            //         backgroundColor: "#b9f8cf",
            //         border: "1px solid #7bf1a8",
            //         color: "#000000"
            //     },
            // })

            toast.success("Login successful", {
                description: `Welcome back, ${data.user_data.username}!`,
                style: {
                    backgroundColor: "#b9f8cf",
                    border: "1px solid #7bf1a8"
                },
                classNames: {
                    title: "!text-green-900",
                    description: "!text-green-700",
                }
            })
        },
        onError: () => {
            toast.error("Error logging in")
        }
    });

    return {
        login: loginMutation.mutate,
        loginAsync: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
    }
}