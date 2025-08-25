import { AccountCard } from "./AccountCard";
import { useGetAccounts } from "../hooks/useGetAccounts";


export function Accounts() {
    const { accounts, isLoading, isError, error } = useGetAccounts();
    console.log(accounts);
    return (
        <>
            <div className="flex flex-col space-y-4">
                {accounts?.data.map(account => (
                    <AccountCard key={account.account_id} {...account} />
                ))}
            </div>
        </>
    )
}