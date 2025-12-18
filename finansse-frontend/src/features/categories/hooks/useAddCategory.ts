import { useQueryClient, useMutation } from "@tanstack/react-query";
import { categoriesApiService } from "@/features/categories/api/categoriesApi";
import type { CategoriesResponse } from "@/features/categories/types/categories.types";
import { toast } from "sonner";

export function useAddCategory() {
    const queryClient = useQueryClient();

    const createCategoryMutation = useMutation({
        mutationFn: categoriesApiService.createCategory,
        onSuccess: (categoryData) => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });

            toast.success("Account created successfully", {
                description: `, ${categoryData.data.category_name} has been created.`,
                duration: 3000,
                classNames: {
                    title: "!text-green-900",
                    description: "!text-xs !text-green-700",
                    toast: "!bg-green-200 !border-green-300",
                }
            });
        }
    })

    return {
        createCategory: createCategoryMutation.mutate,
        createCategoryAsync: createCategoryMutation.mutateAsync,
        isCreating: createCategoryMutation.isPending,
        isError: createCategoryMutation.isError,
        error: createCategoryMutation.error?.message
    }
} 