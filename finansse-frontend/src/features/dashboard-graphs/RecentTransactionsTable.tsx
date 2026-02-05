import { type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import type { Transaction } from "../transactions/types/transactions.types";

export interface RecentTransactionsTableProps {
    columns: ColumnDef<Transaction>[]; // Replace with proper types
    data: Transaction[];
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}

// export function RecentTransactionsTable({ columns, data, isLoading, isError, error }: RecentTransactionsTableProps) {
export function RecentTransactionsTable({ columns, data}: RecentTransactionsTableProps) {
    return (
        <DataTable columns={columns} data={data} />
    )
}