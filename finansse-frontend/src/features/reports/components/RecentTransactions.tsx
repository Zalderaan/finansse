import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@/components/ui/card"
import { type ColumnDef } from "@tanstack/react-table";
import type { Transaction } from "@/features/transactions/types/transactions.types";
import { useGetTransactionsByUser } from "@/features/transactions/hooks/useGetTransactionsByUser";
import { RecentTransactionsTable } from "@/features/reports/components/RecentTransactionsTable";

export function RecentTransactions() {
    const { user_transactions, isLoading, isError, error } = useGetTransactionsByUser();
    const columns: ColumnDef<Transaction>[] = [
        {
            accessorKey: "transaction_name",
            header: "Transaction"
        },
        {
            accessorKey: "transaction_type",
            header: "Type"
        },
        {
            accessorKey: "category.category_name",
            header: "Category"
        },
        {
            accessorKey: "account.account_name", // matches the Transaction type of user_transactions
            header: "Account"
        },
        {
            accessorKey: "created_at",
            header: "Date",
            cell: ({ row }) => {
                const date = new Date(row.getValue("created_at"));
                return date.toLocaleDateString();
            }
        },
        {
            accessorKey: "transaction_amount",
            header: "Amount",
            cell: ({ row }) => {
                const amount = parseFloat(row.getValue("transaction_amount"));
                const formatted = new Intl.NumberFormat("en-PH", {
                    style: "currency",
                    currency: "PHP",
                }).format(amount);
                return (
                    <span
                        className={
                            row.original.transaction_type === "EXPENSE" ? "text-red-500" :
                                row.original.transaction_type === "TRANSFER" ? "text-yellow-500"
                                    : "text-green-600"
                        }
                    >
                        {formatted}
                    </span>
                )
            }
        },
    ]

    return (
        <Card className="px-5 py-6">
            <CardHeader>
                <CardTitle>
                    Recent Transactions
                </CardTitle>
                <CardDescription>
                    Your latest transactions across all accounts
                </CardDescription>
            </CardHeader>
            <CardContent>
                <RecentTransactionsTable columns={columns} data={user_transactions ?? []} isLoading={isLoading} isError={isError} error={error} />
            </CardContent>
        </Card>
    )
}