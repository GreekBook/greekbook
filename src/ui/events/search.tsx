'use client';

import {Input} from "@/components/ui/input";
import {Search as SearchIco} from "lucide-react";
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

export default function Search() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSearch(term: string) {
        const params = new URLSearchParams(searchParams);
        params.set('page', '1');
        if (term) {
            params.set('query', term);
        } else {
            // eslint-disable-next-line drizzle/enforce-delete-with-where
            params.delete('query');
        }
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div className="relative">
            <SearchIco className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"/>
            <Input
                type="text"
                placeholder="Search events..."
                value={searchParams.get('query')?.toString()}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10"
            />
        </div>
    )
}