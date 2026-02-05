import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Outlet } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";
import Cookies from 'js-cookie';


const defaultOpen = Cookies.get('sidebar_state') === 'true';


export function DashboardLayout() {
    return (
        <SidebarProvider defaultOpen={defaultOpen}>
            <AppSidebar />
            <main className="flex flex-col w-full">
                <nav className="p-4 border-b-1 flex justify-between items-center top-0 sticky z-10 bg-gray-50 dark:bg-neutral-900">
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