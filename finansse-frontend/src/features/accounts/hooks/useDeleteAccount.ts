import { useMutation, useQueryClient, mutationOptions } from '@tanstack/react-query';
import { accountApiService } from '../api/accountApi';

export function useDeleteAccount() {
    const queryClient = useQueryClient();

    // TODO: look into optimistic deletion
    const deleteAccountMutation = useMutation({
        mutationFn: (accountId: string) => accountApiService.deleteAccount(accountId),
        onSuccess: (_data, accountId) => {
            queryClient.removeQueries({queryKey: ['account', accountId]})
            
            // invalidate queries to trigger refetch
            queryClient.invalidateQueries({ queryKey: ['accounts'] });
            
            // TODO: show successful deletion  toast
            //* Optional: close dialog and redirect
        },
        onError: () => {
            // TODO: show error toast "Failed to delete account"
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