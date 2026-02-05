import { useMutation, useQueryClient } from '@tanstack/react-query';
import { accountApiService } from '../api/accountApi';
import { toast } from 'sonner';

export function useDeleteAccount() {
    const queryClient = useQueryClient();

    const deleteAccountMutation = useMutation({
        mutationFn: (accountId: string) => accountApiService.deleteAccount(accountId),
        onSuccess: (data, accountId) => {
            queryClient.removeQueries({ queryKey: ['account', accountId] })
            queryClient.invalidateQueries({ queryKey: ['accounts'] }); // invalidate queries to trigger refetch

            toast.success("Account deleted successfully", {
                description: `${data.data.account_type} account ${data.data.account_name} has been deleted `,
                duration: 3000,
                classNames: {
                    title: "!text-green-900",
                    description: "!text-xs !text-green-700",
                    toast: "!bg-green-200 !border-green-300",
                }
            });
        },
        onError: (error) => {
            toast.error("There was a problem deleting your account", {
                description: error?.message || "Please try again.",
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
        deleteAcc: deleteAccountMutation.mutate,
        deleteAccAsync: deleteAccountMutation.mutateAsync,
        isDeleting: deleteAccountMutation.isPending,
        isError: deleteAccountMutation.isError,
        error: deleteAccountMutation.error,
    }
}