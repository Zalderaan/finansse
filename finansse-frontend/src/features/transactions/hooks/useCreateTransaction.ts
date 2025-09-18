import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionApiService } from "@/features/transactions/api/transactionApi";

export function useCreateTransaction() {
    const queryClient = useQueryClient();

    // create transaction mutation
    const createTransactionMuation = useMutation({
        mutationFn: transactionApiService.createTransaction,
        onSuccess: (transactionData) => {
            // 1. Invalidate query
            queryClient.invalidateQueries({queryKey: ['transactions', transactionData.data.account_id]})
            
            // 2. Update cache
            // queryClient.setQueryData(['transactions', transactionData.data.account_id], transactionData.data)
            
            // 3. Show success message (toast)
            
            
        },

        onError: (data) => {

        }
    });

    return {
        createTransaction: createTransactionMuation.mutate,
        createTransactionAsync: createTransactionMuation.mutateAsync,
        isCreating: createTransactionMuation.isPending,
        isError: createTransactionMuation.isError,
        error: createTransactionMuation.error?.message,
    }
}