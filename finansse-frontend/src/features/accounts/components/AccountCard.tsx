import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardAction,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import type { Account } from "../types/accounts.type";

export function AccountCard({account_name, account_type}: Account) {
    return (
        <> 
            <Card>
                <CardHeader>
                    <CardTitle>{ account_name }</CardTitle>
                    <CardDescription>{ account_type }</CardDescription>
                </CardHeader>
                <CardContent>
                    Card contents here
                </CardContent>
            </Card>
        </>
    )
}