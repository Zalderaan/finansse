import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function DashboardPage(){
    return (
        <>
            Hello from dashboard!
            <Button>
                <Link to='/me'>
                    My Profile
                </Link>
            </Button>
        </>
    )
}