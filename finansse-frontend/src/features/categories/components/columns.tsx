import { type ColumnDef } from "@tanstack/react-table"
import { type Category } from "@/features/categories/types/categories.types";


// TODO: Category Type

export const columns: ColumnDef<Category>[] = [
    {
        accessorKey: "category_name",
        header: "Name"
    },
    {
        accessorKey: "category_type",
        header: "Type"
    }
]