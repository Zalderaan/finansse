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
            return <Badge variant={"outline"} className={value === 'EXPENSE' ? 'bg-red-200 border-red-500 text-red-950' : 'bg-green-200 border-green-500 text-green-950'}>{value}</Badge>
        }
    }
]