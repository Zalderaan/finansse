import { DataTable } from "@/components/ui/data-table";

export interface RecentTransactionsTableProps {
    columns: any; // Replace with proper types
    data: any[];
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}

export function RecentTransactionsTable({ columns, data, isLoading, isError, error }: RecentTransactionsTableProps) {
    return (
        <DataTable columns={columns} data={data} />
    )
}