import {
    Card,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { Link } from 'react-router-dom';
import type { Account } from "../types/accounts.type";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils/format-currency"

export function AccountCard({ account_id, account_name, account_type, account_currency, account_current_balance }: Account) {
    return (
        <>
            <Link to={`/dashboard/accounts/${account_id}`} className="cursor-pointer">
                <Card>
                    <CardContent className="flex flex-col space-y-2.5">
                        {/* Top */}
                        <div className="flex flex-row items-start justify-between">
                            <CardTitle>{account_name}</CardTitle>
                            <h2>{formatCurrency(account_current_balance)}</h2>
                        </div>

                        {/* Bottom */}
                        <div className="flex flex-row items-end justify-between">
                            <div className="space-x-2 text-xs">
                                <Badge variant={"default"}>{account_type}</Badge>
                                <Badge variant={"secondary"}>{account_currency}</Badge>
                            </div>
                            <span className="text-xs">Updated 2 hours ago</span>
                        </div>
                    </CardContent>
                </Card>
            </Link>
        </>
    )
}

