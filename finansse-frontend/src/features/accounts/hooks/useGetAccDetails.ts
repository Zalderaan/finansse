import { useQuery } from "@tanstack/react-query";
import { accountApiService } from '@/features/accounts/api/accountApi';
import type { Account, GetAccountResponse } from "../types/accounts.type";


export function useGetAccDetails(accountId: string) {

    const query = useQuery<GetAccountResponse>({
        queryKey: ['account', accountId],
        queryFn: () => accountApiService.getAccountById(accountId),
        enabled: !!accountId,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnMount: 'always',
        retry: (failureCount, error: any) => {
            return failureCount < 2;
        }
    });

    return {
        account: query.data?.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
        isStale: query.isStale,
    }
}