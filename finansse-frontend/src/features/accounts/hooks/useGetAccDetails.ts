import { useQuery } from "@tanstack/react-query";
import { accountApiService } from '@/features/accounts/api/accountApi';
import type { Account, GetAccountResponse } from "../types/accounts.type";


export function useGetAccDetails(accountId: string) {

    const query = useQuery<GetAccountResponse>({
        queryKey: ['account', Number(accountId)],
        queryFn: () => accountApiService.getAccountById(accountId),
        enabled: !!accountId,
        staleTime: 5 * 60 * 1000, // 5 minutes
        refetchOnMount: 'always',
        retry: (failureCount, error: any) => {
            return failureCount < 2;
        }
    });

    return {
        /*
         * first data: object returned by React/Tanstack Query's useQuery hook (cannot be changed)
         * second data: property of the API response (coincidence that our API has a 'data' property)
         */

        account: query.data?.data, // <---- first & seconnd data
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
        refetch: query.refetch,
        isStale: query.isStale,
    }
}