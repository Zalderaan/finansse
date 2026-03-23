import {
    Pagination,
    PaginationContent,
    PaginationLink,
    PaginationItem,
    PaginationPrevious,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination";

export function CustomPagination() {
    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href="./accounts?page=1" />
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink href="./accounts?page=1">1</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink href="./accounts?page=2">2</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                    <PaginationLink href="./accounts?page=3">3</PaginationLink>
                </PaginationItem>

                <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem>
                    <PaginationNext href="./?page=2" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}