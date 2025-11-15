import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowDownRight, ArrowUpRight, Tag } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Category } from "@/features/categories/types/categories.types";

interface CategoryCardProps {
    category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
    const isExpense = category.category_type === "EXPENSE";

    return (
        <Card className="hover:shadow-md transition-shadow duration-200">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                    {
                        category.category_icon
                            ? <span>{category.category_icon}</span>
                            : <Tag className="w-5 h-5 text-muted-foreground" />
                    }
                    <span>
                        {category.category_name}
                    </span>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <Badge
                    variant="secondary"
                    className={cn(
                        "inline-flex items-center gap-1",
                        isExpense
                            ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                            : "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                    )}
                >
                    {isExpense ? <ArrowDownRight className="w-3 h-3" /> : <ArrowUpRight className="w-3 h-3" />}
                    {category.category_type}
                </Badge>
            </CardContent>
        </Card>
    );
}