import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionApiService } from "@/features/transactions/api/transactionApi";
import { useAuthStore } from "@/features/auth/stores/auth.store";
import type { GetTransactionByAccResponse } from "../types/transactions.types";

export function useCreateTransaction() {
    const queryClient = useQueryClient();
    const { user } = useAuthStore();

    // create transaction mutation
    const createTransactionMuation = useMutation({
        mutationFn: transactionApiService.createTransaction,
        onSuccess: (transactionData) => {
            // 1. Invalidate query
            queryClient.invalidateQueries(
                { queryKey: ['account', transactionData.data.account_id ] }
            )

            console.log('transactionData.data.account_id: ', transactionData.data.account_id);


            // 2. Update cache

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