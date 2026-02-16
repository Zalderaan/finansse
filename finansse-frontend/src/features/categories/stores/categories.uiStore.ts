import { create } from "zustand"

interface CategoryUiStore {
    createCategoryDialogOpen: boolean;
    setCreateCategoryDialogOpen: (open: boolean) => void;
}

export const useCategoryUiStore = create<CategoryUiStore>(
    (set) => ({
        // initial states
        createCategoryDialogOpen: false,

        // upd states
        setCreateCategoryDialogOpen: (open) => set({ createCategoryDialogOpen: open })
    })
)