import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountApiService } from '@/features/accounts/api/accountApi';

export function useCreateAccount() {
    const queryClient = useQueryClient();

    // create account mutation
    const createAccountMutation = useMutation({
        mutationFn: accountApiService.createAccount,
        onSuccess: (accountData) => {
            // 1. Invalidate queries to then refetch accounts list
            queryClient.invalidateQueries({queryKey: ['accounts']})
            // 2. Show success message (toast)

            // 3. Update cache for accounts list
            queryClient.setQueryData(['account', accountData.data.account_id], accountData.data)
            // 4. Pre-fetch individual account data
            queryClient.prefetchQuery({
                queryKey: ['account', accountData.data.account_id],
                queryFn: () => accountApiService.getAccountById(String(accountData.data.account_id)),
            });
        },
        onError: (accountData) => {
            
        }
    });

    return {
        createAcc: createAccountMutation.mutate,
        createAccAsync: createAccountMutation.mutateAsync,
        isCreating: createAccountMutation.isPending,
        isError: createAccountMutation.isError,
        error: createAccountMutation.error?.message,
    }
}