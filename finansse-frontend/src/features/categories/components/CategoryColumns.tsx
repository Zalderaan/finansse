import { type ColumnDef } from "@tanstack/react-table"
import { type Category } from "@/features/categories/types/categories.types";
import { Badge } from "@/components/ui/badge";


// TODO: Category Type

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "category_name",
        header: "Name"
    },
    {
        accessorKey: "category_type",
        header: "Type",
        cell: ({ getValue }) => {
            const value = getValue() as string;
            return <Badge variant={"outline"} className={
                value === 'EXPENSE' ? 'bg-red-200 border-red-500 text-red-950' 
                : value === 'TRANSFER' ? 'bg-yellow-200 border-yellow-500 text-yellow-950'
                : value === 'INCOME' ? 'bg-green-200 border-green-500 text-green-950'
                : 'bg-muted border-gray-500 text-black'
            }>
                {value}
            </Badge>
        }
    }
]