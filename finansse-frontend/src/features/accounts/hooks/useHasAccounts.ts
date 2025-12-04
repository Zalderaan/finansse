import { useGetAccounts } from "@/features/accounts/hooks/useGetAccounts";

/**
 * Custom hook to check if the user has any accounts.
 * @returns {boolean} True if the user has at least one account, false otherwise.
 * @example
 * ```tsx
 * const hasAccounts = useHasAccounts();
 * if (!hasAccounts) {
 *   // Show create account prompt
 * }
 * ```
 */

export function useHasAccounts() {
    const { accounts } = useGetAccounts();
    return accounts && accounts.length > 0;
}