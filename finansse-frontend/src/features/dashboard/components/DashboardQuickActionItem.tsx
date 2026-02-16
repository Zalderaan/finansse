import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";

type ButtonColor = "blue" | "green" | "purple" | "red" | "orange" | "pink" | "indigo";
const colorStyles: Record<ButtonColor, string> = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    purple: "bg-purple-500 hover:bg-purple-600",
    red: "bg-red-500 hover:bg-red-600",
    orange: "bg-orange-500 hover:bg-orange-600",
    pink: "bg-pink-500 hover:bg-pink-600",
    indigo: "bg-indigo-500 hover:bg-indigo-600",
};
interface DashboardQuickActionItemProps {
    icon: ReactNode,
    text: string,
    color?: ButtonColor,
    onClick?: () => void;
}


export function DashboardQuickActionItem({ icon, text, color = "blue", onClick }: DashboardQuickActionItemProps) {
    return (
        <div className="flex flex-col space-y-3 items-center justify-center">
            <Button 
                className={`
                    flex items-center justify-center w-12 h-12
                    rounded-full transition-colors text-white ${colorStyles[color]}`
                }
                onClick={onClick}  // Call the provided callback on click
            >
                <span className="text-xl">{icon}</span>
            </Button>
            <span className="font-medium text-xs">{text}</span>
        </div>
    )
}