import { DataTable } from "@/components/ui/data-table"; // Assuming this is your shadcn DataTable
import { Loader2 } from "lucide-react";

interface CategoryTableProps {
    columns: any; // Replace with proper types
    data: any[];
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}

export function CategoryTable({ columns, data, isLoading, isError, error }: CategoryTableProps) {
    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-32">
                <Loader2 className="animate-spin" />
                <span className="ml-2">Loading categories...</span>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="text-center text-red-500">
                Error loading categories: {error?.message || "Unknown error"}
            </div>
        );
    }

    return <DataTable columns={columns} data={data} />;
}