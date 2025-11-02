import { useGetDefaultCategories } from "@/features/categories/hooks/useGetDefaultCategories"
import { useGetUserCategories } from "@/features/categories/hooks/useGetUserCategories";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function CategoriesPage() {
    const { default_categories, isLoading: isDefaultLoading, isError: isDefaultError, error: defaultError } = useGetDefaultCategories();
    const { user_categories, isLoading, isError, error } = useGetUserCategories();
    const [selectedType, setSelectedType] = useState<'ALL' | 'EXPENSE' | 'INCOME'>('ALL');

    const filteredDefaultCategories = selectedType === 'ALL'
        ? default_categories
        : default_categories?.filter(cat => cat.d_category_type === selectedType);

    const filteredUserCategories = selectedType === 'ALL'
        ? user_categories
        : user_categories?.filter(cat => cat.u_category_type === selectedType);

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

                <TabsContent value="default">
                    {filteredDefaultCategories?.map((category) => (
                        <div className="flex flex-col p-2">
                            <p>{category.d_category_name}</p>
                            <p>{category.d_category_type}</p>
                        </div>
                    ))}
                </TabsContent>

                <TabsContent value="user">
                    {filteredUserCategories?.map((category) => (
                        <div className="flex flex-col p-2">
                            <p>{category.u_category_name}</p>
                            <p>{category.u_category_type}</p>
                        </div>
                    ))}
                </TabsContent>
            </Tabs>
        </>
    )
}
