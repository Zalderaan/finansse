import { useMutation, useQueryClient } from "@tanstack/react-query";
import { accountApiService } from '@/features/accounts/api/accountApi';
import { toast } from 'sonner';

export function useCreateAccount() {
    const queryClient = useQueryClient();

    // create account mutation
    const createAccountMutation = useMutation({
        mutationFn: accountApiService.createAccount,
        onSuccess: (accountData) => {
            // 1. Invalidate queries to then refetch accounts list
            queryClient.invalidateQueries({ queryKey: ['accounts'] })
            // 2. Show success message (toast)
            toast.success("Account created successfully", {
                description: `, ${accountData.data.account_name}: ${accountData.data.account_type} has been created.`,
                duration: 3000,
                classNames: {
                    title: "!text-green-900",
                    description: "!text-xs !text-green-700",
                    toast: "!bg-green-200 !border-green-300",
                }
            });

            //! hidden because redundant
            // // 3. Update cache for accounts list
            // queryClient.setQueryData(['account', accountData.data.account_id], accountData.data)
            // // 4. Pre-fetch individual account data
            // queryClient.prefetchQuery({
            //     queryKey: ['account', accountData.data.account_id],
            //     queryFn: () => accountApiService.getAccountById(String(accountData.data.account_id)),
            // });
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