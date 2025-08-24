import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { useLogout } from "@/features/auth/hooks/useLogout";
import { Link } from "react-router-dom";

export function NavUser(user: {
    username: string,
    email: string,
}) {
    
    const { logout } = useLogout();

    return (
        <>
            <DropdownMenu>
                <SidebarMenuButton asChild>
                    <DropdownMenuTrigger >
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">
                                {user.username}
                            </span>
                            <span className="text-xs font-">
                                {user.email}
                            </span>
                        </div>
                    </DropdownMenuTrigger>
                </SidebarMenuButton>
                <DropdownMenuContent className="text-xs w-(--radix-dropdown-menu-trigger-width) min-w-56" side="top" align="start" sideOffset={12}>
                    <DropdownMenuGroup>
                        <DropdownMenuItem asChild>
                            <Link to="/me">
                                My Profile
                            </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => logout()}>
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    );
}