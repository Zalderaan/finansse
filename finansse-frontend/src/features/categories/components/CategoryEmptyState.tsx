import { AddCategoryDialog } from "./AddCategoryDialog";
import { Wallet } from "lucide-react";

export function CategoryEmptyState() {
    return (
        <div className="flex flex-col space-y-4 flex-1 h-full w-full items-center justify-center">

            <span className="bg-accent p-5 rounded-full">
                <Wallet />
            </span>
            <div className="flex flex-col items-center justify-center w-[50%]">
                <span className="font-medium">No categories found</span>
                <p className="text-xs text-center text-gray-500">Create your first category to organize your spending</p>
            </div>

            <AddCategoryDialog />
        </div>
    )
}