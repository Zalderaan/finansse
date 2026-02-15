import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface DashboardQuickActionItemProps {
    icon: ReactNode,
    text: string
}

export function DashboardQuickActionItem({ icon, text }: DashboardQuickActionItemProps) {
    return (
        <div className="flex flex-col space-y-3 items-center justify-center px-8">
            <Button className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
                <span className="text-xl">{icon}</span>
            </Button>
            <span className="font-medium text-xs">{text}</span>
        </div>
    )
}