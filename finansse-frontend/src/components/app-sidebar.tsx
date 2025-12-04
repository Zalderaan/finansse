import { WalletCards, Home, HandCoins, Tags, } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
DropdownMenu
import { Link } from "react-router-dom"
import {
    DropdownMenu,
} from "@/components/ui/dropdown-menu"
import { NavUser } from "@/components/nav-user"
import { useAuthStore } from "@/features/auth/stores/auth.store"
import { AddTransactionDialog } from '@/features/transactions/components/AddTransactionDialog';

const dashboardPrefix = 'dashboard'
// Menu items.
const items = [
    {
        title: "Home",
        url: `${dashboardPrefix}`,
        icon: Home,
    },
    {
        title: "Accounts",
        url: `${dashboardPrefix}/accounts`,
        icon: WalletCards,
    },
    {
        title: "Budgets",
        url: `${dashboardPrefix}/budgets`,
        icon: HandCoins,
    },
    {
        title: "Categories",
        url: `${dashboardPrefix}/categories`,
        icon: Tags,
    }
]

export function AppSidebar() {
    /**
     * ! TOP PRIO
     * TODO: account creation
     * 
     * ? Second prio
     * TODO: fetch user accounts
     */

    const { user } = useAuthStore();

    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarGroup>
                    <SidebarGroupLabel>Finansse</SidebarGroupLabel>
                </SidebarGroup>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>

                    <SidebarMenu>
                        <SidebarMenuButton asChild className="flex flex-row items-center justify-center h-10">
                            <AddTransactionDialog width="full"/>
                        </SidebarMenuButton>
                    </SidebarMenu>
                    <SidebarGroupLabel>Application</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link to={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton asChild>
                            <NavUser username={user!.username} email={user!.email} />
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}