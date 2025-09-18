import { create } from 'zustand';

interface TransactionUiStore {
    createTransactionDialogOpen: boolean;
    setCreateTransactionDialogOpen: (open: boolean) => void;
}

export const useTransactionUiStore = create<TransactionUiStore>(
    (set) => ({
        createTransactionDialogOpen: false,

        // update
        setCreateTransactionDialogOpen: (open) => set({createTransactionDialogOpen: open}),
    })
)