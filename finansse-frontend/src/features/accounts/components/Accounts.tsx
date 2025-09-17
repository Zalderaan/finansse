import { AccountCard } from "./AccountCard";
import { useGetAccounts } from "../hooks/useGetAccounts";


export function Accounts() {
    const { accounts, isLoading, isError, error } = useGetAccounts();
    console.log(accounts);

    if (isLoading) {
        return <div>Loading accounts...</div>
    }

    if (isError) {
        return <div>Error: {error?.message}</div>
    }


    return (
        <>  
            <div className="flex flex-col space-y-4">
                {accounts?.map(account => (
                    <AccountCard key={account.account_id} {...account} />
                ))}
            </div>
        </>
    )
}