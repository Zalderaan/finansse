import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";

export function DashboardLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="flex flex-col w-full">
                <nav className="p-4 border-b-1 flex justify-between items-center">
                    <SidebarTrigger />
                    <ModeToggle />
                </nav>
                <section className="flex flex-col flex-1 p-4">
                    <Outlet />
                </section>
            </main>
        </SidebarProvider>
    )
}