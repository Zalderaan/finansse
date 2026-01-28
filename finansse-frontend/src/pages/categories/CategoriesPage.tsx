import { useSearchParams } from "react-router-dom";
import { useGetCategories } from "@/features/categories/hooks/useGetCategories";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

import { AddCategoryDialog } from "@/features/categories/components/AddCategoryDialog";
import { CategoryEmptyState } from "@/features/categories/components/CategoryEmptyState";
import type { CategoryTypeFilter, CategoryTab } from "@/features/categories/types/categories.types";

import { columns } from "@/features/categories/components/CategoryColumns";
import { CategoryTable } from "@/features/categories/components/CategoryTable";

export function CategoriesPage() {
    const { categories, isLoading, isError, error } = useGetCategories();
    const [searchParams, setSearchParams] = useSearchParams();

    const selectedType = (searchParams.get('type') as CategoryTypeFilter) || 'ALL';
    const selectedTab = (searchParams.get('tab') as CategoryTab) || 'default';

    const filteredCategories = categories?.filter(cat => {
        const typeMatch = selectedType === 'ALL' || cat.category_type === selectedType;
        const isDefaultMatch = selectedTab === 'default'
            ? cat.category_isDefault === true
            : cat.category_isDefault === false;
        return typeMatch && isDefaultMatch;
    });

    const updateType = (type: CategoryTypeFilter) => {
        setSearchParams(prev => {
            prev.set('type', type);
            return prev;
        });
    };

    const updateTab = (tab: CategoryTab) => {
        setSearchParams(prev => {
            prev.set('tab', tab);
            return prev;
        });
    };

    return (
        <>
            <div className="w-full flex flex-row items-center justify-between pb-8">
                <h1 className="text-2xl font-medium">Categories</h1>
                <AddCategoryDialog />
            </div>
            {/*  onValueChange={(value) => setSelectedTab(value as 'default' | 'user')} */}
            <Tabs defaultValue="default" onValueChange={(value) => updateTab(value as CategoryTab)} className="h-full">
                <TabsList className="w-full">
                    <TabsTrigger value="default">Default</TabsTrigger>
                    <TabsTrigger value="user">User-made</TabsTrigger>
                </TabsList>

                <div className="flex flex-row space-x-2">
                    <Button
                        variant={selectedType === 'ALL' ? 'default' : 'outline'}
                        onClick={() => updateType('ALL')}
                    >
                        All
                    </Button>
                    <Button
                        variant={selectedType === 'EXPENSE' ? 'default' : 'outline'}
                        onClick={() => updateType('EXPENSE')}
                    >
                        Expense
                    </Button>
                    <Button
                        variant={selectedType === 'INCOME' ? 'default' : 'outline'}
                        onClick={() => updateType('INCOME')}
                    >
                        Income
                    </Button>
                    <Button
                        variant={selectedType === 'TRANSFER' ? 'default' : 'outline'}
                        onClick={() => updateType('TRANSFER')}
                    >
                        Transfer
                    </Button>
                </div>

                <TabsContent value="default" className="flex flex-col h-full space-y-2">
                    {
                        filteredCategories && filteredCategories?.length > 0 ? (
                            // filteredCategories?.map((category) => (<CategoryCard key={category.category_id} category={category} />))

                            // * Categories Table
                            <CategoryTable
                                columns={columns}
                                data={filteredCategories}
                                isLoading={isLoading}
                                isError={isError}
                                error={error}
                            />
                        ) : (
                            <CategoryEmptyState />
                        )
                    }
                </TabsContent>

                <TabsContent value="user" className="flex flex-col h-full space-y-2">
                    {
                        filteredCategories && filteredCategories?.length > 0 ? (
                            // filteredCategories?.map((category) => (<CategoryCard key={category.category_id} category={category} />))

                            // * Categories Table
                            <CategoryTable
                                columns={columns}
                                data={filteredCategories}
                                isLoading={isLoading}
                                isError={isError}
                                error={error}
                            />) : (
                            <CategoryEmptyState />
                        )
                    }
                </TabsContent>
            </Tabs>
        </>
    )
}