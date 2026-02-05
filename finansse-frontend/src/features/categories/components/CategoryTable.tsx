import { DataTable } from "@/components/ui/data-table"; // Assuming this is your shadcn DataTable
import { Skeleton } from "@/components/ui/skeleton";
import type { Category } from "../types/categories.types";
import type { ColumnDef } from "@tanstack/table-core";
// import { Loader2 } from "lucide-react";

interface CategoryTableProps {
    columns: ColumnDef<Category>[]; // Replace with proper types
    data: Category[];
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
}

export function CategoryTable({ columns, data, isLoading, isError, error }: CategoryTableProps) {
    // isLoading = true;
    if (isLoading) {
        return (
            <div className="space-y-4">
                {/* Render skeleton rows to match table structure */}
                {Array.from({ length: 5 }).map((_, index) => (  // Adjust length for desired number of skeleton rows
                    <div key={index} className="flex space-x-4">
                        {columns.map((col, colIndex: number) => (
                            <Skeleton key={colIndex} className={`h-4 ${col.size ? `w-[${col.size}px]` : 'w-full'}`} />
                        ))}
                    </div>
                ))}
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