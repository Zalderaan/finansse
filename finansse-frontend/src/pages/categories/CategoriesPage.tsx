import { useGetCategories } from "@/features/categories/hooks/useGetCategories";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CategoryCard } from "@/features/categories/components/CategoryCard";

export function CategoriesPage() {
    const { categories, isLoading, isError, error } = useGetCategories();
    const [selectedType, setSelectedType] = useState<'ALL' | 'EXPENSE' | 'INCOME'>('ALL');

    const filteredCategories = selectedType === 'ALL'
        ? categories
        : categories?.filter(cat => cat.category_type === selectedType);

    return (
        <>
            <h1 className="text-2xl font-medium">Categories</h1>
            <Tabs defaultValue="default">
                <TabsList className="w-full">
                    <TabsTrigger value="default">Default</TabsTrigger>
                    <TabsTrigger value="user">User-made</TabsTrigger>
                </TabsList>

                <div className="flex flex-row space-x-2">
                    <Button
                        variant={selectedType === 'ALL' ? 'default' : 'outline'}
                        onClick={() => setSelectedType('ALL')}
                    >
                        All
                    </Button>
                    <Button
                        variant={selectedType === 'EXPENSE' ? 'default' : 'outline'}
                        onClick={() => setSelectedType('EXPENSE')}
                    >
                        Expense
                    </Button>
                    <Button
                        variant={selectedType === 'INCOME' ? 'default' : 'outline'}
                        onClick={() => setSelectedType('INCOME')}
                    >
                        Income
                    </Button>
                </div>

                <TabsContent value="default" className="space-y-2">
                    {filteredCategories?.map((category) => (
                        <CategoryCard key={category.category_id} category={category} />
                    ))}
                </TabsContent>

                <TabsContent value="user">
                    {filteredCategories?.map((category) => (
                        <div className="flex flex-col p-2">
                            <p>{category.category_name}</p>
                            <p>{category.category_type}</p>
                        </div>
                    ))}
                </TabsContent>
            </Tabs>
        </>
    )
}
