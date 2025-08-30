import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { Link } from 'react-router-dom';
import type { Account } from "../types/accounts.type";

export function AccountCard({ account_id, account_name, account_type }: Account) {
    return (
        <>
            <Link to={`/dashboard/accounts/${account_id}`}>
                <Card>
                    <CardHeader>
                        <CardTitle>{account_name}</CardTitle>
                        <CardDescription>{account_type}</CardDescription>
                    </CardHeader>
                    <CardContent>
                        Card contents here
                    </CardContent>
                </Card>
            </Link>
        </>
    )
}