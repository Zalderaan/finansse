import { useAuthStore } from "@/features/auth/stores/auth.store";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function DashboardPage(){

    const user = useAuthStore(state => state.user);
    return (
        <div className="flex flex-col space-y-4">
            <header>
                <h1 className="font-normal text-2xl">Hello, {user?.username}!</h1>
                <p>Continue managing your finances today</p>
            </header>
        </div>
    )
}