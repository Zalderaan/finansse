import { LayoutGrid, PlusCircle, PlusIcon, Wallet } from "lucide-react"
import { DashboardQuickActionItem } from "./DashboardQuickActionItem"
import { useAccountUiStore } from "@/features/accounts/stores/accounts.uiStore"
import { useCategoryUiStore } from "@/features/categories/stores/categories.uiStore";
import { useTransactionUiStore } from '@/features/transactions/stores/transactions.uiStore';

export function DashboardQuickActions() {
    const { setCreateAccountDialogOpen } = useAccountUiStore();
    const { setCreateCategoryDialogOpen } = useCategoryUiStore();
    const { setCreateTransactionDialogOpen } = useTransactionUiStore();

    return (
        <>
            <div className="bg-accent rounded-2xl px-16 py-12 space-y-8">
                <h1 className="text-3xl">Quick Actions</h1>
                <div className="flex flex-row justify-around">
                    <DashboardQuickActionItem icon={(<PlusCircle />)} text="Add Transaction" color="red" onClick={() => setCreateTransactionDialogOpen(true)} />
                    <DashboardQuickActionItem icon={(<Wallet />)} text="Add Account" color="orange" onClick={() => setCreateAccountDialogOpen(true)} />
                    <DashboardQuickActionItem icon={(<LayoutGrid />)} text="Add Category" color="purple" onClick={() => setCreateCategoryDialogOpen(true)} />
                    <DashboardQuickActionItem icon={(<PlusIcon />)} text="Add X" color="green" />
                    <DashboardQuickActionItem icon={(<PlusIcon />)} text="Add Y" color="blue" />
                </div>
            </div>
        </>
    )
}