import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionApiService } from "@/features/transactions/api/transactionApi";
import { useAuthStore } from "@/features/auth/stores/auth.store";
import { toast } from 'sonner';
// import type { AxiosError } from "axios";
// import type { ApiErrorResponse } from "@/types/api";

export function useCreateTransaction() {
    const queryClient = useQueryClient();
    const { user } = useAuthStore();

    // create transaction mutation
    const createTransactionMuation = useMutation({
        mutationFn: transactionApiService.createTransaction,
        onSuccess: (transactionData) => {
            const { account_id, transfer_account_id, transaction_amount, transaction_type, created_at } = transactionData.data;
            // 1. Invalidate query
            queryClient.invalidateQueries({ queryKey: ['account', account_id] });
            if (transaction_type === 'TRANSFER' && transfer_account_id) {
                queryClient.invalidateQueries({ queryKey: ['account', transfer_account_id] });
            }
            queryClient.invalidateQueries({ queryKey: ['balance-trend', user?.uid] });
            queryClient.invalidateQueries({ queryKey: ['dashboard-card-data', user?.uid] });
            queryClient.invalidateQueries({ queryKey: ['pie-charts'] });
            queryClient.invalidateQueries({ queryKey: ['account', 'transactions'], });
            // queryClient.invalidateQueries({ queryKey: ['', user?.uid] });
            // queryClient.invalidateQueries({ queryKey: ['dashboard-card-data', user?.uid] });

            // console.log('transactionData.data.account_id: ', account_id);

            /**
             * 2. Optimistically update cache (optional, for instant UI feedback)
             * - skip for TRANSFERs to avoid incorrect calculations
             */
            queryClient.setQueryData(['balance-trend', user?.uid], (oldData: any) => {
                if (!oldData || !Array.isArray(oldData) || oldData.length === 0) return oldData;

                // Get the latest balance
                const latestBalance = oldData[oldData.length - 1].total_balance;

                // Calculate new balance based on transaction type
                const transactionAmount = transaction_amount;
                const transactionType = transaction_type; // e.g., 'income' or 'expense'
                const newBalance = transactionType === 'INCOME'
                    ? latestBalance + transactionAmount
                    : latestBalance - transactionAmount;

                // Create new point (use transaction date if available, else current date)
                const transactionDate = created_at || new Date().toISOString().split('T')[0]; // Assuming date is a string like 'YYYY-MM-DD'
                const newPoint = { date: transactionDate, total_balance: newBalance };

                // Return updated array
                return [...oldData, newPoint];
            });


            // 3. Show success message (toast)
            const description = transaction_type === 'TRANSFER' && transfer_account_id
                ? `Transferred ${transaction_amount} from account ${account_id} to ${transfer_account_id}.`
                : `Logged ${transaction_amount} as ${transaction_type} to account ${account_id}.`;

            toast.success("Transaction added successfully", {
                description,
                duration: 3000,
                classNames: {
                    title: "!text-green-900",
                    description: "!text-xs !text-green-700",
                    toast: "!bg-green-200 !border-green-300",
                }
            });
        },

        onError: (transactionErrorData: any) => {
            toast.error("Error creating transaction", {
                description: `${transactionErrorData.response?.data.message ?? 'An error occurred'}`,
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
        createTransaction: createTransactionMuation.mutate,
        createTransactionAsync: createTransactionMuation.mutateAsync,
        isCreating: createTransactionMuation.isPending,
        isError: createTransactionMuation.isError,
        error: createTransactionMuation.error,
    }
}