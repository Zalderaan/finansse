import { PlusIcon } from "lucide-react"
import { DashboardQuickActionItem } from "./DashboardQuickActionItem"
import type { text } from "stream/consumers"

export function DashboardQuickActions() {
    return (
        <div className="bg-accent rounded-2xl px-8 py-8 space-y-8">
            <h1 className="text-3xl">Quick Actions</h1>
            <div className="flex flex-row justify-between">
                <DashboardQuickActionItem icon={(<PlusIcon />)} text="Add Transaction" />
                <DashboardQuickActionItem icon={(<PlusIcon />)} text="Add Account" />
                <DashboardQuickActionItem icon={(<PlusIcon />)} text="Add Category" />
                <DashboardQuickActionItem icon={(<PlusIcon />)} text="Add X"/>
                <DashboardQuickActionItem icon={(<PlusIcon />)} text="Add Y"/>
            </div>
        </div>
    )
}