import {Suspense} from 'react'
import Link from 'next/link'
import {ArrowLeft, Filter} from 'lucide-react'
import { Button } from "@/components/ui/button"
import Search from "@/ui/events/search";
import {Skeleton} from "@/components/ui/skeleton";
import {fetchEventPages} from "@/lib/db/data";
import EventCard from "@/components/cards/event-card";
import Pagination from "@/ui/events/pagination";

export default async function EventsPage({searchParams}: {
    searchParams?: {
        university: string;
        query?: string;
        page?: string;
    };
}) {
    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const university = searchParams?.university || '';
    const totalPages = await fetchEventPages(query, currentPage, university, 5);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="sticky top-0 z-10 flex justify-between items-center p-4 bg-card border-b border-border">
                <div className="flex items-center space-x-4">
                    <Link href="/">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-6 w-6"/>
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-semibold">Find your dream event</h1>
                </div>
                {/* Make this into modal form button. Reduce pages.*/}
                <Link href="/university-selection">
                    <Button variant="ghost" size="icon">
                        <Filter className="h-6 w-6"/>
                    </Button>
                </Link>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <Search/>

                <div className="flex space-x-2 overflow-x-auto pb-2">
                    <Button>All (20+)</Button>
                    <Button variant="outline">Parties</Button>
                    <Button variant="outline">Formals</Button>
                    <Button variant="outline">Mixers</Button>
                </div>
                <Suspense key={query + currentPage} fallback={<Skeleton/>}>

                </Suspense>
                <Pagination totalPages={totalPages}/>
            </main>
        </div>
    )
}