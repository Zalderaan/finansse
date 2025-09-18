import { useQuery } from "@tanstack/react-query";
import { accountApiService } from "../api/accountApi";
import type { AccountsResponse } from "../types/accounts.type";
import { useAuthStore } from "@/features/auth/stores/auth.store";

export function useGetAccounts() {
    const { user } = useAuthStore()
    const query = useQuery<AccountsResponse>({
        queryKey: ['accounts', user?.uid],
        queryFn: () => accountApiService.getAccounts(),
    })
    return {
        /*
         * first data: object returned by React/Tanstack Query's useQuery hook (cannot be changed)
         * second data: property of the API response (coincidence that our API has a 'data' property)
         */
        accounts: query.data?.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
    }
}