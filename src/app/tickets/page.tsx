import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import Search from "@/ui/tickets/search";
import Table from "@/ui/tickets/table";
import {fetchMyEventPages} from "@/lib/db/data";
import Pagination from "@/ui/events/pagination";
import {auth} from "@/auth";
import LoginPage from "@/ui/profile/login-page";
import React from "react";
import TopBarWithBackButton from "@/ui/top-bar-with-back-button";

export default async function TicketsPage({searchParams}: {
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
                <header className="flex items-center p-4 bg-card border-b border-border">
                    <Link href="/">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-6 w-6"/>
                        </Button>
                    </Link>
                    <h1 className="text-2xl font-bold text-teal-600 ml-4 font-museo">My Tickets</h1>
                </header>
            }/>
        )
    }

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = await fetchMyEventPages(query, 5);
    return (
        <div className="flex flex-col min-h-screen bg-background">
            <TopBarWithBackButton>
                <h1 className="text-2xl font-bold ml-4 text-teal-600 font-museo">My Tickets</h1>
            </TopBarWithBackButton>

            <main className="flex-grow p-4 space-y-6">
            <Search/>
                <Table query={query} currentPage={currentPage}/>
            </main>

            <Pagination className="sticky z-10 bg-background border-t border-border" totalPages={totalPages}/>
        </div>
    )
}