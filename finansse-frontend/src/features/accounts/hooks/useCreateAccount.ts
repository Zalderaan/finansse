import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountApiService } from '@/features/accounts/api/accountApi';

export function useCreateAccount() {
    const queryClient = useQueryClient();

    // create account mutation
    const createAccountMutation = useMutation({
        mutationFn: accountApiService.createAccount,
        onSuccess: (data) => {
            // 1. Invalidate queries to then refetch accounts list

            // 2. Show success message (toast)

            // 3. Update cache for accounts list

            // 4. Pre-fetch individual account data
        },
        onError: (data) => {
            
        }
    });

    return {
        createAcc: createAccountMutation.mutate,
        createAccAsync: createAccountMutation.mutateAsync,
        isCreating: createAccountMutation.isPending,
        isError: createAccountMutation.isError,
    }
}