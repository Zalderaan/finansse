import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApiService } from '@/features/auth/api/authApi';
import { toast } from 'sonner';

export function useRegister() {
    const queryClient = useQueryClient();

    // login mutation
    const registerMutation = useMutation({
        mutationFn: authApiService.register,
        onSuccess: (data) => {
            queryClient.setQueryData(['auth', 'user'], data.user);

            toast.success("Registration successful", {
                // description: `Welcome back, ${data.user_data.username}!`,
                description: `Welcome to Finansse, ${data.user.username}!`,
                duration: 3000,
                classNames: {
                    title: "!text-green-900",
                    description: "!text-xs !text-green-700",
                    toast: "!bg-green-200 !border-green-300",
                }
            })
        },
        onError: (error: any) => {
            toast.error("Error logging in", {
                description: `${error?.response?.data?.message || error?.message || "Registration failed"}`,
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
        register: registerMutation.mutate,
        registerAsync: registerMutation.mutateAsync,
        isRegistering: registerMutation.isPending,
        registerError: registerMutation.error,
    }
}