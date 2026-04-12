import { create } from 'zustand';

interface AccountUiStore {
    createAccountDialogOpen: boolean;
    deleteAccountDialogOpen: boolean;
    setCreateAccountDialogOpen: (open: boolean) => void;
    setDeleteAccountDialogOpen: (open: boolean) => void;
}

export const useAccountUiStore = create<AccountUiStore>(
    (set) => ({
        createAccountDialogOpen: false,
        deleteAccountDialogOpen: false,

        // update
        setCreateAccountDialogOpen: (open) => set({createAccountDialogOpen: open}),
        setDeleteAccountDialogOpen: (open) => set({deleteAccountDialogOpen: open})
    })
)

