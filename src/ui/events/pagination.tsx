'use client';

import {
    Pagination as PaginationShad,
    PaginationContent, PaginationEllipsis,
    PaginationItem, PaginationLink, PaginationNext,
    PaginationPrevious
} from "@/components/ui/pagination";
import {usePathname, useSearchParams} from "next/navigation";


export default function Pagination({totalPages, className}: { totalPages: number, className?: string }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentPage = Number(searchParams.get('page')) || 1;
    const allPages = generatePagination(currentPage, totalPages);
    const createPageURL = (pageNumber: number) => {
        pageNumber = pageNumber == 0 ? 1 : pageNumber;
        const params = new URLSearchParams(searchParams);
        params.set('page', pageNumber.toString());
        return `${pathname}?${params.toString()}`;
    };

    return (
        <PaginationShad className={className}>
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious href={createPageURL(currentPage-1)} />
                </PaginationItem>
                {allPages.map((page, index) => {
                    if (page === '...') {
                        return <PaginationEllipsis key={index} />;
                    }
                    if (typeof page == "number") {
                        return (
                            <PaginationItem key={page}>
                                <PaginationLink href={createPageURL(page)}>{page}</PaginationLink>
                            </PaginationItem>
                        );
                    }
                })}
                <PaginationItem>
                    <PaginationNext href={createPageURL(currentPage+1)} />
                </PaginationItem>
            </PaginationContent>
        </PaginationShad>
    )
}

export const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
    ];
};