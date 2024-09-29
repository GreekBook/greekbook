import { Suspense } from 'react';
import Search from "@/ui/universities/search";
import TableSkeleton from "@/ui/universities/table-skeleton";
import Table from "@/ui/universities/table";

export default function UniversitySearchPage({searchParams}: {
    searchParams?: {
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    return (
        <div className="flex flex-col p-5 gap-5">
            <Search/>
            <Suspense key={query} fallback={<TableSkeleton />}>
                <Table query={query} />
            </Suspense>
        </div>
    )
}