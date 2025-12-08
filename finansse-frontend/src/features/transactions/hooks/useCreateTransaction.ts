import { useMutation, useQueryClient } from "@tanstack/react-query";
import { transactionApiService } from "@/features/transactions/api/transactionApi";
import { useAuthStore } from "@/features/auth/stores/auth.store";
import { toast } from 'sonner';
import type { GetTransactionByAccResponse } from "../types/transactions.types";

export function useCreateTransaction() {
    const queryClient = useQueryClient();
    const { user } = useAuthStore();

    // create transaction mutation
    const createTransactionMuation = useMutation({
        mutationFn: transactionApiService.createTransaction,
        onSuccess: (transactionData) => {
            // 1. Invalidate query
            queryClient.invalidateQueries({ queryKey: ['account', transactionData.data.account_id] });
            queryClient.invalidateQueries({ queryKey: ['balance-trend', user?.uid] });
            queryClient.invalidateQueries({ queryKey: ['dashboard-card-data', user?.uid] });
            queryClient.invalidateQueries({ queryKey: ['pie-charts'] });
            // queryClient.invalidateQueries({ queryKey: ['', user?.uid] });
            // queryClient.invalidateQueries({ queryKey: ['dashboard-card-data', user?.uid] });


            console.log('transactionData.data.account_id: ', transactionData.data.account_id);


            // 2. Optimistically update cache (optional, for instant UI feedback)
            queryClient.setQueryData(['balance-trend', user?.uid], (oldData: any) => {
                if (!oldData || !Array.isArray(oldData) || oldData.length === 0) return oldData;

                // Get the latest balance
                const latestBalance = oldData[oldData.length - 1].total_balance;

                // Calculate new balance based on transaction type
                const transactionAmount = transactionData.data.transaction_amount;
                const transactionType = transactionData.data.transaction_type; // e.g., 'income' or 'expense'
                const newBalance = transactionType === 'income'
                    ? latestBalance + transactionAmount
                    : latestBalance - transactionAmount;

                // Create new point (use transaction date if available, else current date)
                const transactionDate = transactionData.data.created_at || new Date().toISOString().split('T')[0]; // Assuming date is a string like 'YYYY-MM-DD'
                const newPoint = { date: transactionDate, total_balance: newBalance };

                // Return updated array
                return [...oldData, newPoint];
            });

            // 3. Show success message (toast)
            toast.success("Transaction added successfully", {
                description: `Added ${transactionData.data.transaction_amount} as ${transactionData.data.transaction_type} to account ${transactionData.data.account_id}.`,
                duration: 3000,
                classNames: {
                    title: "!text-green-900",
                    description: "!text-xs !text-green-700",
                    toast: "!bg-green-200 !border-green-300",
                }
            })
        },

        // onError: (data) => {
        // }
    });

    return {
        createTransaction: createTransactionMuation.mutate,
        createTransactionAsync: createTransactionMuation.mutateAsync,
        isCreating: createTransactionMuation.isPending,
        isError: createTransactionMuation.isError,
        error: createTransactionMuation.error?.message,
    }
}