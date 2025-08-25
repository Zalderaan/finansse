import { useParams } from "react-router-dom"
import { useGetAccDetails } from "../hooks/useGetAccDetails";

export function AccountDetails() {
    const { accountId } = useParams();
    if (!accountId) return <span>Invalid account ID</span>;
    const { account, isLoading, isError } = useGetAccDetails(accountId);
    console.log('account details: ', account);

    return (
        <>  
            {/**
             * TODO: include details in transactions (start with backend)  
             */ 
            }
            <span>Account details page</span>
            <span>Account ID: { account?.account_id }</span>
        </>
    )
}