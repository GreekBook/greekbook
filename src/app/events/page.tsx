import React, {Suspense} from 'react'
import Link from 'next/link'
import {ArrowLeft, Filter} from 'lucide-react'
import { Button } from "@/components/ui/button"
import Search from "@/ui/events/search";
import {Skeleton} from "@/components/ui/skeleton";
import {fetchEventPages} from "@/lib/db/data";
import Pagination from "@/ui/events/pagination";
import Table from "@/ui/events/table";
import {auth} from "@/auth";
import LoginPage from "@/ui/profile/login-page";

export default async function EventsPage({searchParams}: {
    searchParams?: {
        university: string;
        query?: string;
        page?: string;
    };
}) {
    const session = await auth();
    if (!session) {
        return (
            <LoginPage header={
                <header
                    className="sticky top-0 z-10 flex justify-between items-center p-4 bg-card border-b border-border">
                    <div className="flex items-center space-x-4">
                        <Link href="/">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-6 w-6"/>
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold text-teal-600 font-museo">Find your dream event</h1>
                    </div>
                    {/* Fake button.*/}
                    <Button variant="ghost" size="icon">
                        <Filter className="h-6 w-6"/>
                    </Button>
                </header>
            }/>
        )
    }

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const university = searchParams?.university || '8680d693-1c56-4053-b2b5-8c2a34c0591f';
    const totalPages = await fetchEventPages(query, university, 5);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="sticky top-0 z-10 flex justify-between items-center p-4 bg-card border-b border-border">
                <div className="flex items-center space-x-4">
                    <Link href="/">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-6 w-6"/>
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold text-teal-600 font-museo">Find your dream event</h1>
                </div>
                {/* Make this into modal form button. Reduce pages.*/}
                <Link href="/university-selection">
                    <Button variant="ghost" size="icon">
                        <Filter className="h-6 w-6"/>
                    </Button>
                </Link>
            </header>

            <main className="flex-grow p-4 space-y-6">
                <Search />
                <Suspense key={query + currentPage} fallback={<Skeleton/>}>
                    <Table query={query} currentPage={currentPage} universityId={university}/>
                </Suspense>
            </main>
            <Pagination className="sticky z-10 bg-background border-t border-border" totalPages={totalPages}/>
        </div>
    )
}