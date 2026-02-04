import { useGetTransactionsByAcc } from "@/features/transactions/hooks/useGetTransactionsByAcc";
import { useParams } from "react-router-dom";
import { TransactionCard } from "./TransactionCard";


export function TransactionList() {
    const { accountId } = useParams();
    if (!accountId) return <span>Invalid account ID</span>;
    const { transactions, isLoading: isLoadingAccTransactions, isError: isErrorAccTransactions, error: errorAccTransactions } = useGetTransactionsByAcc(accountId);

    return (
        <div className="flex flex-col">
            {
                isLoadingAccTransactions ? (
                    <span>Loading account transactions...</span>
                ) : isErrorAccTransactions ? (
                    <span>Error loading account transactions: {errorAccTransactions?.message}</span>
                ) : (
                    transactions?.map((transaction) => (
                        <TransactionCard
                            key={transaction.transaction_id}
                            name={transaction.transaction_name}
                            type={transaction.transaction_type}
                            amount={transaction.transaction_amount}
                            date={transaction.created_at}
                            category={transaction.category?.category_name}
                        />

                    ))
                )
            }
        </div>
    )
}