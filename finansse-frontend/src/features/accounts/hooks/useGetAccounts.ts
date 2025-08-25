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
        accounts: query.data,
        isLoading: query.isLoading,
        isError: query.isError,
        error: query.error,
    }
}