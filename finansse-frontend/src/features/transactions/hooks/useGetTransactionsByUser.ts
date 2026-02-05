import { useQuery } from "@tanstack/react-query";
import { transactionApiService } from "../api/transactionApi";
import type { GetTransactionByUserResponse } from "../types/transactions.types";

export function useGetTransactionsByUser() {

    const query = useQuery<GetTransactionByUserResponse>({
        queryKey: ['account', 'transactions'],
        queryFn: () => transactionApiService.getTransactionByUser(),
    })

    return {
        user_transactions: query.data?.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
    }
}