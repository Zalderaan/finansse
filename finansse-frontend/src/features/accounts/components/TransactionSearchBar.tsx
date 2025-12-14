import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

// TODO: hook to filter transactions

export function TransactionSearchBar() {
    const [searchValue, setSearchValue] = useState<string>("");

    return (
        <div className="relative md:ml-auto md:max-w-sm w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
                type="text"
                placeholder="Search transactions..."
                className="pl-9"
                value={searchValue}
                onChange={(e) => {
                    const value = e.target.value;
                    console.log(value);
                    setSearchValue(value);
                }}
            />
        </div>
    );
}
