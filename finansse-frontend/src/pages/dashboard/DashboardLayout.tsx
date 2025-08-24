import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "react-router-dom"

export function DashboardLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="w-full">
                <nav className="p-4 border-b-1"><SidebarTrigger /></nav>
                <section className="flex flex-col p-4">
                    <Outlet />
                </section>
            </main>
        </SidebarProvider>
    )
}