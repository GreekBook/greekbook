import Link from 'next/link'
import {ArrowLeft, Plus} from 'lucide-react'
import { Button } from "@/components/ui/button"
import {fetchEventPages} from "@/lib/db/data";
import React, {Suspense} from "react";
import Table from "@/ui/organizations/table";
import Search from "@/ui/organizations/search";
import Pagination from "@/ui/events/pagination";
import {auth} from "@/auth";
import LoginPage from "@/ui/profile/login-page";
import CreateOrganizationForm from "@/ui/organizations/create-form";

export default async function OrgsPage({searchParams}: {
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
                <header className="sticky top-0 z-10 bg-background border-b border-border">
                    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                        <div className="flex items-center space-x-4">
                            <Link href="/">
                                <Button variant="ghost" size="icon">
                                    <ArrowLeft className="h-6 w-6"/>
                                </Button>
                            </Link>
                            <h1 className="text-2xl font-bold text-teal-600 font-museo">My Organizations</h1>
                        </div>
                        <Button>
                            <Plus className="h-5 w-5 mr-2"/>
                            New
                        </Button>
                    </div>
                </header>
            }/>
        )
    }

    const query = searchParams?.query || '';
    const currentPage = Number(searchParams?.page) || 1;
    const university = searchParams?.university || '';
    const totalPages = await fetchEventPages(query, university, 5);

    return (
        <div className="flex flex-col min-h-screen bg-background">
            <header className="sticky top-0 z-10 bg-background border-b border-border">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <div className="flex items-center space-x-1.5">
                        <Link href="/">
                            <Button variant="ghost" size="icon">
                                <ArrowLeft className="h-6 w-6"/>
                            </Button>
                        </Link>
                        <h1 className="text-2xl font-bold text-teal-600 font-museo">My Organizations</h1>
                    </div>
                    <CreateOrganizationForm/>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-6">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-6">
                        <Search />
                    </div>
                    <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
                        <Table query={query} currentPage={currentPage}/>
                    </Suspense>
                </div>
            </main>
            <Pagination className="sticky z-10 bg-background border-t border-border" totalPages={totalPages}/>
        </div>
    )
}