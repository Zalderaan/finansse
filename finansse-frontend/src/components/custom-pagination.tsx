import {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination";
import { useState } from "react";

export function CustomPagination() {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious to={`./?page=${1}`} />
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink to="#">1</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink to="#">2</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink to="#">3</PaginationLink>
                </PaginationItem>

                <PaginationEllipsis />
                <PaginationNext to="#" />

            </PaginationContent>
        </Pagination>)
}