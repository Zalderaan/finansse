import { useQuery, useQueryClient } from "@tanstack/react-query";
import { transactionApiService } from "../api/transactionApi";
import { useAuthStore } from "@/features/auth/stores/auth.store";
import type { GetTransactionByAccResponse } from "../types/transactions.types";

export function useGetTransactionsByAcc(accountId: string) {
    const { user } = useAuthStore();

    const query = useQuery<GetTransactionByAccResponse>({
        queryFn: () => transactionApiService.getTransactionByAcc(accountId),
        queryKey: ['transactions', user?.uid, accountId],
        enabled: !!accountId
    })

    return {
        transactions: query.data?.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
    }
}