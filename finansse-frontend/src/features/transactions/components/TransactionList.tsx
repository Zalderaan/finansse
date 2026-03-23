import { useParams } from "react-router-dom";
import { TransactionCard } from "./TransactionCard";
import { TriangleAlert, Wallet } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { Transaction } from "../types/transactions.types";

interface TransactionListProps {
    transactions: Transaction[] | undefined,
    isLoadingAccTransactions: boolean,
    isErrorAccTransactions: boolean,
    errorAccTransactions: Error | null
}

export function TransactionList({transactions, isLoadingAccTransactions, isErrorAccTransactions, errorAccTransactions}: TransactionListProps) {
    const { accountId } = useParams();
    if (!accountId) return <span>Invalid account ID</span>;
    const isEmpty = !isLoadingAccTransactions && !isErrorAccTransactions && (transactions?.length ?? 0) === 0;

    // TEMP: force loading UI preview
    const previewLoadingUI = false;

    // TEMP: force error UI preview
    const previewErrorUI = false;
    const previewErrorMessage = "Sample error: Failed to fetch account transactions (500).";

    const effectiveIsLoading = previewLoadingUI || isLoadingAccTransactions;
    const effectiveIsError = previewErrorUI || isErrorAccTransactions;
    const effectiveErrorMessage = previewErrorUI
        ? previewErrorMessage
        : (errorAccTransactions?.message ?? "Unknown error");

    return (
        <div className="flex flex-col py-0">
            {effectiveIsLoading ? (
                <TransactionListLoading />
            ) : effectiveIsError ? (
                <TransactionListError message={effectiveErrorMessage} />
            ) : isEmpty ? (
                <div className="flex flex-col flex-1 items-center justify-center space-y-4 py-10">
                    <span className="bg-accent p-5 rounded-full">
                        <Wallet />
                    </span>
                    <div className="flex flex-col items-center justify-center w-[50%]">
                        <span className="font-medium">No transactions found</span>
                        <p className="text-xs text-center text-gray-500">
                            Add your first transaction to start tracking activity in this account.
                        </p>
                    </div>
                </div>
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
            )}
        </div>
    );
}

// loading state UI in the account's transaction list
function TransactionListLoading() {
    return (
        <div className="flex flex-col">
            {/* <div className="flex items-center gap-2 px-1 text-sm text-muted-foreground">
                <Spinner className="size-4" />
                <span>Loading account transactions...</span>
            </div> */}

            {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="border p-4 shadow-sm">
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                            <Skeleton className="h-5 w-44" />
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-6 w-20 rounded-full" />
                                <Skeleton className="h-6 w-28 rounded-full" />
                            </div>
                            <Skeleton className="h-4 w-36" />
                        </div>
                        <div className="space-y-2">
                            <Skeleton className="ml-auto h-3 w-16" />
                            <Skeleton className="ml-auto h-7 w-24" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

// error state UI in the account's transaction list
function TransactionListError({ message }: { message: string }) {
    return (
        <div className="py-6">
            <Alert variant="destructive" className="rounded-lg border shadow-sm">
                <TriangleAlert className="h-4 w-4" />
                <AlertTitle>Could not load transactions</AlertTitle>
                <AlertDescription className="mt-1">
                    {message}
                </AlertDescription>
            </Alert>
        </div>
    );
}
