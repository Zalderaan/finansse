import { useAuthStore } from "@/features/auth/stores/auth.store";
import { DashboardCard } from "./DashboardCard";
import { Loader } from "@/components/loader";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function DashboardPage() {

    const user = useAuthStore(state => state.user);
    return (
        <div className="flex flex-col space-y-8">
            <header>
                <h1 className="font-normal text-2xl">Hello, {user?.username}!</h1>
                <p>Continue managing your finances today</p>
            </header>
            <div className="flex flex-row space-x-4">
                <DashboardCard color="green" title="Total Income" value={1000} />
                <DashboardCard color="green" title="Total Income" value={99} />
                <DashboardCard color="green" title="Total Income" value={1234} />
                <DashboardCard color="green" title="Total Income" value={45678} />
            </div>

            <div>
                <span className="font-normal text-2xl">Graphs</span>
            </div>

            <Button
                variant={"outline"}
                onClick={() => toast.success("Transaction completed", {
                    classNames: {
                        toast: "bg-green-200",
                        title: "font-2xl"
                    }
                })}
            >
                Show toast
            </Button>
        </div>
    )
}