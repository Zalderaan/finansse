import { useQuery, useQueryClient } from "@tanstack/react-query";
import { transactionApiService } from "../api/transactionApi";
import { useAuthStore } from "@/features/auth/stores/auth.store";
import type { GetTransactionByAccResponse } from "../types/transactions.types";

export function useGetTransactionsByAcc(accountId: string) {

    const query = useQuery<GetTransactionByAccResponse>({
        queryKey: ['account', Number(accountId), 'transactions'],
        queryFn: () => transactionApiService.getTransactionByAcc(accountId),
    })

    console.log('account id in getbyacc: ', accountId);

    return {
        transactions: query.data?.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
    }
}